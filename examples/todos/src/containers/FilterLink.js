import {store, reactConnect } from 'hytex';
import Link from '../components/Link'

const mapData = (store) => ({
  active: store.visibilityFilter
});

const properties = {
  onClick: (filter) => {
    store.visibilityFilter = filter;
  }
};

export default reactConnect(Link, mapData, properties);
