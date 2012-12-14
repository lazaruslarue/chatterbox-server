// utility function for setting authentication headers.
// use it like this: 
// $.ajax(url, {
//   ...,
//   beforeSend: headerSetter
// })
var headerSetter = function(xhr) {
  xhr.setRequestHeader("X-Parse-Application-Id", "voLazbq9nXuZuos9hsmprUz7JwM2N0asnPnUcI7r");
  xhr.setRequestHeader("X-Parse-REST-API-Key", "QC2F43aSAghM97XidJw8Qiy1NXlpL5LR45rhAVAf");
}
