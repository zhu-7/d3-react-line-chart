import React, { useState } from 'react';
import * as d3 from "d3";
import LineClass from './LineClass';
import LineSVG from "./LineSVG";

function App() {

  const start = new Date(2012, 0, 1);
  const end = new Date(); 

  function randomDate() {
    const temp = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())); 
    return  temp.getDate() + "-" + (temp.getMonth() + 1) + "-" + temp.getFullYear();
}
const generateData = (value, length = 5) =>
d3.range(length).map((item, index) => ({
  date: randomDate(),
  value: value === null || value === undefined ? Math.random() * 1000 : value
}));


  const [data, setData] = useState(generateData());
  const changeData = () => {
      setData(generateData());
  }
  
  return (
      <div className="App">
          <div>
              <button onClick={changeData}>Transform</button>
          </div>
          <div>
            <span className="label">Class Line </span>
            <LineClass
              data={data}
              width={460}
              height={400}
              margin={{top: 10, right: 30, bottom: 30, left: 60}}
            />
          </div>
          <div>
            <span className="label">Line SVG (Hook)</span>
            <LineSVG
              data={data}
              width={460}
              height={400}
              margin={{top: 10, right: 30, bottom: 30, left: 60}}
            />
          </div>
      </div>
  );
}


export default App;