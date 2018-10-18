/* global d3 svg apiOptions plotOptions div plotFuncs stations */

function stripesOut () {
  console.log('called')

  d3.selectAll('rect')
    .transition()
    .duration(500)
    .attr('height', 0)
    .style('opacity', 0)
};

function stripesIn () {
  d3.selectAll('rect')
    .transition()
    .duration(500)
    .attr('height', svg.style('height').replace('px', ''))
    .style('opacity', 1)
};
//
// function redraw(api_options) {
//
//   stripes_out();
//   get_data(api_options);
//
//   //redraw_stripes(data);
//
//   stripes_in();
//
//   d3.select('#info')
//    .text('Here are your warming stripes for '+ name);
//
// };
//
// function set_api_options() {
//
//
// }
//

function locDropdown () {
  // var index = d3.select('#apiChoice').property('value')

  // set station code in api options
  //apiOptions.qs.sources = stations[index]['stn_code']
  console.log(d3.select('#stnDropDiv'))
  d3.select('#stnDropDiv')
    .transition()
    .style('opacity', 1)

  buildStnDropdown()
  // initialize(api_options);
  return apiOptions
};

function stnDropdown () {
  var index = d3.select('#stnChoice').property('value')

  // set station code in api options
  apiOptions.qs.sources = stations[index]['stn_code']

  // Enable update button
  d3.select('#drawButton')
    .on('click', function () {
      getData(apiOptions, plotOptions)
    })
  d3.select('#drawBtnDiv')
    .transition()
    .style('opacity', 1)

  return apiOptions
};

function plotDropdown () {
  var index = d3.select('#plotChoice').property('value')

  // set station code in api options
  plotOptions.plotFunc = plotFuncs[index]['func_call']

  // initialize(api_options);
  return plotOptions
};

function rescale (data) {
  var i
  for (i = 0; i < data.length; i++) {
    data[i]['scaled'] = 0.5 + (data[i].temp - data.mean) / (data.max - data.min)
  };
  return data
};

function drawBar (data) {

}

function drawLine (data) {

}

function drawStripes (data) {
  d3.selectAll('rect')
    .transition()
    .duration(500)
    .attr('height', 0)
    .style('opacity', 0)

  svg.selectAll('rect').remove()
  // properties for stripes plot
  data = rescale(data)
  console.log(svg.style('width'))
  console.log(data.length)
  console.log(svg.style('width').replace('px', ''))

  var barWidth = svg.style('width').replace('px', '') / data.length
  var barHeight = svg.style('height').replace('px', '')
  console.log(barWidth)
  // add a rectangle for every year of data we have
  var stripes = svg.selectAll('rect')
    .data(data)
    .enter()
    .append('rect')

  // set the attributes for the stripes
  var stripeAttributes = stripes
    .attr('x', function (d, i) {
      return (1 * i * barWidth)
    })
    .attr('y', 0)
    .attr('height', 0)
    .attr('width', barWidth)
    .style('opacity', 0)
    .attr('fill', function (d) {
      return d3.interpolateRdBu(1 - d.scaled)
    })
    .on('mouseover', function (d) {
      div.transition()
        .duration(200)
        .style('opacity', 0.9)
      div.html('<b>' + d.year + '</b> <br/>' + d.temp + '&degC')
        .style('left', (d3.event.pageX) + 'px')
        .style('top', (d3.event.pageY - 28) + 'px')
      d3.selectAll('rect').style('opacity', 1)
      d3.select(this).style('opacity', 0.5)
    })
    .on('mouseout', function (d) {
      div.transition()
        .duration(500)
        .style('opacity', 0)
      d3.selectAll('rect').style('opacity', 1)
    })

  d3.selectAll('rect')
    .transition()
    .duration(500)
    .attr('height', svg.style('height').replace('px', ''))
    .style('opacity', 1)
  // d3.select('svg').transition()
  //   .duration(200)
  //   .style('opacity', 1)
}

function drawBar (data) {
  //console.log(data)

  d3.selectAll('rect')
    .transition()
    .duration(500)
    .attr('height', 0)
    .style('opacity', 0)

  svg.selectAll('rect').remove()
  // properties for stripes plot
  data = rescale(data)

  var barWidth = svg.style('width').replace('px', '') / data.length
  var barHeight = svg.style('height').replace('px', '')

  mid = 200
  console.log(data)
  // add a rectangle for every year of data we have
  var stripes = svg.selectAll('rect')
    .data(data)
    .enter()
    .append('rect')

  // set the attributes for the stripes
  var stripeAttributes = stripes.attr('width', barWidth)
    .style('opacity', 1)
    //.attr('y', 100)
    .attr('x', function (d, i) {
      var barX = (1 * i * barWidth)
      return barX
    })
    .attr('y', function (d, i) {
      var barX = (1 * i * barWidth)
      if (d.scaled > 0.5) {
        var barY = mid - 100 * (d.scaled - 0.5)
      } else {
        var barY = mid
      }
      return barY
    })
    .attr('height', 0)
    // .attr('transform', function (d, i) {
    //   var barX = (1 * i * barWidth)
    //   if (d.scaled > 0.5) {
    //     var barY = mid - 100 * (d.scaled - 0.5)
    //   } else {
    //     var barY = mid
    //   }
    //   return 'translate(' + barX + ',0)'
    // })
    .attr('fill', function (d) {
      return d3.interpolateRdBu(1 - d.scaled)
    })
    .attr('height', function (d) {
      return Math.abs(100 * (d.scaled - 0.5))
    })
    .on('mouseover', function (d) {
      div.transition()
        .duration(200)
        .style('opacity', 0.9)
      div.html('<b>' + d.year + '</b> <br/>' + (d.scaled - 0.5) + '&degC')
        .style('left', (d3.event.pageX) + 'px')
        .style('top', (d3.event.pageY - 28) + 'px')
      d3.selectAll('rect').style('opacity', 1)
      d3.select(this).style('opacity', 0.5)
    })
    .on('mouseout', function (d) {
      div.transition()
        .duration(500)
        .style('opacity', 0)
      d3.selectAll('rect').style('opacity', 1)
    })

  // d3.selectAll('rect')
  //   .transition()
  //   .duration(500)
  //   .attr('height', svg.style('height').replace('px', ''))
  //   .style('opacity', 1)
  stripes.transition()
    .duration(500)
    .attr('height', function (d) {
      return Math.abs(100 * (d.scaled - 0.5))
    })
}
