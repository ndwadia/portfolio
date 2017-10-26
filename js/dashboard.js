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
var _carrier = result.carrier;
if (_carrier == undefined) {
  _carrier = '9E';
}
// Chart.js scripts
// -- Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#000';
// Start Chart1
var chart1data = {
  labels: [],
  data: []
};
$.ajax({
  url: location.origin + '/chart1',
  dataType: 'JSON',
  success: function(data) {
    chart1data = data;
    var seq = palette('tol-rainbow', chart1data.labels.length);
    var ctx = document.getElementById("myPieChart");
    var myPieChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: chart1data.labels,
        datasets: [{
          data: chart1data.data,
          backgroundColor: palette('tol-rainbow', chart1data.data.length).map(function(hex) {
            return '#' + hex;
          })
        }],
      },
      options: {
        pieceLabel: {
          // render 'label', 'value', 'percentage', 'image' or custom function, default is 'percentage'
          render: 'label',
          // precision for percentage, default is 0
          precision: 0,
          // identifies whether or not labels of value 0 are displayed, default is false
          showZero: true,
          // font size, default is defaultFontSize
          fontSize: 12,
          // font color, can be color array for each data or function for dynamic color, default is defaultFontColor
          fontColor: '#fff',
          // font style, default is defaultFontStyle
          fontStyle: 'normal',
          // font family, default is defaultFontFamily
          fontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
          // draw label in arc, default is false
          arc: true,
          // position to draw label, available value is 'default', 'border' and 'outside'
          // default is 'default'
          position: 'border',
          // draw label even it's overlap, default is false
          overlap: false,
          // set images when `render` is 'image'
          images: [{
            src: 'image.png',
            width: 16,
            height: 16
          }]
        },
        legend: {
          display: false
        }
      }
    });
    ctx.onclick = function(evt) {
      var activePoints = myPieChart.getElementsAtEvent(evt);
      if (activePoints[0]) {
        var chartData = activePoints[0]._chart.config.data;
        var idx = activePoints[0]._index;
        var label = chartData.labels[idx];
        var url = location.origin + location.pathname + "?carrier=" + label;
        location.href = url;
      }
    };
  },
  error: function() {
    console.log('Error getting chart data');
  }
});
// End Chart1
// Start Chart2
var chart2data = {
  labels: [],
  data: []
};
var _url = location.origin + '/chart2?carrier=' + _carrier;
$.ajax({
  url: _url,
  dataType: 'JSON',
  success: function(data) {
    chart2data = data;
    var ctx = document.getElementById("myBarChart1");
    var myLineChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: chart2data.labels,
        datasets: [{
          label: "% Flight Count",
          backgroundColor: "rgba(2,117,216,1)",
          borderColor: "rgba(2,117,216,1)",
          data: chart2data.data,
        }],
      },
      options: {
        title: {
          display: true,
          text: 'Airline: ' + _carrier
        },
        layout: {
          padding: {
            left: 0,
            right: 0,
            top: 0,
            bottom: -12
          }
        },
        scales: {
          xAxes: [{
            time: {
              unit: 'route'
            },
            gridLines: {
              display: false
            },
            ticks: {
              fontSize: 12,
              maxTicksLimit: 7
            }
          }],
          yAxes: [{
            ticks: {
              beginAtZero: true
            },
            gridLines: {
              display: true
            }
          }],
        },
        legend: {
          display: false
        }
      }
    });
  },
  error: function() {
    console.log('Error getting chart data');
  }
});
// End Chart2
// Start Chart3
var chart3data = {
  labels: [],
  data: []
};
$.ajax({
  url: location.origin + '/chart3',
  dataType: 'JSON',
  success: function(data) {
    chart3data = data;
    var ctx = document.getElementById("myBarChart2");
    var myLineChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: chart3data.labels,
        datasets: [{
          label: "% Flight Count",
          backgroundColor: "rgba(2,117,216,1)",
          borderColor: "rgba(2,117,216,1)",
          data: chart3data.data,
        }],
      },
      options: {
        scales: {
          xAxes: [{
            time: {
              unit: 'airline'
            },
            gridLines: {
              display: false
            },
            ticks: {
              maxTicksLimit: 10
            }
          }],
          yAxes: [{
            ticks: {
              beginAtZero: true
            },
            gridLines: {
              display: true
            }
          }],
        },
        legend: {
          display: false
        }
      }
    });
  },
  error: function() {
    console.log('Error getting chart data');
  }
});
// End Chart3
// Start Chart4
var chart4data = {
  labels: [],
  data: []
};
$.ajax({
  url: location.origin + '/chart4',
  dataType: 'JSON',
  success: function(data) {
    chart4data = data;
    var ctx = document.getElementById("myBarChart3");
    var myLineChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: chart4data.labels,
        datasets: [{
          label: "% Flight Count",
          backgroundColor: "rgba(2,117,216,1)",
          borderColor: "rgba(2,117,216,1)",
          data: chart4data.data,
        }],
      },
      options: {
        scales: {
          xAxes: [{
            time: {
              unit: 'origin'
            },
            gridLines: {
              display: false
            },
            ticks: {
              maxTicksLimit: 10
            }
          }],
          yAxes: [{
            ticks: {
              beginAtZero: true
            },
            gridLines: {
              display: true
            }
          }],
        },
        legend: {
          display: false
        }
      }
    });
  },
  error: function() {
    console.log('Error getting chart data');
  }
});
// End Chart4
// Start Chart5
var chart5data = {
  labels: [],
  data: []
};
$.ajax({
  url: location.origin + '/chart5',
  dataType: 'JSON',
  success: function(data) {
    chart5data = data;
    var ctx = document.getElementById("myBarChart4");
    var myLineChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: chart5data.labels,
        datasets: [{
          label: "% Flight Count",
          backgroundColor: "rgba(2,117,216,1)",
          borderColor: "rgba(2,117,216,1)",
          data: chart5data.data,
        }],
      },
      options: {
        scales: {
          xAxes: [{
            time: {
              unit: 'airline'
            },
            gridLines: {
              display: false
            },
            ticks: {
              maxTicksLimit: 10
            }
          }],
          yAxes: [{
            ticks: {
              beginAtZero: true
            },
            gridLines: {
              display: true
            }
          }],
        },
        legend: {
          display: false
        }
      }
    });
  },
  error: function() {
    console.log('Error getting chart data');
  }
});
// End Chart5
// Start Chart6
var chart6data = {
  labels: [],
  data: []
};
$.ajax({
  url: location.origin + '/chart6',
  dataType: 'JSON',
  success: function(data) {
    chart6data = data;
    var ctx = document.getElementById("myBarChart5");
    var myLineChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: chart6data.labels,
        datasets: [{
          label: "% Flight Count",
          backgroundColor: "rgba(2,117,216,1)",
          borderColor: "rgba(2,117,216,1)",
          data: chart6data.data,
        }],
      },
      options: {
        scales: {
          xAxes: [{
            time: {
              unit: 'origin'
            },
            gridLines: {
              display: false
            },
            ticks: {
              maxTicksLimit: 10
            }
          }],
          yAxes: [{
            ticks: {
              beginAtZero: true
            },
            gridLines: {
              display: true
            }
          }],
        },
        legend: {
          display: false
        }
      }
    });
  },
  error: function() {
    console.log('Error getting chart data');
  }
});
//End Chart6
