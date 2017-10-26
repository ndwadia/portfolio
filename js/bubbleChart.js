var parseQueryString = function(url) {
  var urlParams = {};
  url.replace(
    new RegExp("([^?=&]+)(=([^&]*))?", "g"),
    function($0, $1, $2, $3) {
      urlParams[$1] = $3;
    }
  );
  return urlParams;
};
var urlToParse = location.search;
var result = parseQueryString(urlToParse);
var _base_url = location.origin;
var _carrier = result.carrier;
if (_carrier == undefined) {
  _carrier = '9E';
}
// Chart.js scripts
// -- Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#000';
// Start Bubble Chart
var bubblechartdata = {
  labels: [],
  data1: [],
  data2: [],
  data3: []
};
$.ajax({
  url: _base_url + '/bubbleChart',
  dataType: 'JSON',
  success: function(data) {
    bubblechartdata = data;
    var seq = palette('tol-rainbow', bubblechartdata.labels.length);
    var dsa = [];
    for (var i = 0; i < bubblechartdata.labels.length; i++) {
      dsa[i] = {};
      dsa[i].label = bubblechartdata.labels[i];
      dsa[i].data = [];
      dsa[i].data[0] = {};
      dsa[i].data[0].x = bubblechartdata.data3[i];
      dsa[i].data[0].y = bubblechartdata.data2[i];
      dsa[i].data[0].r = bubblechartdata.data1[i];
      dsa[i].backgroundColor = '#' + seq[i];
      dsa[i].hoverBackgroundColor = '#' + seq[i];
    }
    console.log(dsa);
    var ctx = document.getElementById("myBubbleChart");
    var myBubbleChart = new Chart(ctx, {
      type: 'bubble',
      data: {
        datasets: dsa
      },
      options: {
        legend: {
          display: true,
          position: 'right'
        },
        title: {
          display: true,
          text: 'Size of bubble indicates % Flights Delayed. Clicking on Airline in legend toggles it\'s data',
          fontSize: 16,
          padding: 30
        },
        scales: {
          xAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'Avg. Arrival Delay',
              fontSize: 16
            }
          }],
          yAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'Avg. Departure Delay',
              fontSize: 16
            }
          }]
        }
        /*elements: {
          point: {
            radius: function(ctx) {
              var index = ctx.dataIndex;
              var data = ctx.dataset.data[index];
              var size = ctx.chart.width;
              var base = data.value / 100;
              return (size / 24) * base;
            }
          }
        }*/
      }
    });
  },
  error: function() {
    console.log('Error getting chart data');
  }
});
// End Bubble Chart
