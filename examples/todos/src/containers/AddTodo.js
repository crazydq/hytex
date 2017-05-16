import React from 'react';
import {store, reactConnect } from 'hytex';

let nextTodoId = 0;

let AddTodo = () => {
  let input;

  return (
    <div>
      <form onSubmit={e => {
        e.preventDefault();
        if (!input.value.trim()) {
          return
        }
        store.todos.push({
          id: nextTodoId++,
          text: input.value,
          completed: false
        });
        input.value = ''
      }}>
        <input ref={node => {
          input = node
        }} />
        <button type="submit">
          Add Todo
        </button>
      </form>
    </div>
  )
};

export default AddTodo;
