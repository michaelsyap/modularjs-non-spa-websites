(function(window){
  'use strict';

  var modules = {};

  /**
   * Creates a new instance of Module class which exposes public methods
   */
  function NWModule() {
    return this;
  }

  /**
   * Creates a new Module upon registration within the [module].js
   *
   * @param {object} newModule the object containing the name, id, & object of the new module
   */
  NWModule.prototype.register = function register(newModule) {
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
  NWModule.prototype.getModule = function getModule(name) {
    if(doesModuleExist(name)) {
      return modules[name];
    }

    return false;
  };

  /**
   * To get all registered modules
   *
   */
  NWModule.prototype.getAllModules = function getAllModules() {
    return modules;
  };


  /**
   * To run all modules
   *
   */
  NWModule.prototype.init = function init() {
    var key;

    for(key in modules) {

      if(modules[key].hasOwnProperty('element')
          && doesElementExist(modules[key].element)
          && modules[key].hasOwnProperty('init')
          && modules[key].init) {
        modules[key].init();
      }
    }


  };


  /**
   * Checks if element exists
   */
  function doesElementExist(element) {

    if(element instanceof jQuery && element.length > 0)
      return true;

    if(!(element instanceof jQuery) && element)
      return true;

    return false;
  }


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
  window.app.NWModule =  NWModule;
})(window);
