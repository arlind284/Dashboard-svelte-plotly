
// basic gauge
var maxValue      = 365;
var currentValue  = 250;
var stateText     = "Imported Grid Power"
var maxText       = "Site Load"
var guageColor    = "#788AA1"

 
var trace1 = {
    type: "indicator",
    mode: "gauge",
    plot_bgcolor: "rgba(0,0,0,0)",
    value: currentValue,
    //         , font: { size: 16 } },
    gauge: {
      axis: { visible: false, 
             range: [0, maxValue], 
     },
      bar: { color: guageColor
            , line: {width : 0}
            ,  thickness: 1
           },
     
      borderwidth: 1,
      bordercolor: guageColor,
      steps:[
        {range:[0, currentValue]
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
      text: maxText +"<br><b>" + maxValue + " kW</b>"
    }, 
  {
      xref:'paper',
      yref:'paper',
      xanchor:'center',
      yanchor:'top',
      x:.5,
      y: 1.2, 
      showarrow:false,
      text: stateText + "<br><b>" + currentValue + " kW</br>"
    ,  font: { size: 14 } }
  ]};
Plotly.newPlot('myDiv', data, layout); 
