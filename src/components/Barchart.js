import React, { Component } from 'react';
import * as d3 from 'd3';

class Barchart extends Component{


  componentDidUpdate(prevProps) {
    if (prevProps.data !== this.props.data) {
      setTimeout((props)=>{ this.drawChart(); }, 500);
    }
  } 

  drawChart=()=>{
      d3.select("svg").remove();
      const margin={top:20, right:20, bottom:100, left:100};
      const graphWidth = 1000 - margin.left - margin.right;
      const graphHeight = 500 - margin.top - margin.bottom;

      const svg = d3.select(".canvas")
      .append("svg")
      .attr("width", 1000)
      .attr("height", 500)
      .style("margin-left", 200)
      .style("margin-top", 0)
      .style("padding-top", 0);

      const graph = svg.append('g')
        .attr('width', graphWidth)
        .attr('height', graphHeight)
        .attr('transfrom', `translate(${margin.left+30},${margin.top})`);

      console.log(graphWidth);

      const y = d3.scaleLinear()
        .domain([0,d3.max(this.props.data, d=>d.total)])
        .range([graphHeight,0]);

      const x = d3.scaleBand()
        .domain(this.props.data.map(item => item.age))
        .range([0,800])
        .paddingInner(0.2)
        .paddingOuter(0.2);

      const xAxisGroup = graph.append('g')
      .attr('transform',`translate(80,${graphHeight+5})`);
      const yAxisGroup = graph.append('g');

      graph.selectAll("rect")
        .data(this.props.data)
        .enter()
        .append("rect")
        .attr("x", (d) => x(d.age) )        
        .attr("y", graphHeight)
        .attr("width", x.bandwidth)
        .attr('height', 0)        
        .attr("fill", "orange")
        .attr("transform", "translate(80,5)")
        .transition().duration(500)        
          .attr("y", d => y(d.total))
          .attr("height", (d, i) => graphHeight-y(d.total));

      const xAxis = d3.axisBottom(x)
      .tickValues([0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100]);
                      
      const yAxis = d3.axisLeft(y).ticks(10, "s");

      xAxisGroup.call(xAxis);

      svg.append("text")      // text label for the x axis
        .attr("x", graphWidth/2 )
        .attr("y", graphHeight + 50 )
        .style("text-anchor", "middle")
        .text("age (years)");

        svg.append("text")      // text label for the y axis
        .attr("transform", `translate(25,${graphHeight/2}) rotate(-90)`)
        .style("text-anchor", "middle")
        .text("Population");

      yAxisGroup.attr("transform", "translate(80,5)")
      .call(yAxis);    

  }


  render() {
      return (
        <div className="canvas">       
        </div>
      );
  }
}

export default Barchart;
