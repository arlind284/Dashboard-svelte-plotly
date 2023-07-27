WITH hours AS (
    SELECT generate_series(date_trunc('hour', now()) - interval '72 hour', date_trunc('hour', now()), '1 hour') as hour
)
SELECT h.hour
,  ROUND(COALESCE(s.solar_generated_kw, 0),1) AS "solar_generated_kwh"
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
    GROUP BY hour_data) as s on s.hour_data = h.hour
ORDER BY hour DESC