(function(window) {
  'use strict';

  var NWModule = new app.NWModule();
  var helpers = NWModule.getModule('helpers');
  var module;
  var settings = {
    todoItems: []
  };

  function saveTodo(todo) {

    // If there's a new todo item
    if(todo) {
      console.log(todo);
      settings.todoItems.unshift(todo);
    }

    // Update localstorage with updated array
    window.localStorage.setItem('todo-demo', JSON.stringify(settings.todoItems));
  }

  function removeTodoItem(todo) {
    var todoId = todo.id;
    var index;

    // Generate a new array from the ids of the objects
    // Get the index of the todo object from the todo id
    index = settings.todoItems.map(function(el) {
      return el.id;
    }).indexOf(todoId);

    // Remove the todo item from the array
    settings.todoItems.splice(index, 1);

    saveTodo();

  }

  function updateTodoItem(todo) {
    var todoId = todo.id;
    var index;

    index = settings.todoItems.map(function(el){
      return el.id;
    }).indexOf(parseInt(todoId));

    settings.todoItems[index] = todo;

    saveTodo();
  }

  function getTodoItems(category) {
    var todoItems;


    if(category === 'active') {

      todoItems = settings.todoItems.filter(function(el){
        return el.done === false;
      });



    } else if (category === 'done') {

      todoItems = settings.todoItems.filter(function(el){
        return el.done === true;
      });

    } else {
      return settings.todoItems;
    }

    console.log(todoItems);

    return todoItems;
  }

  function getTodoItem(todoId) {
    var index;

    index = settings.todoItems.map(function(el){
      return el.id;
    }).indexOf(parseInt(todoId));


    return settings.todoItems[index];

  }

  function bindUIEvents() {

  }

  function init() {
    console.log('Todo model initiated...');
    if(!window.localStorage.getItem('todo-demo')) {
      window.localStorage.setItem('todo-demo', JSON.stringify([]));
    } else {
      settings.todoItems = JSON.parse(window.localStorage.getItem('todo-demo'));
    }
  }

  module =  {
    element: document.querySelector('body'),
    init: init,
    saveTodo: saveTodo,
    getTodoItems: getTodoItems,
    getTodoItem: getTodoItem,
    updateTodoItem: updateTodoItem,
    removeTodoItem: removeTodoItem
  };


  NWModule.register({
    name: 'todo-model',
    obj: module
  });


})(window);
