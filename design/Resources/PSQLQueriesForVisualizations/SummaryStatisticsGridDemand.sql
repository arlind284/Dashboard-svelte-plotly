WITH myconstants (p_id, num_hours) as (values (1, 168))
, data AS (
            SELECT date_trunc('hour', mr.read_time at time zone 'america/Los_angeles') + 
                 INTERVAL '15 min' * (EXTRACT(MINUTE FROM mr.read_time )::INTEGER / 15) AS "interval_data"
                 , SUM(total_system_power) / COUNT(mr.total_system_power)               AS net_energy_consumption_kw
                 --, GREATEST(SUM(total_system_power) / COUNT(mr.total_system_power), 0)  AS above_zero_energy_consumption_kw
                 --, LEAST(SUM(total_system_power) / COUNT(mr.total_system_power)   , 0)  AS below_zero_energy_consumption_kw
            FROM myconstants, meter_readings AS mr
            WHERE project_id = p_id
                 AND mr.read_time  >= NOW() - (INTERVAL '1 hour' * num_hours) 
                 AND read_ok      = True
                 AND unit_id = 1
            GROUP BY interval_data)
    
    SELECT ROUND(MAX(net_energy_consumption_kw)) as max_imported_power_kw
    , ROUND(SUM(net_energy_consumption_kw)) *.25 as net_grid_consumed_energy_kwh  -- should this just be the non-negetive load?
    --, (SUM(above_zero_energy_consumption_kw) *.25 as grid_imported_energy_kwh
FROM data 
