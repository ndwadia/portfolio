// Chart.js scripts
// -- Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#292b2c';
// Pie chart for Flights Master
chartData = {
  labels: [],
  data: []
};
$.ajax({
  url: 'http://localhost/dashboard',
  dataType: 'JSON',
  success: function(data) {
    chartData = data;
    var seq = palette('tol-rainbow', 14);
    var ctx = document.getElementById("myPieChart");
    var myPieChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: chartData.labels,
        datasets: [{
          data: chartData.data,
          legend: false,
          backgroundColor: palette('tol-rainbow', chartData.data.length).map(function(hex) {
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
          images: [
            {
              src: 'image.png',
              width: 16,
              height: 16
            }
          ]
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
// -- Bar Chart Example
var ctx = document.getElementById("myBarChart");
var myLineChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [{
      label: "Revenue",
      backgroundColor: "rgba(2,117,216,1)",
      borderColor: "rgba(2,117,216,1)",
      data: [4215, 5312, 6251, 7841, 9821, 14984],
    }],
  },
  options: {
    scales: {
      xAxes: [{
        time: {
          unit: 'month'
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
          min: 0,
          max: 15000,
          maxTicksLimit: 5
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
