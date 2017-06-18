(function(window) {
  'use strict';

  var NWModule = new app.NWModule();
  var module;

  var settings = {
  };


  function bindUIEvents() {
    // Code here...
  }

  function init() {
    console.log('Helper module initiated...');
    bindUIEvents();
  }


  module =  {
    element: document.querySelector('body'),
    settings: settings,
    init: init
  };


  NWModule.register({
    name: 'helpers',
    obj: module
  });

})(window);
