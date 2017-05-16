import React from 'react'
import { render } from 'react-dom'
import App from './components/App'
import { store } from 'hytex';

store.init({
    todos: [],
    visibilityFilter: 'SHOW_ALL'
});

render(
    <App />,
  document.getElementById('root')
);
