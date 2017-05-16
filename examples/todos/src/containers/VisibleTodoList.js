import React from 'react';
import TodoList from '../components/TodoList';
import {store, reactConnect } from 'hytex';

const mapData = (store) => {
  return {
    todos: store.todos,
    visibilityFilter: store.visibilityFilter
  }
};

const properties = {
  onTodoClick: function(id) {
    let elm = store.todos[id];
    elm.completed = !elm.completed;
    store.todos.splice(id, 1, elm);
  }
};

export default reactConnect(TodoList, mapData, properties);