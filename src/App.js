import React, { useState } from 'react';
import * as d3 from 'd3';
import LineClass from './LineClass';
import LineSVG from './LineSVG';
import TimeLineChart from './ChartClass/TimeLineChart';
import LineChart from './ChartClass/LineChart';
import { XAxisTime, YAxisLinear, Line } from './ChartClass/ChartComponent';

function App() {

  const xTickFormat = '%d-%m-%Y';
  const start = new Date(2012, 0, 1);
  const end = new Date();
  const width = 550;
  const height = 440;
  const margin = {top: 10, right: 30, bottom: 30, left: 60};

  function randomDate() {
    const temp = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    return  temp.getDate() + '-' + (temp.getMonth() + 1) + '-' + temp.getFullYear();
  }
  const generateData = (value, length = 5) =>
  {
    return d3.range(length).map(() => ({
      date: d3.timeParse(xTickFormat)(randomDate()),
      value: value === null || value === undefined ? Math.random() * 1000 : +value
    }));
  };

  const [data, setData] = useState(generateData());
  const changeData = () => {
    setData(generateData());
  };

  /*********************************************************************************************/
  const sampleData = [
    { date: '27-07-2013', red: 5, green: 1, yellow: 2, target: 1, value: 3 },
    { date: '27-09-2013', red: 5, green: 3, yellow: 4, target: 3, value: 5 },
    { date: '07-10-2013', red: 6, green: 2, yellow: 4, target: 2, value: 3 },
    { date: '27-07-2014', red: 5, green: 1, yellow: 2, target: 1, value: 0 },
    { date: '27-07-2015', red: 5, green: 1, yellow: 2, target: 1, value: 2 }
  ];
  const sampleLineData = sampleData.map(d => ({
    red: +d.red,
    green: +d.green,
    yellow: +d.yellow,
    target: +d.target,
    value: +d.value,
    date: d3.timeParse('%d-%m-%Y')(d.date)
  }));
  const topvalue = d3.max(sampleLineData, function(d) {
    return Math.max(d.yellow, d.red, d.value, d.target, d.green);
  });

  const chartWidth = width - margin.left - margin.right;
  const chartHeight = height - margin.top - margin.bottom;
  const xScale = d3.scaleTime();
  const yScale = d3.scaleLinear();
  xScale.domain(d3.extent(sampleLineData, d=>d.date))
    .range([0, chartWidth]);
  yScale.domain([0, topvalue])
    .range([chartHeight, 0]);

  const metaData = {
    xScale,
    yScale,
    xTickFormat
  };
  const lineDataValue = {
    data: sampleLineData.map((d)=>({
      y: yScale(d.value),
      x: xScale(d.date)
    }))
  };
  const lineDataRed = {
    data: sampleLineData.map((d)=>({
      y: yScale(d.red),
      x: xScale(d.date)
    }))
  };
  const lineDataYellow = {
    data: sampleLineData.map((d)=>({
      y: yScale(d.yellow),
      x: xScale(d.date)
    }))
  };
  const xAxis = <XAxisTime {...metaData} transform= {`translate(0,${chartHeight})`} />;
  const yAxis = <YAxisLinear {...metaData} />;
  const lineValue = <Line {...lineDataValue} class='line' />;
  const lineRed = <Line {...lineDataRed} class='line-red' />;
  const lineYellow = <Line {...lineDataYellow} class='line-yellow' />;
  /**********************************************************************************************/
  return (
    <div className="App">
      <div>
        <button onClick={changeData}>Transform</button>
      </div>
      <div>
        <span className="label">Class Line </span>
        <LineClass
          data={data}
          width={width}
          height={height}
          margin={margin}
        />
      </div>
      <div>
        <span className="label">Line SVG (Hook)</span>
        <LineSVG
          data={data}
          width={width}
          height={height}
          margin={margin}
        />
      </div>
      <div>
        <span className="label">Line Class with more flexibility</span>
        <TimeLineChart
          data={data}
          width={width}
          height={height}
          xFn={d=>d.date}
          yFn={d=>d.value}
          margin={margin}
          lineclass='line'
          xTickFormat={xTickFormat} />
      </div>
      <div>
        <span className="label">Line Class with Line as child Component with Sample Data</span>
        <LineChart
          xAxis={xAxis}
          yAxis={yAxis}
          width={width}
          height={height}
          margin={margin}>
          {lineValue}
          {lineRed}
          {lineYellow}
        </LineChart>
      </div>
    </div>
  );
}


export default App;
