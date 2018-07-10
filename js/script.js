/* global d3 */
(function() {
  'use strict';

  const url = 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json';
  d3.json(url).then(function(data) {
    const dataset = data.data;

    const w = 900;
    const h = 500;
    const padding = 50;
    const barWidth = (w - 2 * padding) / dataset.length;

    // scale the data for the axes
    const minYear = d3.min(dataset, (d) => d[0].substring(0,4));
    const maxYear = d3.max(dataset, (d) => d[0].substring(0,4));
    const xScale =
      d3.scaleLinear()
        .domain([minYear, maxYear])
        .range([padding, w - padding]);

    const yScale =
      d3.scaleLinear()
        .domain([0, d3.max(dataset, (d) => d[1])])
        .range([h - padding, padding]);

    // create svg element and append it to body
    const svg =
      d3.select('body')
        .append('svg')
        .attr('width', w)
        .attr('height', h);

    // add bars to the graph
    svg.selectAll('rect')
      .data(dataset)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', (d, i) => i * barWidth)
      .attr('y', (d) => yScale(d[1]))
      .attr('width', barWidth)
      .attr('height', (d) => h - padding - yScale(d[1]))
      .attr('transform', 'translate(' + padding + ',0)')
      .attr('fill', '#00f')
      .attr('data-date', (d, i) => dataset[i][0])
      .attr('data-gdp', (d, i) => dataset[i][1])
      .append('title')
      .attr('id', 'tooltip')
      .attr('data-date', (d, i) => dataset[i][0])
      .text(d => showTooltip(d[0], d[1]));

    function showTooltip(date, value) {
      const year = date.substring(0,4);
      const month = date.substring(5,7);
      let quarter;
      switch(month) {
      case '01': quarter = 'Q1'; break;
      case '04': quarter = 'Q2'; break;
      case '07': quarter = 'Q3'; break;
      case '10': quarter = 'Q4'; break;
      }
      const gdp = Math.round((value/1000) * 100) / 100;
      return year + ' ' + quarter + '\n$ ' + gdp + ' Billions';
    }

    // add axis to svg canvas
    const xAxis = d3.axisBottom(xScale).tickFormat(d3.format('d'));
    svg.append('g')
      .attr('id', 'x-axis')
      .attr('transform', 'translate(0,' + (h - padding) + ')')
      .call(xAxis);

    const yAxis = d3.axisLeft(yScale);
    svg.append('g')
      .attr('id', 'y-axis')
      .attr('transform', 'translate(' + padding + ',0)')
      .call(yAxis);
  });
}());
