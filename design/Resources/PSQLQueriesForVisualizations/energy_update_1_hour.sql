WITH myconstants (p_id, startdatetime, enddatetime) as (values (1, '2023-04-11T19:21:00'::timestamp, '2023-04-14T19:21:00'::timestamp)) 
  , hours AS ( SELECT generate_series(date_trunc('hour', myconstants.startdatetime), date_trunc('hour', myconstants.enddatetime), '1 hour') as hour FROM myconstants)
  SELECT h.hour at time zone 'america/Los_angeles' 
  
,  ROUND(COALESCE(s.solar_generated_kw, 0),1) AS "solar_generated_kwh"
,  br.battery_soc
,  br.battery_system_discharge_remaining_kwh
FROM hours h 

-- solar 72 Hour kwh
LEFT JOIN 
 ( SELECT date_trunc('hour', minute_data.minute_data, '1 hour') AS "hour_data"
     , AVG(minute_data.solar_generated_kw)                        AS "solar_generated_kw"
     FROM myconstants,
         (SELECT date_trunc('minute', s.read_time - interval '1 minute' , '1 minute') AS "minute_data"
         , SUM(output_watts) / 1000.0 AS "solar_generated_kw"
         FROM myconstants, spots s
         WHERE project_id = 1
         AND s.read_time > startdatetime AND s.read_time <= enddatetime
         GROUP BY minute_data 
         ) AS minute_data
    GROUP BY hour_data) as s on s.hour_data = h.hour

-- battery 72 hour kwh
LEFT JOIN 
 ( SELECT br.read_time
        , COALESCE(br.soc_tenth * .1, 0) AS "battery_soc"
        ,  COALESCE(br.system_discharge_energy_remaining_tenth * .1, 0) AS "battery_system_discharge_remaining_kwh" 
    FROM myconstants, battery_readings br
    WHERE br.project_id = p_id
    AND br.read_time > startdatetime AND br.read_time <= enddatetime) as br
    on date_trunc('minute', br.read_time - interval '1 minute' ) = h.hour
ORDER BY hour DESC
