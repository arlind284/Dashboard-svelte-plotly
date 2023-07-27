WITH myconstants (p_id, num_hours) as (values (1, 24))
    , hours AS (
    SELECT generate_series(date_trunc('hour', now() ) - interval '240 hour', date_trunc('hour', now() ), '1 hour') as hour -- hacky to get the maximum hours for the generated series. 
)
SELECT h.hour AT TIME ZONE 'america/Los_angeles'
,  ROUND(COALESCE(s.solar_generated_kwh, 0))                    AS "solar_generated_kwh"
,  ROUND(COALESCE(ir_dc.avg_inverter_discharge_kwh, 0))         AS "inverter_discharge_kwh"
,  ROUND(COALESCE(ir_c.avg_inverter_charge_kwh, 0))             AS "inverter_charge_kwh"
,  ROUND(COALESCE(mr.net_energy_consumption_kwh, 0))            AS "net_energy_consumption_kwh"
,  ROUND(COALESCE(mr.above_zero_energy_consumption_kwh, 0))     AS "imported_grid_energy_consumption_kwh"
,  ROUND(COALESCE(mr.below_zero_energy_consumption_kwh, 0))     AS "exported_grid_energy_consumption_kwh"

--,  COALESCE(s.solar_generated_kwh, 0) + COALESCE(mr.below_zero_energy_consumption_kwh, 0) + COALESCE(mr.above_zero_energy_consumption_kwh, 0)  AS  total_building_demand_kwh -- for AC 
, CASE 
         WHEN  COALESCE(mr.below_zero_energy_consumption_kwh, 0) < 0 THEN CEIL(COALESCE(ir_dc.avg_inverter_discharge_kwh, 0) +  COALESCE(mr.below_zero_energy_consumption_kwh, 0))
         WHEN  COALESCE(mr.above_zero_energy_consumption_kwh, 0) > 0 THEN CEIL(COALESCE(mr.above_zero_energy_consumption_kwh, 0)  +  COALESCE(ir_dc.avg_inverter_discharge_kwh, 0))
         END AS "total_building_demand_kwh" -- for DC solar

FROM myconstants, hours h

-- PRODUCTION
-- Production: solar 
LEFT JOIN 
     ( SELECT date_trunc('hour', minute_data.minute_data , '1 hour') AS "hour_data"
     , AVG(minute_data.solar_generated_kw)                           AS "solar_generated_kwh"
     FROM 
         (SELECT date_trunc('minute', s.read_time  -  interval '1 minute', '1 minute')      AS "minute_data"
         , SUM(output_watts) / 1000.0                                AS "solar_generated_kw"
         FROM myconstants, spots s
         WHERE project_id = p_id
         AND s.read_time >= NOW()  - (INTERVAL '1 hour' * num_hours)
         GROUP BY minute_data 
         ) AS minute_data
    GROUP BY hour_data
     ) as s on s.hour_data = h.hour
 
-- Production: battery discharge
LEFT JOIN 
     (SELECT date_trunc('hour', ir.read_time  -  interval '1 minute', '1 hour') AS "hour_data"
     , GREATEST(SUM(ir.ac_pwr_kw) / COUNT(ir.ac_pwr_kw), 0) AS avg_inverter_discharge_kwh
     FROM myconstants, inverter_readings AS ir
     WHERE project_id = p_id
     AND ir.read_time >= NOW() -  (INTERVAL '1 hour' * num_hours) 
     AND ir.ac_pwr_kw > 0
     GROUP BY hour_data 
     --ORDER BY hour_data  DESC
     ) as ir_dc on ir_dc.hour_data = h.hour
    
-- Consumption: Battery charging
LEFT JOIN 
     (SELECT date_trunc('hour', ir.read_time -  interval '1 minute', '1 hour') AS "hour_data"
     , GREATEST(ABS(SUM(ir.ac_pwr_kw)) / COUNT(ir.ac_pwr_kw), 0) AS avg_inverter_charge_kwh
     FROM myconstants, inverter_readings AS ir
     WHERE project_id = p_id
     AND ir.read_time >= NOW() - (INTERVAL '1 hour' * num_hours)
     AND ir.ac_pwr_kw < 0
     AND read_ok      = True
     GROUP BY hour_data 
     ) as ir_c on ir_c.hour_data = h.hour

--- Consumption: Grid Imported demand 
LEFT JOIN 
     (SELECT date_trunc('hour', mr.read_time  -  interval '1 minute', '1 hour') AS "hour_data"
     , SUM(total_system_power) / COUNT(mr.total_system_power)               AS net_energy_consumption_kwh
     , GREATEST(SUM(total_system_power) / COUNT(mr.total_system_power), 0)  AS above_zero_energy_consumption_kwh
     , LEAST(SUM(total_system_power) / COUNT(mr.total_system_power)   , 0)  AS below_zero_energy_consumption_kwh
     
     FROM myconstants, meter_readings AS mr
     WHERE project_id = p_id
     AND mr.read_time >= NOW() - (INTERVAL '1 hour' * num_hours) 
     AND read_ok      = True
     AND unit_id = 1
     GROUP BY hour_data 
     ) as mr on mr.hour_data = h.hour

     
--- Consumption: EV Chargers   
--LEFT JOIN 
     --( SELECT date_trunc('hour', minute_data.minute_data , '1 hour') AS "hour_data"
     --, AVG(minute_data.ev_charger_load_kw)                       AS "ev_delivered_kwh"
     -- FROM 
         --(SELECT date_trunc('minute', ev.read_time  -  interval '1 minute', '1 minute') AS "minute_data"
         --, SUM(ev_charger_load_kw) AS "ev_charger_load_kw"
         --FROM ev_charger_readings ev
         --WHERE project_id = 1
         --AND ev.read_time >= NOW()  - INTERVAL '1 hour' * num_hours
         --AND project_id =1
         --GROUP BY minute_data 
         --) 
    --GROUP BY hour_data
     --) as ev on ev.hour_data = h.hour
WHERE mr.net_energy_consumption_kwh IS NOT NULL -- kind of hacky but used to trim down the table sice you can't limit by a variable
ORDER BY hour DESC
