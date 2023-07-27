WITH myconstants (p_id) as (values (1)) 
WITH hours AS (
    SELECT generate_series(date_trunc('hour', now()) - interval '72 hour', date_trunc('hour', now()), '1 hour') as hour
)
SELECT h.hour
,  COALESCE(br.soc_tenth * .1, 0) AS "battery_soc"
,  COALESCE(br.system_discharge_energy_remaining_tenth * .1, 0) AS "battery_system_discharge_remaining_kwh" 
FROM hours h
INNER JOIN battery_readings br on date_trunc('minute', br.read_time - interval '1 minute' ) = h.hour
WHERE br.project_id = p_id
ORDER BY hour DESC
LIMIT 72