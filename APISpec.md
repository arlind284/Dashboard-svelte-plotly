#  API Specification

## Overview
This API provides access to data about a Intertie's status monitoring.

## Base URL
The base URL for this API is `https://intertie.com/api/monitoring/`

## Authentication
This API requires an API key for authentication. The API key should be included in the request headers as `x-api-key: YOUR_API_KEY`.

## Endpoints

### Get Initial Data

#### Request
`GET /init?project_id=PROJECT_ID`

- `project_id` (required): The ID of the project for which to retrieve product data.

#### Response
Returns a JSON object that populates fields that are unlikely to change during a user session. These inlcude the maximum capacities for each of the status page gauges, and the intial 1440 1-minute demand values that populate the 24-hour demand drill-down in the Intertie verview. 


##### Example Response with comments.
```json
{
    "product_id": 1, // index of the project, doesn"t show on front end
    "address": "475 Coloma St, Sausalito, CA 94965",
    "timezone": "America/Los_Angeles",
    "total_solar_capacity": 75.0,
    "solar_ac_monitored_capacity_kw": 0.0, // sum of ac_solar_capacity_kw and dc_solar_capacity_kw.
    "solar_dc_monitored_capacity_kw": 75.0,
    "total_inverter_capacity_kw": 29.8,
    "total_battery_capacity_kwh": 186.0,
    "loads_last_24_hours": [
      "ev_charger_capacity_kw": // these are the capacities for the individual ev chargers
    {
        "a": 150,
        "b": 150,
        "c": 150,
        "d": 150,
        "e": 11,
        "f": 11,
        "g": 11,
        "h": 11,
        "i": 11,
        "j": 11,
        "k": 11,
        "l": 11
    },
    "loads_last_24_hours": [[ //there will be 1440 of these
            "2023-04-14T02:21:00.000Z", // Timestamp for time series axis
            63.0, // total solar generated kw 
            83.0, // total production kw
            0.0, // grid consumption kw
            -1.0, // sent to grid kw
            20.0 // total building demand
        ],
        [
            "2023-04-14T02:22:00.000Z",
            63.0,
            83.0,
            0.0,
            -2.0,
            20.0
        ],
        [
            "2023-04-14T02:23:00.000Z",
            63.0,
            83.0,
            0.0,
            -3.0,
            20.0
        ],
        [
            "2023-04-14T02:24:00.000Z",
            64.0,
            84.0,
            0.0,
            -3.0,
            20.0
        ]
    ],
    "ev_charger_capacity_kw": // these are the capacities for the individual ev chargers
    {
        "a": 150,
        "b": 150,
        "c": 150,
        "d": 150,
        "e": 11,
        "f": 11,
        "g": 11,
        "h": 11,
        "i": 11,
        "j": 11,
        "k": 11,
        "l": 11
    }
}

```

### Get Power Data

#### Request
`GET /power?project_id=PROJECT_ID&datetime=DATETIME`

- `datetime` (required): The datetime for which to retrieve product data. Must be in ISO 8601 format at UTC.
- `project_id` (required): The ID of the project for which to retrieve product data.

#### Response
Returns a JSON object that populates the guage data, current ev charger load, power flow. This Response contains 
all of the data that is updated every 1 minute from Google Firebase. For the 24-hour demand drill in the data at the one minute level is added and the oldest entry is dropped. 

##### Example Response with comments.
```json
{
    "scenerio": "Cost-Savings Mode", // project goal. Could also be "Back up power Mode"
    "read_time": "2023-03-23T22:58:00.000Z", // 1. Time of the read in UTC ISO format
    "grid_imported_kw": 7.0, // 1 "Grid Imported Power" in Intertie system tab
    "site_load_kw": 14.0, // Used for guage maximum in "Intertie System tab" 
    "inverter_power_kw": 30.0, //  Used in battery system "Discharging kw" also magnitude of guage
    "grid_load_state": "Exporting to Grid", //Used in "Intertie System" as alternative to "imported Grid "Power" when "grid imported kw" is below 0 kW
    "inverter_state": "Discharging", // Battery System text when inverter is on.
    "solar_state": "Generating", // Text for the solar generation. 
    "discharge_energy_remaining_kwh": 156.0, // Current state in battery discharging
    "battery_soc": 84.0, // Alternative to dicaharge energy remaining kwh in small battery visualization
    "solar_generated_kw": 36.0, // Main number and in solar generation visualization under "Generating"
    "total_ev_charger_load_kw": 50, //The call out number and guage length for the EV charger dial
    "ev_chargers_in_use": 3, // The number of EV chargers where load > 0 kW
    "ev_charger_state": "Delivering", // the text above the ev charger generation
    "battery_status": "green",
    // for real-time  power
    "solar_to_site_load_kw": 100, // solar generated minus solar to battery minus solar to grid
    "solar_to_battery_kw": 100, // AC systems: inverter power when inverter "battery_state" is charging, DC systems: solar minus inverter discharging
    "solar_to_grid_kw": 0, // grid_imported_kw  when negetive. else 0
    "grid_to_battery_kw": 10, // AC: inverter_power_kw - solar_generated_kw when inverter_state = "charging" and greater than 0 
    "grid_to_site_load_kw": 0, // grid_imported_kw when greater than 0  
    "battery_to_site_load_kw": 20, // inverter power when "inverter_state" is charging
    "power_grid_import_kw": 200, // similar to grid_imported_kw but only shows positive values
     "single_ev_charger_load_kw" : 
    ["a" : 112, 
     "b" : 88,
     "c" : 73, 
     "d" : 0, 
     "e" : 11, 
     "f" : 11,
     "g" : 8,
     "h" : 2, 
     "i" : 5,
     "j" : 0, 
     "k" : 0, 
     "l" : 0]
    }
```

