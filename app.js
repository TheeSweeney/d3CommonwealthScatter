var w = 800;
var h = 450;
var margin = {
  top: 58,
  bottom: 100,
  left: 80,
  right: 40
};
var width = w - margin.left - margin.right;
var height = h - margin.top - margin.bottom;

var svg = d3.select("body").append("svg")
      .attr("id", "chart")
      .attr("width", w)
      .attr("height", h);
var chart = svg.append("g")
      .classed("display", true)
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
var x = d3.scale.linear()
          .domain([1.02,1.2])
          .range([0, width])
var y = d3.scale.linear()
          .domain([0,1.5])
          .range([height,0])

function plot(params){
  //enter
  this.selectAll('.point')
      .data(params.data)
      .enter()
          .append('circle')
          .classed('point', true)
  //update
  this.selectAll('.point')
      .attr('r', 2)
      .attr('cx', function(d){
        return x(d.x)
      })
      .attr('cy', function(d){
        return y(d.y)
      })
  //exit
  this.selectAll('.point')
    .data(params.data)
    .exit()
    .remove()
}

plot.call(chart, {
  data: data,
  axes: {
    x: '',
    y:''
  }
})
