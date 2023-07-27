
// Solar Generated Gauge

var maxText       =  "Est. Solar Capacity"
var guageColor    = "#F59E0B"
var sampleResponse = {
    "product_id": 1, // index of the project, doesn't show on front end
    "address" : "462 Northern St, Los Angeles, CA", 
    "scenerio" : "Cost-Savings Mode", // project goal. Could also be "Back up power Mode"
    "read_time": "2023-03-23T22:58:00.000Z", // 1. Time of the read in UTC ISO format
    "grid_imported_kw": 7.0,               // 1 "Grid Imported Power" in Intertie system tab
    "site_load_kw": 14.0, // Used for guage maximum in "Intertie System tab" 
    "inverter_power_kw": 22.0, //  Used in battery system "Discharging kw" also magnitude of guage
    "grid_load_state": "Exporting to Grid", //Used in "Intertie System" as alternative to "imported Grid "Power" when "grid imported kw" is below 0 kW
    "inverter_state": "Discharging",  // Battery System text when inverter is on.
    "solar_state" : "Generating", // Text for the solar generation. 
    "inverter_capacity_kw": 30.0, // "inverter capacity" comparision in battery system 
    "discharge_energy_remaining_kwh": 156.0, // Current state in battery discharging
    "soc_soc": 84.0, // Alternative to dicaharge energy remaining kwh in small battery visualization
    "battery_capacity_kwh": 186.0, // maximum of battery visualization
    "solar_generated_kw": 36.0, // Main number and in solar generation visualization under "Generating"
    "ac_solar_capacity_kw": 0.0, //if "0" then use th DC for the maximum comparison value for the "Solar Generated'
    "dc_solar_capacity_kw": 75.0, //if "0" then use th DC for the maximum comparison value for the "Solar Generated'
    "total_solar_capacity_kw": 75.0, // su     m of ac_solar_capacity_kw and dc_solar_capacity_kw.
    "ev_charger_load_kw": 50,  //The call out number and guage length for the EV charger dial
    "ev_charger_capacity_kw": 85, // The maximum value for the ev chargers
    "ev_chargers_in_use": 3,  // The number of EV chargers where load > 0 kW
    "ev_chargers": 5,  // the number of ev charges at the site.
    "ev_charger_state": "Delivering", // the text above the ev charger generation
    "battery_status": "green",
    // for real-time  power
    "solar_to_site_load_kw":  100, // solar generated minus solar to battery minus solar to grid
    "solar_to_battery_kw":    100,    // AC systems: inverter power when inverter "battery_state" is charging, DC systems: solar minus inverter discharging
    "solar_to_grid_kw":       0, // grid_imported_kw  when negetive. else 0
    "grid_to_battery_kw":     10, // AC: inverter_power_kw - solar_generated_kw when inverter_state = "charging" and greater than 0 
    "grid_to_site_load_kw":       0, // grid_imported_kw when greater than 0  
    "battery_to_site_load_kw":    20,  // inverter power when "inverter_state" is charging
    "power_grid_import_kw": 200 // similar to grid_imported_kw but only shows positive values
}

 
var trace1 = {
  
    type: "indicator",
    mode: "gauge",
    plot_bgcolor: "rgba(0,0,0,0)",
    value: sampleResponse.solar_generated_kw,
    //         , font: { size: 16 } },
    gauge: {
      axis: { visible: false, 
             range: [0, sampleResponse.total_solar_capacity_kw], 
     },
      bar: { color: guageColor
            , line: {width : 0}
            ,  thickness: 1
           },
     
      borderwidth: 1,
      bordercolor: guageColor,
      steps:[
        {range:[0, sampleResponse.total_solar_capacity_kw]
         , color: "030937" //"rgb(0,0,0,0)"
         , line: {color: guageColor
                  , width: 1}}
      ],
    
     
    }
  }
;

var data = [trace1]

var layout = {
  width :264,
  height :230,
  automargin: true,
  margin:{t:50,r :35,l :35,b :25},
  paper_bgcolor : "#040932",
  font:{color:"white", family:"Arial"}, 
  annotations:[
    {
      xref:'paper',
      yref:'paper',
      xanchor:'right',
      yanchor:'top',
      x:1,
      y:.15,
      showarrow:false,
      text: maxText +"<br><b>" +  sampleResponse.total_solar_capacity_kw + " kW</b>"
    }, 
  {
      xref:'paper',
      yref:'paper',
      xanchor:'center',
      yanchor:'top',
      x:.5,
      y: 1.2, 
      showarrow:false,
      text: sampleResponse.solar_state + "<br><b>" + sampleResponse.solar_generated_kw + " kW</br>"
    ,  font: { size: 14 } }
  ]};
Plotly.newPlot('myDiv', data, layout); 
