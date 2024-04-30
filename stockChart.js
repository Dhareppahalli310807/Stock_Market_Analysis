import { getGraphData } from './stockData.js';
import { currentStock } from './stockData.js';

let timeRange = ['1month', '6month', '1year', '2year'];

let currentRange = timeRange[0];

const chartSection = document.getElementById('chart');

export const plotTheGraph = async () => {
  const graphData = await getGraphData();
  let coordinatesObj;
  graphData.map((it) => {
    coordinatesObj = it[currentStock];
  });
  let { value, timeStamp } = coordinatesObj[currentRange];
  const convertedTimeStamp = convertTimeStamp(timeStamp);

  let textData = value.map(
    (val, index) => `${currentStock}: $${val.toFixed(2)}`
  );
  let data = [
    {
      x: convertedTimeStamp,
      y: value,
      type: 'linear',
      text: textData, 
      hovertemplate: '<b>%{text}</b>',
      line: { color: '#17BECF' },
      
    },
  ];
  let layout = {
    xaxis: {
      visible: false,
      showspikes: true, 
      spikemode: 'across', 
      spikethickness: 1, 
      spikecolor: 'green', 
    },
    yaxis: {
      visible: false, 
    },
    plot_bgcolor: 'transparent', 
    paper_bgcolor: 'transparent',
    hovermode: 'x', 
    hoverlabel: {
      bgcolor: 'white', 
      bordercolor: 'black', 
      font: { color: 'black' },
      xanchor: 'auto',
      align: 'auto', 
      namelength: 0,
    },
  };
  let config = {
    displayModeBar: false, 
  };
  Plotly.newPlot(chartSection, data, layout, config);
};

const convertTimeStamp = (timeStamp) => {
  const new_timestamp = timeStamp.map((it) =>
    new Date(it * 1000).toLocaleDateString()
  );
  return new_timestamp;
};

const timeBtn = document.querySelectorAll('.time_btn');

timeBtn.forEach((ele) => {
  ele.addEventListener('click', function () {
    currentRange = this.dataset.range;
    plotTheGraph();
  });
});
