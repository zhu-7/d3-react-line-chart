
import React from "react";
import * as d3 from "d3";


export default function BaseGroup(group) {
    return class BaseGroup extends React.Component {
      componentDidMount() {
        group.call(this);
      }
      componentDidUpdate() {
        group.call(this);
      }
  
      render() {
        const transform = this.props.transform || "";
        return <g transform={transform} ref="anchor" />;
      }
    };
  }


  export const XAxis = BaseGroup(function() {
    const axis = d3
      .axisBottom()
    //  .tickFormat(d => d3.timeFormat("%H:%M %S")(d))
      .scale(this.props.xScale);
  
    d3
      .select(this.refs.anchor)
      .classed("x axis", true)
      .transition()
      .call(axis);
  });
  
  export const YAxis = BaseGroup(function() {
    const axis = d3
      .axisLeft()
      .tickFormat(d => d)
      .scale(this.props.yScale);
  
    d3
      .select(this.refs.anchor)
      .classed("y axis", true)
      .transition()
      .call(axis);
  });

  export const Line = BaseGroup(function() {
    const path = d3
      .line()
      .x(d => d.x)
      .y(d => d.y);
      
    const parent = d3.select(this.refs.anchor);
  
    const current = parent.selectAll(".valueLine").data([this.props.plotData]);
  
    current.interrupt();
  
    const enter = current
      .enter()
      .append("path")
      .classed("valueLine", true);
  
    const valueLine = current.merge(enter);
  
    current
      .transition()
      .attr("transform", `translate(${this.props.xSlide}, 0)`)
      .on("end", () => {
        valueLine.attr("d", path);
        current.attr("transform", null);
      });
  
  });