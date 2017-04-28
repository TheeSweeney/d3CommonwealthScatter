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
var xAxis = d3.svg.axis()
              .scale(x)
              .orient('bottom')
              .ticks(0)
var yAxis = d3.svg.axis()
              .scale(y)
              .orient('left')
              .ticks(0)
var linearColorScale = d3.scale.linear()
                        .domain([1, 11])
                        .range(['#4ABDBC','#044C7F']);
//color gradient for y axis
var defs = svg.append('defs')

var yGradient = defs.append('linearGradient')//TODO prob more efficient way to do these gradients
                  .attr('id', 'svgYGradient')
                  .attr('x1', '0%')
                  .attr('x2', '0%')
                  .attr('y1', '0%')
                  .attr('y2', '100%')
yGradient.append('stop')
        .attr('class', 'start')
        .attr('offset', '0%')
        .attr('stop-color', '#4ABDBC')
        .attr('stop-opacity', 1);

yGradient.append('stop')
        .attr('class', 'end')
        .attr('offset', '100%')
        .attr('stop-color', '#044C7F')
        .attr('stop-opacity', 1);

var xGradient = defs.append('linearGradient')
                  .attr('id', 'svgXGradient')
                  .attr('x1', '0%')
                  .attr('x2', '100%')
                  .attr('y1', '0%')
                  .attr('y2', '0%')
xGradient.append('stop')
        .attr('class', 'start')
        .attr('offset', '0%')
        .attr('stop-color', '#4ABDBC')
        .attr('stop-opacity', 1);

xGradient.append('stop')
        .attr('class', 'end')
        .attr('offset', '100%')
        .attr('stop-color', '#044C7F')
        .attr('stop-opacity', 1);


function yAxesAndLabels(params) {//TODO factor out to prevent code repition in this and exhibit 3
    this.append('g')//y axis
        .classed('y axis grad', true)
        .attr('transform', 'translate(0,0)')
        .call(params.axis.y)
    
    this.append('g')//x axis
        .classed('x axis grad', true)
        .attr('transform', 'translate(10,' + (height + 10) + ')')
        .call(params.axis.x)


    this.select('.y.axis')//Top Label
        .append('text')
        .style('font-size', '18px')
        .style('fill', '#4ABDBC')
        .attr('x',-10)
        .attr('y',-20)
        .text('Higher health system performance')

    this.select('.y.axis')//Bottom Label
        .append('text')
        .style('font-size', '18px')
        .style('fill', '#044C7F')
        .attr('x',-10)
        .attr('y', height + 35)
        .text('Lower health system performance')    

    this.select('g')//top Triangle
        .append('path')
        .attr('d', function(d){
          return 'M 22,40 42,40 32,22 z';
        })
        .attr('transform', 'translate(-35,-35)')
        .style('fill', '#4ABDBC')


    this.select('g')//bottom Triangle
        .append('path')
        .attr('d', function(d){
          return 'M 22,28 42,28 32,46 z';
        })
        .attr('transform', 'translate(-35,' + (height - 30) + ')')
        .style('fill', '#044C7F')

    svg.insert('text')
      .attr('y', 40)
      .classed('chartTitle', true)
      .html("In the U.S., Worse Health System Performance Despite High Spending")
}

function plot(params){

  yAxesAndLabels.call(this, params)
  //enter
  this.selectAll('.point')
      .data(params.data)
      .enter()
          .append('circle')
          .classed('point', true)
  //update
  this.selectAll('.point')
      .attr('r', 4)
      .attr('cx', function(d){
        return x(d.x)
      })
      .attr('cy', function(d){
        return y(d.y)
      })
      .style('fill', function(d,i){
        return linearColorScale(i)
      })
  //exit
  this.selectAll('.point')
    .data(params.data)
    .exit()
    .remove()
}

plot.call(chart, {
  data: data,
  axis: {
    x: xAxis,
    y: yAxis
  }
})
