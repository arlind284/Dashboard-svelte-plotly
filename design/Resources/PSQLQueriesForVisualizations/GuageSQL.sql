 WITH myconstants (p_id) as (values (1)) -- use this for the project_id
    SELECT 
    -- GUAGE INFORMATION --
        -- Microgrid Overview Guage --
      mr.read_time                                      AS read_time
    , p.id                                              AS product_id
    
    , CEIL(mr.total_system_power)                             AS "grid_imported_kw"
    , CEIL(mr.total_system_power + COALESCE(ir.ac_pwr_kw, 0)) AS "site_load_kw"
    , CEIL(COALESCE(ir.ac_pwr_kw, 0))                         AS "inverter_power_kw" 
    , CASE 
        WHEN mr.total_system_power  > 0 THEN 'Importing from Grid'
        ELSE 'Exporting to Grid' 
        END                                             AS "gird_load_state"
    
    -- Battery Overview Guage
     , CASE 
                 WHEN ir.ac_pwr_kw is null THEN 'Idle'
                 WHEN ir.ac_pwr_kw> 0      THEN 'Discharging'
                 ELSE 'Charging'
             END                                        AS "battery_system_state" 
     , CEIL(br.discharge_energy_remaining)                   AS "discharge_energy_remaining_kwh"
     , CEIL(br.soc_tenth *.1)                                AS "soc_soc"
     , CEIL(p.total_battery_capacity_kwh)                    AS "battery_capacity_kwh"
     , CEIL(p.total_inverter_capacity_kw)                    AS "inverter_capacity_kw"
                  
    -- Solar Overview Guage
    , CEIL(s.solar_generated_kw)                             AS "solar_generated_kw"
    , CEIL(p.solar_ac_monitored_capacity_kw)                  AS "ac_solar_capacity_kw"
    , CEIL(p.solar_dc_monitored_capacity_kw)                 AS "dc_solar_capacity_kw"
                     
    -- (future) EV Charger Guage
    -- , ev.<<EV DISCHARGE KW>>                         AS "ev_charger_demand_kw"
    -- , p.<<EV CHARGER CAPACITY>>                      AS "ev_charger_capactiy" 
     FROM myconstants, meter_readings AS mr
               INNER JOIN projects p ON p.id = mr.project_id 
               INNER JOIN inverter_readings AS ir ON mr.read_time = ir.read_time
               INNER JOIN (SELECT 
                             SUM(system_discharge_energy_remaining_tenth * .1) AS "discharge_energy_remaining"
                             , AVG(soc_tenth )                                  AS "soc_tenth"  -- not sure if this will aggregate well so leaving it out
                             , MAX(read_time)                                  AS "read_time"
                             , MIN(project_id)                                 AS "project_id"
                             FROM myconstants, battery_readings 
                             WHERE project_id = p_id
                             GROUP BY project_id, read_time 
                             ORDER BY read_time DESC
                             LIMIT 1 ) AS br ON mr.project_id = br.project_id
                INNER JOIN (SELECT read_time 
                           , project_id AS "project_id"
                           , SUM(output_watts *.001) AS "solar_generated_kw"
                           FROM myconstants, spots 
                           WHERE project_id = p_id
                           GROUP BY read_time, project_id
                           ORDER BY read_time DESC
                           LIMIT 1
                           ) AS s ON s.read_time = mr.read_time
                --INNER JOIN (SELECT
                            --read_time
                            --, project_id
                            --, SUM(<<EV DISCHARGE KW>>) AS "ev_charger_load_kw"
                            --FROM <<EV CHARGER TABLE>> 
                            --WHERE project_id = p_id
                            --GROUP BY read_time, project_id
                            --) AS ev ON ev.read_time = mr.read_time
                           
              WHERE p.id = p_id
              AND mr.unit_id =1
