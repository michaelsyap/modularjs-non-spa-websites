(function(window){
  'use strict';

  var modules = {};

  /**
   * Creates a new instance of Module class which exposes public methods
   */
  function Module() {
    return this;
  }

  /**
   * Creates a new Module upon registration within the [module].js
   *
   * @param {object} newModule the object containing the name, id, & object of the new module
   */
  Module.prototype.register = function register(newModule) {
    if(newModule && !doesModuleExist(newModule.name)) {
      modules[newModule.name] = newModule.obj;
      return true;
    }
    throw new Error('Module your trying to add already existed.');
    return false;
  };


  /**
   * To get a module from modules object Array
   *
   * @param {string} name the name of the module being fetched
   */
  Module.prototype.getModule = function getModule(name) {
    if(doesModuleExist(name)) {
      return modules[name];
    }

    return false;
  };

  /**
   * To get all registered modules
   *
   */
  Module.prototype.getAllModules = function getAllModules() {
    return modules;
  };


  /**
   * To run all modules
   *
   */
  Module.prototype.init = function init() {
    var key;

    for(key in modules) {
      if(modules[key].hasOwnProperty('selector')
          && modules[key].selector
          && modules[key].hasOwnProperty('init')
          && modules[key].init) {
        modules[key].init();
      }
    }


  };


  /**
   * Checks if module exist from modules object array
   */
  function doesModuleExist(name) {
    if(name in modules) {
      return true;
    }

    return false;
  }

  window.app = window.app || {};
  window.app.Module =  Module;
})(window);
