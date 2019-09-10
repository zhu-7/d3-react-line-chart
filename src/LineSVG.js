
import React, {useEffect, useRef} from "react";
import * as d3 from "d3";

const LineSVG = props => {
    const refx = useRef(null);
    const refy = useRef(null);
    const refl = useRef(null); 
    useEffect(
      () => {
    const rawdata = props.data;
    const {width, height} = props; 
    const data = rawdata.map((d)=>({
        value: +d.value,
        date: d3.timeParse("%d-%m-%Y")(d.date)
       }));
  
    const x = d3.scaleTime()
       .domain(d3.extent(data, function(d){return d.date;}))
       .range([0, width]);

    const y = d3.scaleLinear()
       .domain([0, d3.max(data, function(d){return +d.value ;})])
       .range([height, 0]);
    const xAxis = d3.axisBottom(x); 
    const yAxis = d3.axisLeft(y); 
    d3.select(refx.current).call(xAxis);
    d3.select(refy.current).call(yAxis);

    let valueline = d3.line()
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.value); });

    d3.select(refl.current).transition().duration(3000).attr("d", valueline(data));

  } , [props.data]);

    return (
       <svg width={props.width + props.margin.left + props.margin.right} height={props.height + props.margin.top + props.margin.bottom}>
         <g transform={`translate(${props.margin.left},${props.margin.top})`}>
           <g className='x axis' transform={("translate(0," + props.height + ")")} ref={refx}/>;
           <g className='y axis' ref={refy}/>;
           <path style={{fill:"none", "strokeWidth": 1.5, stroke:"steelblue"}} ref={refl} />
          </g>
      </svg>
      );
};
   

export default LineSVG; 