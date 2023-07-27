//plotly for stacked bar charts

///// SOLAR GENERATED 72 HOUR BAR CHART

//HTML:

// <head>
// 	<!-- Load plotly.js into the DOM -->
// 	<script src='https://cdn.plot.ly/plotly-2.6.3.min.js'></script>
// </head>

// <body>
// 	<div id='myDiv'><!-- Plotly chart will be drawn inside this DIV --></div>
// </body>

var seriesName = "Solar Generation (kWh)" // "Combined EV Charger Energy Consumption (kWh)" // "Battery State of Charge (kWh and %) Remaining) "
var barColor = "F59E0B"                   //"3ABCDE"                                        // "64B583"

function extractColumnToList(sampleResponse, columni) {
  let result = [];
  for (let i = columni; i < sampleResponse.length; i++) {
    result.push(sampleResponse[i][columni]);
  }
  return result;
}

sampleResponse = [["2023-03-31T22:00:00.000Z", 49.3],
 ["2023-03-31T21:00:00.000Z", 51.7],
 ["2023-03-31T20:00:00.000Z", 59.6],
 ["2023-03-31T19:00:00.000Z", 51.6],
 ["2023-03-31T18:00:00.000Z", 28.5],
 ["2023-03-31T17:00:00.000Z", 25.8],
 ["2023-03-31T16:00:00.000Z", 6.2],
 ["2023-03-31T15:00:00.000Z", 7.7],
 ["2023-03-31T14:00:00.000Z", 0.9],
 ["2023-03-31T13:00:00.000Z", 0.0],
 ["2023-03-31T12:00:00.000Z", 0.0],
 ["2023-03-31T11:00:00.000Z", 0.0],
 ["2023-03-31T10:00:00.000Z", 0.0],
 ["2023-03-31T09:00:00.000Z", 0.0],
 ["2023-03-31T08:00:00.000Z", 0.0],
 ["2023-03-31T07:00:00.000Z", 0.0],
 ["2023-03-31T06:00:00.000Z", 0.0],
 ["2023-03-31T05:00:00.000Z", 0.0],
 ["2023-03-31T04:00:00.000Z", 0.0],
 ["2023-03-31T03:00:00.000Z", 0.0],
 ["2023-03-31T02:00:00.000Z", 0.5],
 ["2023-03-31T01:00:00.000Z", 7.9],
 ["2023-03-31T00:00:00.000Z", 22.3],
 ["2023-03-30T23:00:00.000Z", 32.4],
 ["2023-03-30T22:00:00.000Z", 43.5],
 ["2023-03-30T21:00:00.000Z", 64.9],
 ["2023-03-30T20:00:00.000Z", 60.5],
 ["2023-03-30T19:00:00.000Z", 62.2],
 ["2023-03-30T18:00:00.000Z", 45.6],
 ["2023-03-30T17:00:00.000Z", 38.5],
 ["2023-03-30T16:00:00.000Z", 25.7],
 ["2023-03-30T15:00:00.000Z", 8.0],
 ["2023-03-30T14:00:00.000Z", 0.8],
 ["2023-03-30T13:00:00.000Z", 0.0],
 ["2023-03-30T12:00:00.000Z", 0.0],
 ["2023-03-30T11:00:00.000Z", 0.0],
 ["2023-03-30T10:00:00.000Z", 0.0],
 ["2023-03-30T09:00:00.000Z", 0.0],
 ["2023-03-30T08:00:00.000Z", 0.0],
 ["2023-03-30T07:00:00.000Z", 0.0],
 ["2023-03-30T06:00:00.000Z", 0.0],
 ["2023-03-30T05:00:00.000Z", 0.0],
 ["2023-03-30T04:00:00.000Z", 0.0],
 ["2023-03-30T03:00:00.000Z", 0.0],
 ["2023-03-30T02:00:00.000Z", 0.7],
 ["2023-03-30T01:00:00.000Z", 5.4],
 ["2023-03-30T00:00:00.000Z", 6.7],
 ["2023-03-29T23:00:00.000Z", 11.4],
 ["2023-03-29T22:00:00.000Z", 12.8],
 ["2023-03-29T21:00:00.000Z", 21.4],
 ["2023-03-29T20:00:00.000Z", 7.0],
 ["2023-03-29T19:00:00.000Z", 16.3],
 ["2023-03-29T18:00:00.000Z", 15.7],
 ["2023-03-29T17:00:00.000Z", 18.0],
 ["2023-03-29T16:00:00.000Z", 7.8],
 ["2023-03-29T15:00:00.000Z", 4.1],
 ["2023-03-29T14:00:00.000Z", 0.7],
 ["2023-03-29T13:00:00.000Z", 0.0],
 ["2023-03-29T12:00:00.000Z", 0.0],
 ["2023-03-29T11:00:00.000Z", 0.0],
 ["2023-03-29T10:00:00.000Z", 0.0],
 ["2023-03-29T09:00:00.000Z", 0.0],
 ["2023-03-29T08:00:00.000Z", 0.0],
 ["2023-03-29T07:00:00.000Z", 0.0],
 ["2023-03-29T06:00:00.000Z", 0.0],
 ["2023-03-29T05:00:00.000Z", 0.0],
 ["2023-03-29T04:00:00.000Z", 0.0],
 ["2023-03-29T03:00:00.000Z", 0.0],
 ["2023-03-29T02:00:00.000Z", 0.0],
 ["2023-03-29T01:00:00.000Z", 1.5],
 ["2023-03-29T00:00:00.000Z", 25.5],
 ["2023-03-28T23:00:00.000Z", 35.1],
 ["2023-03-28T22:00:00.000Z", 17.9]]

let result = extractColumnToList(sampleResponse);
console.log(result);

var hours = extractColumnToList(sampleResponse, 0); 

var trace1 = {
    x: hours,
    y:extractColumnToList(sampleResponse, 1),
    type: "bar",
    marker: {color: barColor},
    name: seriesName, 
    hovertemplate: "On <b>%{x}</b><br>solar generated <b>%{y:.0f} kWh</b><extra></extra>"
};

var data = [trace1];

var layout = {
    //title: "72 Hour Solar Generation Data",
   showlegend : true,
    legend : {
        x : 1, xanchor: 'auto',
        y : 1.1, yanchor: "bottom",
        traceorder : 'normal',
        font : {
            family : 'Helvetica', // This is probably not inline with the Figma
            size : 14, // This is probably not inline with the Figma
            color : 'white' // This is probably not inline with the Figma
        }
    },
    xaxis: { title: "", type:"date",
            tickfont: {
              family: "Helvetica",
              color: "white",
      size: 18
    }, dtick: 6 * 60 * 60 * 1000  },
    yaxis: {
      tick0: 20, 
      title: "kWh", 
           tickfont: {
           family: "Helvetica", // This is probably not inline with the Figma
           size: 15}, // This is probably not inline with the Figma
           dtick: 20,
           color: "white"
          },
          
    width: 1531, 
    height: 530, 
    plot_bgcolor: '#040932', 
    paper_bgcolor: '#040932'
};

Plotly.newPlot("myDiv", data , layout);
