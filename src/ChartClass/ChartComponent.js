import * as d3 from 'd3'; 
import React, { Component } from 'react'; 

export default function D3BaseGroup(render){
  return class BaseGroup extends Component {
    componentDidMount(){
      render.call(this);
    }

    componentDidUpdate() {
      render.call(this);
    }

    render() {
      const transform = this.props.transform || '';
      return <g transform={transform} ref='element' />;
    }
  };
}

export const XAxisTime = D3BaseGroup(function() {
  const styleClass = this.props.class;
  const axis = d3
    .axisBottom()
    .tickFormat(d => d3.timeFormat(this.props.xTickFormat)(d))
    .scale(this.props.xScale);
    
  d3.select(this.refs.element)
    .attr('class', styleClass)
    .transition()
    .call(axis);
});

export const YAxisLinear = D3BaseGroup(function(){
  const styleClass = this.props.class;
  const axis = d3
    .axisLeft()
    .scale(this.props.yScale);

  d3.select(this.refs.element)
    .attr('class', styleClass)
    .transition()
    .call(axis);
});

export const Line = D3BaseGroup(function(){
  const styleClass = this.props.class;
  const line = d3.line()
    .x(d => d.x)
    .y(d => d.y);
  const group = d3.select(this.refs.element);
  const current = group.selectAll('.'+ styleClass).data([this.props.data]);
  current.interrupt(); 

  current
    .enter()
    .append('path')
    .attr('class', styleClass)
    .merge(current)
    .transition()
    .duration(2000)
    .attr('d', line);
});

export const Area = D3BaseGroup(function(){
  const styleClass = this.props.class;

  const area = d3
    .area()
    .x(d => d.x)
    .y0(d => d.y0)
    .y1(d => d.y1);
  const group = d3.select(this.refs.element);
  const current = group.selectAll('.'+ styleClass).data([this.props.data]);
  current.interrupt(); 

  current
    .enter()
    .append('path')
    .attr('class', styleClass)
    .merge(current)
    .transition()
    .duration(2000)
    .attr('d', area);
});