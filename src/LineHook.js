import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const Line = props => {
    const ref = useRef(null);
  useEffect(
      () => {
          const data = props.data.map((d)=>({value: +d.value,
            date: d3.timeParse("%d-%m-%Y")(d.date)
           }));;

           const x = d3.scaleTime()
           .domain(d3.extent(data, function(d){return d.date;}))
           .range([0, props.width]);

           const y = d3.scaleLinear()
           .domain([0, d3.max(data, function(d){return +d.value ;})])
           .range([props.height, 0]);

           const valueline = d3.line()
                        .x(function(d) { return x(d.date); })
                        .y(function(d) { return y(d.value); });

          const group = d3.select(ref.current);
          group.select(".line").remove();
          group.select(".x.axis").remove();
          group.select(".y.axis").remove();
          
          group.append("g")
              .attr("transform", "translate(0," + props.height + ")")
              .attr("class", "x axis")
              .call(d3.axisBottom(x));
          group.append("g")
              .attr("class", "y axis")
             .call(d3.axisLeft(y));
    
          group.append("path")
                            .datum(data)
                            .attr("fill", "none")
                             .attr("class", "line")
                            .attr("stroke", "steelblue")
                            .attr("stroke-width", 1.5)
                            .attr("d", valueline(data));

          
    },
    [props.data]
  );

  return (
    <svg width={props.width + props.margin.left + props.margin.right} height={props.height + props.margin.top + props.margin.bottom}>
      <g
        ref={ref}
        transform={`translate(${props.margin.left}, ${props.margin.top})`}
      />
    </svg>
  );
};

export default Line; 