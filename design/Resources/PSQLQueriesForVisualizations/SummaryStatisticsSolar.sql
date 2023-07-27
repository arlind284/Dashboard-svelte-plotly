WITH myconstants (p_id, num_hours) as (values (1, 72))
, data AS (
    SELECT date_trunc('hour', minute_data.minute_data ) + 
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
    GROUP BY interval_data)
    
SELECT ROUND(MAX(solar_generated_kw)) as max_solar_generated_kw
    , ROUND(SUM(solar_generated_kw)) * .25 as total_solar_generated_kwh
FROM data
