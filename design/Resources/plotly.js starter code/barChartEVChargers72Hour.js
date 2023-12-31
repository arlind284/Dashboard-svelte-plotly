

///// EV CHARGERS 72 HOUR BAR CHART

//HTML:

// <head>
// 	<!-- Load plotly.js into the DOM -->
// 	<script src='https://cdn.plot.ly/plotly-2.6.3.min.js'></script>
// </head>

// <body>
// 	<div id='myDiv'><!-- Plotly chart will be drawn inside this DIV --></div>
// </body>

var seriesName =  "Combined EV Charger Energy Consumption (kWh)" // "Battery State of Charge (kWh and %) Remaining) "
var barColor = "3ABCDE"                                        // "64B583"

var sampleResponse = [["2023-03-23T23:00:00.000Z", 10.7], // date here is in UTC should covert to PST, values are in UTC.
 ["2023-03-23T22:00:00.000Z", 25.0],
 ["2023-03-23T21:00:00.000Z", 35.5],
 ["2023-03-23T20:00:00.000Z", 35.7],
 ["2023-03-23T19:00:00.000Z", 15.8],
 ["2023-03-23T18:00:00.000Z", 0.0],
 ["2023-03-23T17:00:00.000Z", 11.1],
 ["2023-03-23T16:00:00.000Z", 11.9],
 ["2023-03-23T15:00:00.000Z", 7.0],
 ["2023-03-23T14:00:00.000Z", 0.7],
 ["2023-03-23T13:00:00.000Z", 0.0],
 ["2023-03-23T12:00:00.000Z", 0.0],
 ["2023-03-23T11:00:00.000Z", 0.0],
 ["2023-03-23T10:00:00.000Z", 0.0],
 ["2023-03-23T09:00:00.000Z", 0.0],
 ["2023-03-23T08:00:00.000Z", 0.0],
 ["2023-03-23T07:00:00.000Z", 0.0],
 ["2023-03-23T06:00:00.000Z", 0.0],
 ["2023-03-23T05:00:00.000Z", 0.0],
 ["2023-03-23T04:00:00.000Z", 0.0],
 ["2023-03-23T03:00:00.000Z", 0.0],
 ["2023-03-23T02:00:00.000Z", 0.2],
 ["2023-03-23T01:00:00.000Z", 3.2],
 ["2023-03-23T00:00:00.000Z", 11.1],
 ["2023-03-22T23:00:00.000Z", 24.8],
 ["2023-03-22T22:00:00.000Z", 14.8],
 ["2023-03-22T21:00:00.000Z", 41.8],
 ["2023-03-22T20:00:00.000Z", 44.9],
 ["2023-03-22T19:00:00.000Z", 57.0],
 ["2023-03-22T18:00:00.000Z", 16.4],
 ["2023-03-22T17:00:00.000Z", 9.0],
 ["2023-03-22T16:00:00.000Z", 4.4],
 ["2023-03-22T15:00:00.000Z", 0.0],
 ["2023-03-22T14:00:00.000Z", 0.0],
 ["2023-03-22T13:00:00.000Z", 0.0],
 ["2023-03-22T12:00:00.000Z", 0.0],
 ["2023-03-22T11:00:00.000Z", 0.0],
 ["2023-03-22T10:00:00.000Z", 0.0],
 ["2023-03-22T09:00:00.000Z", 0.0],
 ["2023-03-22T08:00:00.000Z", 0.0],
 ["2023-03-22T07:00:00.000Z", 0.0],
 ["2023-03-22T06:00:00.000Z", 0.0],
 ["2023-03-22T05:00:00.000Z", 0.0],
 ["2023-03-22T04:00:00.000Z", 0.0],
 ["2023-03-22T03:00:00.000Z", 0.0],
 ["2023-03-22T02:00:00.000Z", 0.0],
 ["2023-03-22T01:00:00.000Z", 0.0],
 ["2023-03-22T00:00:00.000Z", 0.0],
 ["2023-03-21T23:00:00.000Z", 0.0],
 ["2023-03-21T22:00:00.000Z", 0.0],
 ["2023-03-21T21:00:00.000Z", 2.8],
 ["2023-03-21T20:00:00.000Z", 14.3],
 ["2023-03-21T19:00:00.000Z", 8.1],
 ["2023-03-21T18:00:00.000Z", 5.3],
 ["2023-03-21T17:00:00.000Z", 3.4],
 ["2023-03-21T16:00:00.000Z", 1.7],
 ["2023-03-21T15:00:00.000Z", 0.1],
 ["2023-03-21T14:00:00.000Z", 0.0],
 ["2023-03-21T13:00:00.000Z", 0.0],
 ["2023-03-21T12:00:00.000Z", 0.0],
 ["2023-03-21T11:00:00.000Z", 0.0],
 ["2023-03-21T10:00:00.000Z", 0.0],
 ["2023-03-21T09:00:00.000Z", 0.0],
 ["2023-03-21T08:00:00.000Z", 0.0],
 ["2023-03-21T07:00:00.000Z", 0.0],
 ["2023-03-21T06:00:00.000Z", 0.0],
 ["2023-03-21T05:00:00.000Z", 0.0],
 ["2023-03-21T04:00:00.000Z", 0.0],
 ["2023-03-21T03:00:00.000Z", 0.0],
 ["2023-03-21T02:00:00.000Z", 0.1],
 ["2023-03-21T01:00:00.000Z", 5.3],
 ["2023-03-21T00:00:00.000Z", 17.9],
 ["2023-03-20T23:00:00.000Z", 22.4]];


function extractColumnToList(sampleResponse, columni) {
  let result = [];
  for (let i = columni; i < sampleResponse.length; i++) {
    result.push(sampleResponse[i][columni]);
  }
  return result;
}

var hours = extractColumnToList(sampleResponse, 0);

var trace1 = {
    x: hours,
    y: extractColumnToList(sampleResponse, 1),
    type: "bar",
    marker: {color: barColor},
    name: seriesName,
    hovertemplate: "On <b>%{x}</b><br>EV Chargers Consumed <b>%{y:.0f} kWh</b><extra></extra>"
};

var data = [trace1];

var layout = {
   showlegend : true,
    legend : {
        x : 1, xanchor: 'auto',
        y : 1.1, yanchor: "bottom",
        traceorder : 'normal',
        font : {
            family : 'Helvetica',
            size : 14,
            color : 'white', 
        }
    },
    xaxis: { title: "", type:"date", color: "white",
            tickfont: {
              family: "Helvetica",
      size: 18
    }, dtick: 6 * 60 * 60 * 1000  },
    yaxis: {
      tick0: 20, 
      title: "kWh", 
           tickfont: {
           family: "Helvetica",
           size: 15}, 
           dtick: 20,
           color: "white"
          },
          
    width: 1531, 
    height: 530, 
    plot_bgcolor: '#040932', 
    paper_bgcolor: '#040932'
};

Plotly.newPlot("myDiv", data , layout);
