WITH myconstants (p_id, num_hours) as (values (1, 72))
SELECT MAX(net_energy_consumption_kw + avg_inverter_discharge_kwh)   AS max_building_load_kw
        , SUM(net_energy_consumption_kw + avg_inverter_discharge_kwh) * .25 AS total_building_energy_consumption_kwh

      --d.interval_data  as grid_interval 
       --, sd.interval_data as solar_interval
       --, ir.interval_data as inverter_interval
         --, net_energy_consumption_kw
         --, above_zero_energy_consumption_kw
         --, below_zero_energy_consumption_kw
         --, avg_inverter_discharge_kwh
        
       
FROM  ( -- GRID IMPORT
       SELECT date_trunc('hour', mr.read_time) + 
          INTERVAL '15 min' * (EXTRACT(MINUTE FROM mr.read_time )::INTEGER / 15)  AS "interval_data"
           , SUM(total_system_power) / COUNT(mr.total_system_power)             AS net_energy_consumption_kw
           , GREATEST(SUM(total_system_power) / COUNT(mr.total_system_power), 0)  AS above_zero_energy_consumption_kw
           , LEAST(SUM(total_system_power) / COUNT(mr.total_system_power)   , 0)  AS below_zero_energy_consumption_kw
          FROM myconstants, meter_readings AS mr
            WHERE project_id = p_id
              AND mr.read_time  >= NOW() - (INTERVAL '1 hour' * num_hours) 
              AND read_ok      = True
              AND unit_id = 1
          GROUP BY interval_data) as d
                
LEFT JOIN  (
        SELECT date_trunc('hour', minute_data.minute_data) + 
           INTERVAL '15 min' * (EXTRACT(MINUTE FROM minute_data.minute_data)::INTEGER / 15)  AS "interval_data"
         , AVG(minute_data.solar_generated_kw) AS "solar_generated_kw"
            FROM 
                (SELECT date_trunc('minute', s.read_time - interval '1 minute') AS "minute_data"
                , SUM(output_watts) / 1000.0 AS "solar_generated_kw"
                FROM myconstants, spots s
                WHERE project_id = p_id
                    AND s.read_time >= NOW() - (INTERVAL '1 hour' * num_hours)
                GROUP BY minute_data 
                ) AS minute_data
            GROUP BY interval_data) as sd on sd.interval_data = d.interval_data
LEFT JOIN (
        SELECT date_trunc('hour', ir.read_time  - INTERVAL '1 minute') + 
                 INTERVAL '15 min' * (EXTRACT(MINUTE FROM ir.read_time)::INTEGER / 15)   AS "interval_data"
                         , GREATEST(SUM(ir.ac_pwr_kw) / COUNT(ir.ac_pwr_kw), 0)          AS avg_inverter_discharge_kwh
                         FROM myconstants, inverter_readings AS ir
                         WHERE project_id = p_id
                         AND ir.read_time >= NOW() - (INTERVAL '1 hour' * num_hours) 
                     GROUP BY interval_data) as ir ON ir.interval_data = d.interval_data
--ORDER BY grid_interval DESC, solar_interval DESC, inverter_interval DESC
LIMIT 250
