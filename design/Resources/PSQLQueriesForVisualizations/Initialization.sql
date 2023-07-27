WITH myconstants (p_id) as (values (1)) -- use this for the project_id
    SELECT
    p.id             AS product_id
    , p.address      AS address 
    , p.timezone     AS timezone
    , p.solar_ac_monitored_capacity_kw + solar_dc_monitored_capacity_kw AS total_solar_capacity
    , p.solar_ac_monitored_capacity_kw
    , p.solar_dc_monitored_capacity_kw
    , p.total_inverter_capacity_kw       AS total_inverter_capacity_kw
    , p.total_battery_capacity_kwh       AS total_battery_capacity_kwh
    --, "ev_charger_capacity_kw":      // TBD  maximum value for the ev chargers
    FROM myconstants, projects p
    WHERE p.id = p_id
