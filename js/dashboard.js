// Chart.js scripts
// -- Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#292b2c';
// Start Chart1
chart1data = {
  labels: [],
  data: []
};
$.ajax({
  url: 'http://localhost/chart1',
  dataType: 'JSON',
  success: function(data) {
    chart1data = data;
    var seq = palette('tol-rainbow', 14);
    var ctx = document.getElementById("myPieChart");
    var myPieChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: chart1data.labels,
        datasets: [{
          data: chart1data.data,
          legend: false,
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
  },
  error: function() {
    console.log('Error getting chart data');
  }
});
// End Chart1
// Start Chart2
chart2data = {
  labels: [],
  data: []
};
$.ajax({
  url: 'http://localhost/chart2',
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
        scales: {
          xAxes: [{
            time: {
              unit: 'route'
            },
            gridLines: {
              display: false
            },
            ticks: {
              maxTicksLimit: 6
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
chart3data = {
  labels: [],
  data: []
};
$.ajax({
  url: 'http://localhost/chart3',
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
              maxTicksLimit: 6
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
chart4data = {
  labels: [],
  data: []
};
$.ajax({
  url: 'http://localhost/chart4',
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
              maxTicksLimit: 6
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
chart5data = {
  labels: [],
  data: []
};
$.ajax({
  url: 'http://localhost/chart5',
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
              maxTicksLimit: 6
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
chart6data = {
  labels: [],
  data: []
};
$.ajax({
  url: 'http://localhost/chart6',
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
              maxTicksLimit: 6
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
