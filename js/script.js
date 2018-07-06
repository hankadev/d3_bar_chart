/* global d3 */
(function() {
  'use strict';
  const url = 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json';
  d3.json(url).then(function(data) {
    const dataset = data.data;
    console.log(dataset);
  });
}());