### Get Energy Data

#### Request
`GET /energy?project_id=PROJECT_ID&datetime=DATETIME`

- `startdatetime` (required): The datetime for which to retrieve product data. Must be in ISO 8601 format in UTC.
- `enddatetime` (required): The datetime for which to retrieve product data. Must be in ISO 8601 format in UTC.
- `project_id` (required): The ID of the project for which to retrieve product data.

#### Response
Returns a JSON object that populates all the 72-hour bar charts on the status page. It refreshes once every hour and should always have  72 hours of data.  

##### Example Response with comments.

```json
{"battery_energy_kwh": 
[["2023-03-24T17:00:00.000Z", 24.4, 45.4], //first number is % full second is kWh
 ["2023-03-24T16:00:00.000Z", 17.8, 34.2],
 ["2023-03-24T15:00:00.000Z", 11.0, 27.5],
 ["2023-03-24T14:00:00.000Z", 11.8, 21.9],
 ["2023-03-24T13:00:00.000Z", 17.6, 32.8],
 ["2023-03-24T12:00:00.000Z", 23.2, 43.2],
 ["2023-03-24T11:00:00.000Z", 28.8, 53.6]]
 ...
 , "ev_charger_energy_kWh":
 [["2023-03-24T17:00:00.000Z", 10.7],  // total energy delivered in in kWh
 ["2023-03-24T16:00:00.000Z", 25.0],
 ["2023-03-24T15:00:00.000Z", 35.5],
 ["2023-03-24T14:00:00.000Z", 35.7],
 ["2023-03-24T13:00:00.000Z", 15.8],
 ["2023-03-24T12:00:00.000Z", 0.0],
 ["2023-03-24T11:00:00.000Z", 11.1],
 ["2023-03-24T10:00:00.000Z", 11.9]]
...
 , "solar_energy_kwh":
  [["2023-03-24T17:00:00.000Z",49.3], // total energy generated in kWh
 ["2023-03-24T16:00:00.000Z", 51.7],
 ["2023-03-24T15:00:00.000Z", 59.6],
 ["2023-03-24T14:00:00.000Z", 51.6],
 ["2023-03-24T13:00:00.000Z", 28.5],
 ["2023-03-24T12:00:00.000Z", 25.8],
 ["2023-03-24T11:00:00.000Z", 6.2],
 ["2023-03-31T15:00:00.000Z", 7.7]]
 ...
}
```
### Get Energy Data
This is for the data on the Performance page. This data returns when the user hits "refresh" and is updated on an ad hoc basis. 

#### Request
`GET /product?project_id=PROJECT_ID&datetime=DATETIME`

- `start_datetime` (required): The datetime for which to retrieve product data. Must be in ISO 8601 format at UTC.
- `end_datetime` (required): The datetime for which to retrieve product data. Must be in ISO 8601 format at UTC.
- `project_id` (required): The ID of the project for which to retrieve product data.

#### Response
Returns a JSON object that populates the Performance view 
```json
{"energy_consumption_and_production_kwh": [
    [
        "2023-04-04T15:00:00.000Z", //timestamp
        47.0, // solar_generated_kwh
        30.0, // inverter_discharge_kwh
        0.0, // inverter_charger_kwh
        -15.0,  //net_energy_consumption_kwh
        0.0, //imported_grid_energy_consumption_kwh
        -15.0, //exported_grid_energy_consumption_kwh
        14.0 //total_building_demand_kwh
    ], 	 
    [
        "2023-04-04T14:00:00.000Z",
        54.0,
        30.0,
        0.0,
        -13.0,
        0.0,
        -13.0,
        17.0
    ]],
    ... // Will be as long as the number of bars selected. 
"summary_stats": ["grid":  {
                            "period_max_kw" : 62.0
                            , "period_total_kwh":  350.75
                            },
                  "solar": {
                           "period_max_kw": 63.0
                           , "period_total_kwh": 880.5
                           },
                  "battery_discharge": {
                          "period_max_kw": 30.0
                          , "period_total_kwh": 3647.5
                          },
                  "battery_charge": {
                          "period_max_kw": 63.0 
                          , "period_total_kwh": 880.5
                          },
                  "builing_only": {
                          "period_max_kw": 65.0 
                          , "period_total_kwh":  1083.75
                          },
                  "ev_chargers": {
                          "period_max_kw": 220.0
                          , "period_total_kwh": 764.75
                          }
                      ]
  }
  ```
