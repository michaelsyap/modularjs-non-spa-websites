(function(window) {
  'use strict';

  var NWModule = new app.NWModule();
  var model = NWModule.getModule('todo-model');
  var module;
  var settings = {
    ENTER_KEY: 13,
    $todoList: $('#todo-list'),
    $todoListContainer: $('#todo-list-container'),
    $todoListSwitcher: $('#todo-list-switcher'),
    currentCategory: 'all'
  };

  function watchDeleteTodo() {
    settings.$todoListContainer.on('click', '.delete-todo', function(e){
      var $this = $(this);

      model.removeTodoItem({
        id: parseInt($this.attr('data-id'))
      });

      renderTodoItems();

      return false;
    });
  }

  function watchTodoUpdates() {
    var $todoItem;

    // Toggle Edit Mode
    settings.$todoListContainer.on('dblclick', '.todo-description', function(e){
      var $this = $(this);
      $todoItem = $this.parents('.todo-item');

      $todoItem.addClass('-edit-mode');

      $todoItem.find('.todo-description-input').focus();

    });

    // Watch if user types 'enter' to update the todo item
    settings.$todoListContainer.on('keypress', '.todo-description-input', function(e){
      var $this = $(this);
      var id = $this.attr('data-id');
      var todoObj = model.getTodoItem(id);


      if($this.val().trim().length > 0 && e.keyCode === settings.ENTER_KEY) {

        todoObj.description = $this.val().trim();
        model.updateTodoItem(todoObj);


        $todoItem.removeClass('-edit-mode');
        renderTodoItems();

      }
    });

    // Watch if user leaves the input field, update the todo item
    settings.$todoListContainer.on('blur', '.todo-description-input', function(e){
      var $this = $(this);
      var id = $this.attr('data-id');
      var todoObj = model.getTodoItem(id);


      if($this.val().trim().length > 0) {

        todoObj.description = $this.val().trim();
        model.updateTodoItem(todoObj);

      } else { //Delete
        model.removeTodoItem(todoObj);
      }

      $todoItem.removeClass('-edit-mode');

      renderTodoItems();

    });

    // Watch if user updates the todo item status
    settings.$todoListContainer.on('change', '.status-toggle', function(e){
      var $this = $(this);
      var id = $this.attr('data-id');
      var todoObj = model.getTodoItem(id);
      $todoItem = $this.parents('.todo-item');

      todoObj.done = !todoObj.done;

      if(todoObj.done) {
        $todoItem.addClass('-done');
      } else {
        $todoItem.removeClass('-done');
      }

      model.updateTodoItem(todoObj);

      renderTodoItems();

    });
  }

  function watchListGroup() {
    var $activeElement = settings.$todoListSwitcher.find('.list-category.active');

    settings.$todoListSwitcher.on('click', '.list-category', function(e){
      var $this = $(this);

      settings.category = $this.attr('data-category');

      $activeElement.removeClass('active');
      $this.addClass('active');
      $activeElement = $this;

      renderTodoItems();

      return false;
    });
  }

  function bindUIEvents() {
    watchDeleteTodo();
    watchTodoUpdates();
    watchListGroup();
  }


  function renderTodoItems() {
    var todoItems = '';

    // Clear Todo List Container <ul>
    settings.$todoListContainer.html('');

    // Iterate through all todo items
    model.getTodoItems(settings.category).forEach(function(todo){

      var done = todo.done ? 'checked' : '';
      var doneClass = done === 'checked' ? '-done' : '';

      todoItems += '<li class="todo-item list-group-item '+ doneClass +'">' +
            '<div class="todo-info-actions clearfix">' +
              '<input type="checkbox" class="status-toggle" data-id="'+ todo.id +'" ' + done + '>' +
              '&nbsp; <span class="todo-description">' + todo.description + '</span>' +
              '<button class="btn btn-danger pull-right delete-todo" data-id="' + todo.id + '"><i class="fa fa-trash"></i></button>' +
            '</div>' +
            '<div class="todo-update-container">' +
              '<input type="text" class="form-control todo-description-input" data-id="' + todo.id + '" value="' + todo.description + '">' +
            '</div>' +
          '</li>';
    });

    // Render todo items to the DOM
    settings.$todoListContainer.html(todoItems);

  }

  function init() {
    console.log('Todo: List module initiated...');
    bindUIEvents();
    renderTodoItems();
  }

  module =  {
    element: settings.$todoList,
    init: init,
    renderTodoItems: renderTodoItems
  };


  NWModule.register({
    name: 'todo-list',
    obj: module
  });


})(window);
