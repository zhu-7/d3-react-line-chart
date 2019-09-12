import React, { useState } from 'react';
import * as d3 from 'd3';
import LineClass from './LineClass';
import LineSVG from './LineSVG';
import TimeLineChart from './ChartClass/TimeLineChart';
import LineChart from './ChartClass/LineChart';

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
    d3.range(length).map(() => ({
      date: d3.timeParse(xTickFormat)(randomDate()),
      value: value === null || value === undefined ? Math.random() * 1000 : +value
    }));


  const [data, setData] = useState(generateData());
  const changeData = () => {
    setData(generateData());
  };



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
          xTickFormat={xTickFormat}            />
      </div>
    </div>
  );
}


export default App;
