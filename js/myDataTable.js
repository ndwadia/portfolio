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
var _origin = result.origin;
if (_origin == undefined) {
  _origin = 'ABE';
}
var myTable = $('#dataTable').DataTable({
  "ajax": location.origin + '/dataTable?origin=' + _origin,
  "columns": [{
      "data": "CARRIER"
    },
    {
      "data": "DEST"
    },
    {
      "data": "FL_DATE"
    },
    {
      "data": "CRS_DEP_TIME"
    },
    {
      "data": "CANCELLATION_CODE"
    }
  ]
});
document.getElementById("insert_caption").innerHTML = "Origin: " + _origin;
$(function() {
  function log(message) {
    $("<div>").text(message).prependTo("#log");
    $("#log").scrollTop(0);
  }
  $("#originAirport").autocomplete({
    source: function(request, response) {
      $.ajax({
        url: "searchOrigin",
        dataType: "json",
        data: {
          term: request.term
        },
        success: function(data) {
          response(data);
        }
      });
    },
    minLength: 1,
    select: function(event, ui) {
      _origin = ui.item.value;
      var url = location.origin + location.pathname + "?origin=" + _origin;
      location.href = url;
    }
  });
});
$(function() {
  $("#originAirport").keyup(function(event) {
    if (event.keyCode === 13) {
      console.log(1);
      myFunction();
    }
  });
});

function myFunction() {
  var x = document.getElementById("originAirport");
  var _origin = x.value.toUpperCase();
  var url = location.origin + location.pathname + "?origin=" + _origin;
  location.href = url;
}
