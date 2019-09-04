import React, { Component } from 'react';
import * as d3 from 'd3';

class LineChart extends Component {

  constructor(props){
    super(props);

      let {width, height} = props;
      this.margin = {top: 30, right: 20, bottom: 30, left: 50};

      this.x = d3.scaleTime().range([0, width - this.margin.left - this.margin.right]);
      this.y = d3.scaleLinear().range([height - this.margin.top - this.margin.bottom, 0]);
      this.elementWidth = width;
      this.elementHeight = height;

      this.state = {
          data: null
      };

  }

  componentDidMount(){

    const rawdata = this.props.data;
    const data = rawdata.map((d)=>({value: +d.value,
        date: d3.timeParse("%d-%m-%Y")(d.date)
       }));
    this.x.domain(d3.extent(data, (d)=> d.date) );
    this.y.domain([0, d3.max(data, (d)=> (d.value) )]);
    this.setState({data: data});
  }

  get xAxis(){
      return d3.axisBottom(this.x);
  }

  get yAxis(){
      return d3.axisLeft(this.y);
  }

  drawXAxis(){
      d3.select(this.refs.x).call(this.xAxis);
  }

  drawYAxis(){
      d3.select(this.refs.y).call(this.yAxis);
  }

  get line(){
      return d3.line()
          .x((d)=> (this.x(d.date)))
          .y((d)=> (this.y(d.value)));
  }

  path(){
     return (<path className="line" d={this.line(this.state.data)}/>);
  }


  render() {
    return (
      <svg width={this.elementWidth} height={this.elementHeight}>

          <g transform={`translate(${this.margin.left}, ${this.margin.top})`}>
                  {this.state.data ? this.path() : null}

              <g ref="x" className="x axis" transform={`translate(0, ${this.elementHeight - this.margin.top - this.margin.bottom})`}>
                  {this.state.data ? this.drawXAxis() : null}
              </g>

              <g ref='y' className="y axis">
                  {this.state.data ? this.drawYAxis() : null}
              </g>
              
          </g>

      </svg>
    );
  }
}


export default LineChart;
