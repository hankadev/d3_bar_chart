/* global d3 */
(function() {
  'use strict';

  const url = 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json';
  d3.json(url).then(function(data) {
    const dataset = data.data;

    const w = 800;
    const h = 500;
    const padding = 50;
    //const barWidth = w / dataset.length;

    const dataYears = dataset.map(item => item[0].substring(0,4));
    const xScale =
      d3.scaleLinear()
        .domain([d3.min(dataYears), d3.max(dataYears)])
        .range([padding, w - padding]);

    const dataGDP = dataset.map(item => item[1]);
    const yScale =
      d3.scaleLinear()
        .domain([0, d3.max(dataGDP)])
        .range([h - padding, padding]);

    const svg =
      d3.select('body')
        .append('svg')
        .attr('width', w)
        .attr('height', h);

    // add axis to svg canvas
    const xAxis = d3.axisBottom(xScale);
    svg.append('g')
      .attr('id', 'x-axis')
      .attr('transform', 'translate(0,' + (h - padding) + ')')
      .call(xAxis.ticks(15));

    const yAxis = d3.axisLeft(yScale);
    svg.append('g')
      .attr('id', 'y-axis')
      .attr('transform', 'translate(' + padding + ',0)')
      .call(yAxis.ticks(10));


  });
}());
