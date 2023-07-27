WITH hours AS (
    SELECT generate_series(date_trunc('hour', now() ) - interval '72 hour', date_trunc('hour', now() ), '1 hour') as hour
)
SELECT h.hour AT TIME ZONE 'PDT'
,  CEIL(COALESCE(s.solar_generated_kw, 0)) AS "solar_generated_kwh"
,  CEIL(COALESCE(ir.avg_inverter_power, 0)) AS "inverter_power_kWh"
--,  CEIL(COALESCE(s.solar_generated_kw, 0) +  COALESCE(ir.avg_inverter_power, 0)) AS "total_production_kwh"
FROM hours h
LEFT JOIN 
     ( SELECT date_trunc('hour', minute_data.minute_data , '1 hour') AS "hour_data"
     , AVG(minute_data.solar_generated_kw)                        AS "solar_generated_kw"
     FROM 
         (SELECT date_trunc('minute', s.read_time , '1 minute') AS "minute_data"
         , SUM(output_watts) / 1000.0 AS "solar_generated_kw"
         FROM spots s
         WHERE project_id = 1
         AND s.read_time >= NOW()  - INTERVAL '72 hour'
         GROUP BY minute_data 
         ) AS minute_data
    GROUP BY hour_data
     ) as s on s.hour_data = h.hour
 
LEFT JOIN 
     (SELECT date_trunc('hour', ir.read_time , '1 hour') AS "hour_data"
     , GREATEST(SUM(ir.ac_pwr_kw) / COUNT(ir.ac_pwr_kw), 0) AS avg_inverter_power
     FROM inverter_readings AS ir
     WHERE project_id = 1
     AND ir.read_time >= NOW() - INTERVAL '72 hour'
     GROUP BY hour_data 
     ORDER BY hour_data  DESC
     ) as ir on ir.hour_data = h.hour

ORDER BY hour DESC