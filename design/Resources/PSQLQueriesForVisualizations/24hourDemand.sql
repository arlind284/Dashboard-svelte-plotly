       WITH myconstants (p_id, startdatetime, enddatetime) as (values (1, '2023-04-13T19:21:00'::timestamp, '2023-04-14T19:20:00'::timestamp))
       , minutes AS (
       SELECT generate_series(date_trunc('minute', myconstants.startdatetime), date_trunc('minute', myconstants.enddatetime), '1 minute')  as minutes FROM myconstants)
       SELECT m.minutes  at time zone 'america/Los_angeles'
       --production view
       , ROUND(COALESCE(solar_generated_kw, 0)) AS solar_generated_kw
       , ROUND(COALESCE(avg_inverter_discharge_kw, 0) + COALESCE(solar_generated_kw, 0)) AS total_production_kw
       , ROUND(COALESCE(above_zero_energy_consumption_kw, 0)) AS grid_consumption_kw
       , ROUND(COALESCE(below_zero_energy_consumption_kw, 0)) AS below_zero_grid_kw
       , ROUND(COALESCE(above_zero_energy_consumption_kw, 0) + COALESCE(avg_inverter_discharge_kw, 0)) AS total_building_demand_kw
   
FROM myconstants, minutes m
LEFT JOIN (SELECT date_trunc('minute', s.read_time, '1 minute') AS "minute_data"
         , SUM(output_watts) / 1000.0 AS "solar_generated_kw"
         FROM myconstants, spots s
         WHERE project_id = p_id
         AND s.read_time > startdatetime AND s.read_time <= enddatetime
         GROUP BY minute_data 
         ) AS s ON s.minute_data = m.minutes

LEFT JOIN (SELECT date_trunc('minute', ir.read_time, '1 minute') AS "minute_data"
     , GREATEST(SUM(ir.ac_pwr_kw) / COUNT(ir.ac_pwr_kw), 0) AS avg_inverter_discharge_kw
     FROM myconstants, inverter_readings AS ir
     WHERE project_id = p_id
     AND ir.read_time > startdatetime AND ir.read_time <= enddatetime
     AND ir.ac_pwr_kw > 0
     AND read_ok = True
     GROUP BY minute_data) AS bd ON bd.minute_data = m.minutes 

     -- Consumption kW data series
LEFT JOIN (SELECT date_trunc('minute', mr.read_time, '1 minute') AS "minute_data"
        , SUM(total_system_power) / COUNT(mr.total_system_power)                AS net_energy_consumption_kw
        , GREATEST(SUM(total_system_power) / COUNT(mr.total_system_power), 0)   AS above_zero_energy_consumption_kw
        , LEAST(SUM(total_system_power)    / COUNT(mr.total_system_power), 0)   AS below_zero_energy_consumption_kw
        FROM myconstants, meter_readings AS mr
        WHERE project_id = p_id
           AND mr.read_time > startdatetime AND mr.read_time <= enddatetime
           AND read_ok        = True
           AND unit_id        = 1
        GROUP BY minute_data) AS mr ON mr.minute_data = m.minutes
