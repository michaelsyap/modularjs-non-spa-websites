(function(window) {
  'use strict';

  var NWModule = new app.NWModule();
  var helpers = NWModule.getModule('helpers');
  var module;
  var settings = {
  };


  function bindUIEvents() {

  }

  function init() {
    console.log('Global module initiated...');
    bindUIEvents();
  }

  module =  {
    element: document.querySelector('body'),
    settings: settings,
    init: init
  };


  NWModule.register({
    name: 'global-module',
    obj: module
  });


})(window);
