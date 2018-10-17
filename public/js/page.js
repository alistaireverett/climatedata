/* global d3 drawStripes drawBar drawLine */

var apiList = [
  { name: 'Select Country/Provider' },
  { name: 'Norway (Met.no)' }
]

var stations = [
  { stn_name: 'Select location', stn_code: 'SN98550' },
  { stn_name: 'Vardø Radio', stn_code: 'SN98550' },
  { stn_name: 'Tromsø', stn_code: 'SN90450' }
]

var plotFuncs = [
  { func_name: 'Select plot type', func_call: 0 },
  { func_name: 'Stripes', func_call: drawStripes },
  { func_name: 'Bar', func_call: drawBar },
  { func_name: 'Line', func_call: drawLine }
]

var apiOptions = {
  url: 'https://frost.met.no/observations/v0.jsonld', // url,
  qs: {
    'sources': 'SN98550',
    'elements': 'best_estimate_mean(air_temperature P1Y)',
    'referencetime': '1921-01-01/2018-12-31'
  },
  auth: {
    'user': '', // client_id,
    'pass': ''
  }
}

var plotOptions = {
  plotFunc: drawStripes
}

var locDropDiv = d3.select('#tools')
  .append('div')
  .attr('class', 'styled-select blue semi-square div-inline')
  .attr('title', 'Select country/provider (API)')

var locDrop = locDropDiv.append('select')
  .attr('title', 'this')
  .attr('id', 'locChoice')
  .on('change', locDropdown)

var locDropOpts = locDrop
  .selectAll('option')
  .data(apiList).enter()
  .append('option')
  .text(function (d) { return d.name })
  .attr('value', function (d, i) { return i })

var locDropTitle = locDrop
  .select('option')
  .attr('disabled', 'disabled')
  .attr('selected', 'selected')

var stnDropDiv = d3.select('#tools')
  .append('div')
  .attr('class', 'styled-select blue semi-square div-inline')
  .attr('title', 'Select location')
  .attr('id', 'stnDropDiv')
  .style('opacity', 0.5)

function buildStnDropdown () {
  var stnDrop = stnDropDiv.append('select')
    .attr('id', 'stnChoice')
    .on('change', stnDropdown)

  var stnOpts = stnDrop
    .selectAll('option')
    .data(stations).enter()
    .append('option')
    .text(function (d) { return d.stn_name })
    .attr('value', function (d, i) { return i })

  var stnDropTitle = stnDrop
    .select('option')
    .attr('disabled', 'disabled')
    .attr('selected', 'selected')
}

var plotDropDiv = d3.select('#tools')
  .append('div')
  .attr('class', 'styled-select blue semi-square div-inline')
  .attr('title', 'Select plot type')

var plotDrop = plotDropDiv.append('select')
  .attr('id', 'plotChoice')
  .on('change', plotDropdown)

var plotOpts = plotDrop
  .selectAll('option')
  .data(plotFuncs).enter()
  .append('option')
  .text(function (d) { return d.func_name })
  .attr('value', function (d, i) { return i })

var plotDropTitle = plotDrop
  .select('option')
  .attr('disabled', 'disabled')
  .attr('selected', 'selected')
// var opts2 = plotDrop
//   .append('option')
//   .text('Select Plot Type')
//   .attr('disabled', 'disabled')
//   .attr('selected', 'selected')

var drawButton = d3.select('#tools')
  .append('div')
  .attr('id', 'drawBtnDiv')
  .attr('class', 'div-inline')
  .style('opacity', 0.5)
  .append('input')
  .attr('id', 'drawButton')
  .attr('type', 'button')
  .attr('class', 'btn')
  .attr('value', 'Draw')
  // .on('click', function () {
  //   getData(apiOptions, plotOptions)
  // })

// add an svg
var svg = d3.select('#stripes_container')
  .attr('align', 'center')
  .classed('svg-container', true)
  .append('svg')
  .attr('preserveAspectRatio', 'xMinYMin meet')
  .attr('viewBox', '0 0 880 400')
  // class to make it responsive
  .classed('svg-content-responsive', true)

// Define the div for the tooltip
var div = d3.select('body').append('div')
  .attr('class', 'tooltip')
  .style('opacity', 0)
