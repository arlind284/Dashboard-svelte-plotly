//plotly for stacked bar charts

///// BATTERY 72 HOUR BAR CHART

//HTML:

// <head>
// 	<!-- Load plotly.js into the DOM -->
// 	<script src='https://cdn.plot.ly/plotly-2.6.3.min.js'></script>
// </head>

// <body>
// 	<div id='myDiv'><!-- Plotly chart will be drawn inside this DIV --></div>
// </body>
var seriesName = "Battery State of Charge (kWh and %)"
var barColor = "64B583"
var batteryCapacity = 150

var barColor = "F59E0B"                   //"3ABCDE"                                        // "64B583"

function extractColumnToList(sampleResponse, columni) {
  let result = [];
  for (let i = columni; i < sampleResponse.length; i++) {
    result.push(sampleResponse[i][columni]);
  }
  return result;
}

var sampleResponse = [["2023-03-24T17:00:00.000Z", 24.4, 45.4],
 ["2023-03-24T16:00:00.000Z", 17.8, 34.2],
 ["2023-03-24T15:00:00.000Z", 11.0, 27.5],
 ["2023-03-24T14:00:00.000Z", 11.8, 21.9],
 ["2023-03-24T13:00:00.000Z", 17.6, 32.8],
 ["2023-03-24T12:00:00.000Z", 23.2, 43.2],
 ["2023-03-24T11:00:00.000Z", 28.8, 53.6],
 ["2023-03-24T10:00:00.000Z", 32.0, 59.6],
 ["2023-03-24T09:00:00.000Z", 32.0, 59.6],
 ["2023-03-24T08:00:00.000Z", 32.0, 59.6],
 ["2023-03-24T07:00:00.000Z", 32.0, 59.6],
 ["2023-03-24T06:00:00.000Z", 32.0, 59.6],
 ["2023-03-24T05:00:00.000Z", 32.0, 59.6],
 ["2023-03-24T04:00:00.000Z", 32.0, 59.6],
 ["2023-03-24T03:00:00.000Z", 44.8, 83.4],
 ["2023-03-24T02:00:00.000Z", 61.6, 114.8],
 ["2023-03-24T01:00:00.000Z", 77.6, 144.6],
 ["2023-03-24T00:00:00.000Z", 82.4, 153.5],
 ["2023-03-23T23:00:00.000Z", 83.6, 155.8],
 ["2023-03-23T22:00:00.000Z", 70.0, 130.4],
 ["2023-03-23T21:00:00.000Z", 52.8, 98.4],
 ["2023-03-23T20:00:00.000Z", 38.4, 71.5],
 ["2023-03-23T19:00:00.000Z", 32.0, 59.6],
 ["2023-03-23T18:00:00.000Z", 23.2, 43.2],
 ["2023-03-23T17:00:00.000Z", 16.8, 31.3],
 ["2023-03-23T16:00:00.000Z", 10.2, 19.0],
 ["2023-03-23T15:00:00.000Z", 7.6, 9.3],
 ["2023-03-23T14:00:00.000Z", 7.6, 8.5],
 ["2023-03-23T13:00:00.000Z", 7.6, 8.5],
 ["2023-03-23T12:00:00.000Z", 7.6, 8.5],
 ["2023-03-23T11:00:00.000Z", 7.6, 8.5],
 ["2023-03-23T10:00:00.000Z", 7.6, 8.5],
 ["2023-03-23T09:00:00.000Z", 7.6, 8.5],
 ["2023-03-23T08:00:00.000Z", 7.6, 8.5],
 ["2023-03-23T07:00:00.000Z", 7.6, 8.5],
 ["2023-03-23T06:00:00.000Z", 7.6, 8.5],
 ["2023-03-23T05:00:00.000Z", 7.6, 8.2],
 ["2023-03-23T04:00:00.000Z", 7.6, 8.2],
 ["2023-03-23T03:00:00.000Z", 7.6, 13.7],
 ["2023-03-23T02:00:00.000Z", 14.0, 26.0],
 ["2023-03-23T01:00:00.000Z", 29.2, 54.4],
 ["2023-03-23T00:00:00.000Z", 39.8, 74.1],
 ["2023-03-22T23:00:00.000Z", 43.0, 80.1],
 ["2023-03-22T22:00:00.000Z", 51.4, 95.7],
 ["2023-03-22T21:00:00.000Z", 45.4, 84.6],
 ["2023-03-22T20:00:00.000Z", 37.4, 69.7],
 ["2023-03-22T19:00:00.000Z", 21.6, 40.2],
 ["2023-03-22T18:00:00.000Z", 14.6, 23.4],
 ["2023-03-22T17:00:00.000Z", 12.2, 14.1],
 ["2023-03-21T21:00:00.000Z", 11.2, 20.8],
 ["2023-03-21T20:00:00.000Z", 10.0, 18.6],
 ["2023-03-21T19:00:00.000Z", 10.2, 19.0],
 ["2023-03-21T18:00:00.000Z", 9.8, 18.6],
 ["2023-03-21T17:00:00.000Z", 11.6, 21.6]]


var seriesName = "Battery State of Charge (kWh and %)"
var barColor = "64B583"
var batteryCapacity = 150

var hours = extractColumnToList(sampleResponse, 0)

//This is for the actual values
var trace1 = {
    x: hours,
    y:  extractColumnToList(sampleResponse, 1),
    type: "bar",
    marker: {color: barColor},
    name: seriesName,
    
};

var trace2 = {
    x: hours,
    y:  extractColumnToList(sampleResponse, 2),
    text:  extractColumnToList(sampleResponse, 1),
    textposition: "none",
    //customDate
    type: "bar",
    marker: {color: barColor},
    name: seriesName, 
    yaxis: "y2", 
    showlegend: false,
    hovertemplate: "On <b>%{x}</b><br><br>battery was <b>%{y:.0f}%</b> full" + "<br>(<b>%{text:.0f} kWh</b> remaining)<extra></extra>"};
 
var data = [trace1, trace2];

var layout = {
    //title: "72 Hour Solar Generation Data",
  //hovermode: "x", 
  showlegend : true,
    legend : {
        x : 1, xanchor: 'auto',
        y : 1.1, yanchor: "bottom",
        traceorder : 'normal',
        font : {
            family : 'Helvetica',
            size : 14,
            color : 'white'
        }
    },
    xaxis: { title: "", type:"date", color: "white",
            tickfont: {
              family: "Helvetica",
              size: 18, 
              color: "white"
    }, dtick: 6 * 60 * 60 * 1000  },
    
    yaxis1: {
      tick0: 20, 
      title: "kWh", 
      color: "white",
      tickfont: {
        family: "Helvetica",
        size: 15, 
        color: "white"}, 
      dtick: 20,
      side: "left",
          },
     yaxis2:{
       title: "%",
          overlaying:'n',
          showgrid: false,
          side:'right', 
          showlegend: true, 
          color: "white"},
    width: 1531, 
    height: 530, 
    plot_bgcolor: '#040932', 
    paper_bgcolor: '#040932',
   
};

Plotly.newPlot("myDiv", data , layout);
