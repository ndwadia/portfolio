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
  _origin = 'SUN';
}
// Call the dataTables jQuery plugin
$(document).ready(function() {
  $('#dataTable').DataTable({
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
});
