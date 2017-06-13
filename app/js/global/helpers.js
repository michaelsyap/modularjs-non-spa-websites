(function(window) {
  'use strict';

  var appModule = new app.Module();
  var module;

  var CONSTANTS = {
  };

  var settings = {
  };


  function bindUIEvents() {
    // Code here...
  }

  function init() {
    console.log('Helper module initiated...');
    bindUIEvents();
  }

  // Return the current viewport size
  function viewPort() {
    var e = window;
    var a = 'inner';

    //For Windows Mobile Devices (http://quirksmode.org/mobile/viewports2.html)
    if (!('innerWidth' in window)){
        a = 'client';
        e = document.documentElement || document.body;
    }

    return { width: e[ a+'Width' ], height: e[ a+'Height' ] };
  }

  function youtubeParser(url){
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    var match = url.match(regExp);
    return (match&&match[7].length === 11)? match[7] : false;
  }

  function getQueryStringArgs(){
    var qs = (location.search.length > 0 ? location.search.substring(1) : '');
    //object to hold data args = {},
    //get individual items
    var items = qs.length ? qs.split('&') : [];
    var item = null;
    var name = null;
    var value = null;
    var i;
    var args = {};
    //used in for loop i = 0,
    var len = items.length;

    //assign each item onto the args object
    for (i=0; i < len; i++){
      item = items[i].split('=');
      name = decodeURIComponent(item[0]);
      value = decodeURIComponent(item[1]);
      if (name.length) {
        args[name] = value;
      }
    }
    return args;
  }

  function scrollToSection() {
    var target;

    console.log(this.pathname);

    if (location.pathname.replace(/^\//,'') === this.pathname.replace(/^\//,'') && location.hostname === this.hostname) {
      target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  }


  function scrolltoSectionSelect() {

    var offset = -80; //Offset of -80px
    var scollTo  = $(this).val();

    $('html, body').animate({
        scrollTop: $(scollTo).offset().top + offset
    }, 1000);
  }

  module =  {
    selector: document.getElementById('site-body'),
    CONSTANTS: CONSTANTS,
    settings: settings,
    init: init,
    viewPort: viewPort,
    youtubeParser: youtubeParser,
    scrollToSection: scrollToSection,
    scrolltoSectionSelect: scrolltoSectionSelect,
    getQueryStringArgs: getQueryStringArgs
  };


  appModule.register({
    name: 'helpers',
    obj: module
  });

})(window);
