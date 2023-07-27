WITH days AS (
    SELECT generate_series(date_trunc('day', now()) - interval '72 hour', date_trunc('hour', now()), '1 day')  as day
)
SELECT d.day 
, CEIL(ha.solar_generated_kwh) AS solar_generated_kwh
, CEIL(ha.inverter_power_kwh) AS inverter_power_kwh
FROM days d
LEFT JOIN 
        (
        SELECT  date_trunc('day', single_day.hour_ , '1 day') AS day
             , COALESCE(SUM(solar_generated_kwh), 0) AS solar_generated_kwh
             , COALESCE(SUM(inverter_power_kwh), 0)  AS inverter_power_kwh
        FROM 
            (WITH hours AS (SELECT generate_series(date_trunc('hour', now()) - interval '72 hour', date_trunc('hour', now()), '1 hour') as hour
            )
            SELECT h.hour AS hour_
            , s.solar_generated_kw AS "solar_generated_kwh"
            , ir.avg_inverter_power AS "inverter_power_kwh"
            --,  s.solar_generated_kw +  COALESCE(ir.avg_inverter_power, 0)) AS "total_production_kwh"
            FROM hours h
            LEFT JOIN 
                 ( SELECT date_trunc('hour', minute_data.minute_data, '1 hour') AS "hour_data"
                     , AVG(minute_data.solar_generated_kw)                      AS "solar_generated_kw"
                     FROM 
                         (SELECT date_trunc('minute', s.read_time, '1 minute') AS "minute_data"
                         , SUM(output_watts) / 1000.0 AS "solar_generated_kw"
                            FROM spots s
                            WHERE project_id = 1
                             AND s.read_time >= NOW() - INTERVAL '72 hour'
                             GROUP BY minute_data
                             ) AS minute_data
                    GROUP BY hour_data
                 ) as s on s.hour_data = h.hour

            LEFT JOIN 
                 (SELECT date_trunc('hour', ir.read_time, '1 hour') AS "hour_data"
                 , GREATEST(AVG(ir.ac_pwr_kw), 0) AS avg_inverter_power
                 FROM inverter_readings AS ir
                 WHERE project_id = 1
                 AND ir.read_time >= NOW() - INTERVAL '72 hour'
                 GROUP BY hour_data
                 ) as ir on ir.hour_data = h.hour
                ORDER BY hour DESC
                ) as single_day
        GROUP BY date_trunc('day', single_day.hour_, '1 day')) AS ha ON ha.day = d.day 