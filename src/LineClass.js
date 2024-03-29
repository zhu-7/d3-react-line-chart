import React, { createRef, Component } from 'react';
import * as d3 from 'd3';

class LineClass extends Component {
  constructor(props){
    super(props);
    this.ref = createRef();
  }

  componentDidMount(){
    const svg = d3.select(this.ref.current);
    const { data, width, height, margin } = this.props;
    const x = d3.scaleTime()
      .domain(d3.extent(data, function(d){return d.date;}))
      .range([0, width]);

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, function(d){return +d.value ;})])
      .range([height, 0]);

    svg
      .attr('class', 'chart')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom);

    const group = svg
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    group.append('g')
      .attr('transform', 'translate(0,' + height + ')')
      .attr('class', 'x axis')
      .call(d3.axisBottom(x));
    group.append('g')
      .attr('class', 'y axis')
      .call(d3.axisLeft(y));

    group.append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('class', 'line')
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 1.5)
      .attr('d', d3.line()
        .x(function(d) { return x(d.date); })
        .y(function(d) { return y(d.value); })
      );
  }

  componentWillUpdate(nextProps){
    const svg = d3.select(this.ref.current);
    const data = nextProps.data;

    const x = d3.scaleTime()
      .domain(d3.extent(data, function(d){return d.date;}))
      .range([0, nextProps.width]);

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, function(d){return +d.value ;})])
      .range([nextProps.height, 0]);

    const u = svg.selectAll('.line').data([data], (d)=>d.date);
    u
      .enter()
      .append('path')
      .attr('class','line')
      .merge(u)
      .transition()
      .duration(3000)
      .attr('d', d3.line()
        .x(function(d) { return x(d.date); })
        .y(function(d) { return y(d.value); }))
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 1.5);

    svg.select('.x.axis').call(d3.axisBottom(x));
    svg.select('.y.axis').call(d3.axisLeft(y));
  }

  render() {
    return <svg ref={this.ref} />;
  }
}

export default LineClass;