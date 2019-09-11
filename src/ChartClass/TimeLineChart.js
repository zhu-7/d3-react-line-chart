import React, { Component } from 'react';
import * as d3 from 'd3';
import { XAxisTime, YAxisLinear, Line } from './ChartComponent';

class TimeLineChart extends Component {

    render() {
        const {data, width, height, margin, xFn, yFn, xTickFormat} = this.props; 
        const rawdata = data.map((d)=>({value: +d.value,
            date: d3.timeParse(xTickFormat)(d.date)
           }));
        const xScale = d3.scaleTime();
        const yScale = d3.scaleLinear();

        const chartWidth = width - margin.left - margin.right;
        const chartHeight = height - margin.top - margin.bottom;
        xScale.domain(d3.extent(rawdata, d=>xFn(d)))
          .range([0, chartWidth]);
        yScale.domain([0, d3.max(rawdata, d=>yFn(d))])
          .range([chartHeight, 0]);

        const metaData = {
            xScale,
            yScale,
            xTickFormat
        };
                
        const lineData = {
            data: rawdata.map((d)=>({
            y: yScale(yFn(d)),
            x: xScale(xFn(d))
            }))
        };

        return(
            <svg width={width} height={height}>
                 <g transform={`translate(${margin.left},${margin.top})`}>
                    <XAxisTime {...metaData} transform= {`translate(0,${chartHeight})`} />
                    <YAxisLinear {...metaData} />
                    <Line {...metaData} {...lineData}/>
                 </g>
            </svg>
        );
    }

}

export default TimeLineChart;
