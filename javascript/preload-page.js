// preload-page demo
'use strict';

var object;
(function(global, undefined) {
  var Util = {};

  Util.ajax = function(url, successCallback, failCallback) {
    var request = new XMLHttpRequest();
    request.open('GET', url, true);

    request.onreadystatechange = function() {
      if (this.readyState === 4) {

        if (this.status >= 200 && this.status < 400) {
          successCallback(this.responseText);
        } else {
          failCallback();
        }
      }
    };

    request.send();
    request = null;
  };

  Util.domParser = function(xml) {
    var parser = new DOMParser();
    return parser.parseFromString(xml, 'text/html');
  };

  var url = 'https://github.com/xudafeng';

  Util.ajax(url, function(data) {
    var xml = Util.domParser(data);
    var title = xml.title;
    var body = xml.body;

    object = {
      url: url,
      body: body,
      title: title
    };
  }, function() {
  });

})(this);

document.querySelector('#button').addEventListener('click', function(){
  if (!object) {
    return;
  }
  history.pushState({}, '', object.url);
  document.body.innerHTML = object.body.innerHTML;
  document.title = object.title;
}, false);
