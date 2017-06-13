(function(window) {
  'use strict';

  var appModule = new app.Module();
  var helpers = appModule.getModule('helpers');
  var module;
  var settings = {
  };


  function initDesktopEvents() {

  }

  function initMobileEvents() {

  }

  function initAllDevices() {


  }

  function bindUIEvents() {
    var viewport = new helpers.viewPort();
    if(viewport.width > 1000) {
      initDesktopEvents();
    } else {
      initMobileEvents();
    }

    initAllDevices();

  }

  function init() {
    console.log('X module initiated...');
    bindUIEvents();
  }

  module =  {
    selector: document.getElementById('site-body'),
    settings: settings,
    init: init
  };


  appModule.register({
    name: 'name-of-module',
    obj: module
  });


})(window);
