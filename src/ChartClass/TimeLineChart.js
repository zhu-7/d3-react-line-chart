import React, { Component } from 'react';
import * as d3 from 'd3';
import { XAxisTime, YAxisLinear, Line } from './ChartComponent';

class TimeLineChart extends Component {

  render() {
    const {lineclass, data, width, height, margin, xFn, yFn, xTickFormat} = this.props; 
    const xScale = d3.scaleTime();
    const yScale = d3.scaleLinear();

    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;
    xScale.domain(d3.extent(data, d=>xFn(d)))
      .range([0, chartWidth]);
    yScale.domain([0, d3.max(data, d=>yFn(d))])
      .range([chartHeight, 0]);

    const metaData = {
      xScale,
      yScale,
      xTickFormat
    };
                
    const lineData = {
      data: data.map((d)=>({
        y: yScale(yFn(d)),
        x: xScale(xFn(d))
      }))
    };

    return(
      <svg width={width} height={height}>
        <g transform={`translate(${margin.left},${margin.top})`}>
          <XAxisTime {...metaData} transform= {`translate(0,${chartHeight})`} class='x axis time' />
          <YAxisLinear {...metaData} class='y axis linear'/>
          <Line {...lineData} class={lineclass} />
        </g>
      </svg>
    );
  }

}

export default TimeLineChart;
