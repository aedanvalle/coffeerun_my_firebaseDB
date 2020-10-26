(function(window) {
  'use strict';
  var $ = window.jQuery;
  var App = window.App;

  var SUBMIT_SELECTOR = '[payment="form"]';
  var FormHandler = App.FormHandler; // <---- the problem

  var paymentHandler = new FormHandler(SUBMIT_SELECTOR);

  paymentHandler.addSubmitHandler(function(data) {
    var blah = data.title + " " + data.username;
    $("#dialog").append(blah).modal();
  });
})(window);
