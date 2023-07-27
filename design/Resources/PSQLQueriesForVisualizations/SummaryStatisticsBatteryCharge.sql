WITH myconstants (p_id, num_hours) as (values (1, 128))
, data AS (SELECT date_trunc('hour', ir.read_time at time zone 'utc' at time zone 'america/Los_angeles' - INTERVAL '1 minute') + 
                 INTERVAL '15 min' * (EXTRACT(MINUTE FROM ir.read_time)::INTEGER / 15)   AS "interval_data"
                         , LEAST(SUM(ir.ac_pwr_kw) / COUNT(ir.ac_pwr_kw), 0)          AS avg_inverter_discharge_kwh
                         FROM myconstants, inverter_readings AS ir
                         WHERE project_id = p_id
                         AND ir.read_time >= NOW() - (INTERVAL '1 hour' * num_hours) 
                         AND ir.ac_pwr_kw < 0
                     GROUP BY interval_data
                     )
    SELECT ROUND(MIN(avg_inverter_discharge_kwh)) as max_inverter_discharge_kw
           , ROUND(SUM(avg_inverter_discharge_kwh)) as total_inverter_discharge_kwh
           FROM data
