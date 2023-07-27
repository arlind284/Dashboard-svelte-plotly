let nestedLists =  [[0, 11, 111, 0], [8, 3, 0, 2, 1, 2, 1, 5, 10, 11] ];

for (let i = 0; i < nestedLists.length; i++) {
    nestedLists [i].sort((a,b) => b - a);
}

var sampleResponse = nestedLists;
var inUseAll       = "" + sampleResponse.flat().reduce((acc, val) => val === 0 ? acc + 1 : acc, 0) + " out of " + sampleResponse.flat().length ;

var inUse150kW     = "" + sampleResponse[0].reduce((acc, val) => val != 0 ? acc + 1 : acc, 0)  + " of " + sampleResponse[0].length ;
var inUse11kW      = "" + sampleResponse[1].reduce((acc, val) => val != 0 ? acc + 1 : acc, 0)// + " of " + sampleResponse[1].length ;

var gauges = sampleResponse.flat().map(function(value, index) {
    var row;
    var column;
    if (index < sampleResponse[0].length) {
        row = Math.floor(index / 5);
        column = index % 5;
    } else {
        row = Math.floor(((index)- sampleResponse[0].length) / 5) + Math.floor((sampleResponse[0].length +1) / 5) +1;
        column =  (((index) - sampleResponse[0].length) % 5);
    }
    return {
        type: 'indicator',
        mode: 'gauge+number',
        value: value,
        
        domain: { row: row, column: column },
        gauge: {
      axis: { visible: false, 
             range: [0,  index >= sampleResponse[0].length ? 11 : 150], 
     },
      bar: { color: index >= sampleResponse[0].length ? "#3ABCDE" : "73d0e7" 
            , line: {width : 0}
            ,  thickness: 1
           }, 
      borderwidth: 1,
      bordercolor: index >= sampleResponse[0].length ? "#3ABCDE" : "73d0e7" 
    }, 
      steps:[
        {range:[0, index >= sampleResponse[0].length ? 11 : 150]
         , color: index >= sampleResponse[0].length ? "#3ABCDE" : "73d0e7" //"rgb(0,0,0,0)"
         , line: {color:  index > sampleResponse[0].length ? "#3ABCDE" : "73d0e7" 
                  , width: 1}}
      ],
      number:{suffix: " kW",
              prefix: "delivering<br>",
              color: "3ABCDE",
              font: {size : 13, 
                     color: "white" }}, 
      title: {text: index >= sampleResponse[0].length ? "[Unique Number]"  : "[Unique Number]"
              , font: {size :12, color: "3ABCDE"}} 
       }
  });

var emptyTrace = {type: 'indicator',
        domain: { row: (Math.ceil(sampleResponse[0].length / 5)) , column: 0},
        align: "left",
        position: "top",
        mode: 'number',
        //title: {text: "hi mom", yanchor: "bottom", xanchor: "left"} ,
        value: inUse11kW, 
        number: {suffix: " of " + sampleResponse[1].length + " Level2 Chargers in Use Delivering " + sampleResponse[1].reduce((a, b) => a + b) + " kW",
                prefix : "⚡",
            font: {size : 25, 
            color: "3ABCDE" 
           }}}
   

var layout = {
    width: 1100,
    height: 1000,
    title: {
    text: "⚡" + inUse150kW + " Fast Chargers in Use Delivering " + sampleResponse[0].reduce((a, b) => a + b) + " kW",
    font: {
      color: '3ABCDE',
      size: 25
    },
    x: .08,
    y: 1.1,
    xanchor: 'left'
  },   
    grid: { rows: Math.ceil(sampleResponse.flat().length / 5) +1
           , columns: 5
           , pattern: 'independent'}
      //   , annotations: [
      //   {
      //     text:  "⚡" + inUse150kW + ' Level2 Chargers in Use'
      //     , font: {color: "3ABCDE", size : 25},
      //     showarrow: false,
      //     x: 0,
      //     xref: "x domain",
      //     y: .40,
      //     yref: "y domain"
      //   }
      // ], 
    , paper_bgcolor : "#040932",
  };

allTraces = gauges.concat(emptyTrace);
Plotly.newPlot('myDiv', allTraces,  layout);

 
