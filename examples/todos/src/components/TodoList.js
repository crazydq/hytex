import React from 'react';
import PropTypes from 'prop-types';
import Todo from './Todo';
import {store, reactConnect } from 'hytex';

const TodoList = ({todos, visibilityFilter, onTodoClick}) => {
  return (<ul>
    {todos.filter(todo => {
      if (visibilityFilter === 'SHOW_ALL') {
        return true;
      }
      else if (visibilityFilter === 'SHOW_ACTIVE') {
        return todo.completed === false;
      }
      else if (visibilityFilter === 'SHOW_COMPLETED') {
        return todo.completed === true;
      }
    }).map(todo =>
      <Todo
        key={todo.id}
        {...todo}
        onClick={() => onTodoClick(todo.id)}
      />
    )}
  </ul>
)};

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    completed: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired
  }).isRequired).isRequired,
  onTodoClick: PropTypes.func.isRequired
};

export default TodoList;
