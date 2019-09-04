
import React from "react";
import * as d3 from "d3";

const LineSVG = props => {
    const rawdata = props.data;
    const data = rawdata.map((d)=>({value: +d.value,
        date: d3.timeParse("%d-%m-%Y")(d.date)
       }));
  
    const x = d3.scaleTime()
       .domain(d3.extent(data, function(d){return d.date;}))
       .range([0, props.width]);

    const y = d3.scaleLinear()
       .domain([0, d3.max(data, function(d){return +d.value ;})])
       .range([props.height, 0]);

    let valueline = d3.line()
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.value); });

    return (
       <svg width={props.width} height={props.height}>
       <g transform={`translate(${props.margin.left}, ${props.margin.top})`}>

              <XAxis
                x={x}
                height={props.height}
                top={props.margin.top}
                bottom={props.margin.bottom}
              />
              <YAxis
                y={y}
              />
              <path style={{fill:"none", "strokeWidth": 1.5, stroke:"steelblue"}} d={valueline(data)} />
          </g>
      </svg>
      );
    }; 

export default LineSVG; 