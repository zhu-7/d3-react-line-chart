import React, { Component } from 'react';

class LineChart extends Component {

  render() {
    const { margin, height, width, xAxis, yAxis } = this.props; 
    const children = React.Children.map(
      this.props.children,
      function(child) {
        return child;
      }
    );
    return(
      <svg width={width} height={height}>
        <g transform={`translate(${margin.left},${margin.top})`}>
          {xAxis}
          {yAxis}
          {children}
        </g>
      </svg>
    );
  }

}

export default LineChart;