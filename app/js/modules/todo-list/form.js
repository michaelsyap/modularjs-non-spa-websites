(function(window) {
  'use strict';

  var NWModule = new app.NWModule();
  var model = NWModule.getModule('todo-model');
  var list = NWModule.getModule('todo-list');
  var module;
  var settings = {
    ENTER_KEY: 13,
    $todoForm: $('#todo-form'),
    $todoItemName: $('#todo-item-name'),
  };

  function disableFormSubmit() {
    settings.$todoForm.on('submit', function(e){
      return false;
    });
  }


  function watchFormInput() {
    settings.$todoItemName.on('keypress', function(e){
      var $this = $(this);

      if($this.val().trim().length > 0 && e.keyCode === settings.ENTER_KEY) {

        model.saveTodo({
          id: Date.now(),
          description: $this.val(),
          done: false
        });

        $this.val('');

        list.renderTodoItems();

      }


    });


  }


  function bindUIEvents() {
    disableFormSubmit();
    watchFormInput();

  }

  function init() {
    console.log('Todo: Form module initiated...');

    // Initiate all event listeners
    // and plugins if necessary
    bindUIEvents();
  }

  module =  {
    element: settings.$todoForm,
    init: init
  };


  NWModule.register({
    name: 'todo-form-control',
    obj: module
  });


})(window);
