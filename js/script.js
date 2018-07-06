(function() {
  'use strict';
  let dataset;
  fetch('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json')
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(error => console.log(error));

}());
