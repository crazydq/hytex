import Store from './store';
import reactComposer from './reactComposer';
import utils from './utils';

export default function (view, mapData, properties, onEnter) {

  if (typeof view !== 'undefined') {
    if (typeof view !== 'function') {
      throw new Error('Expected the view to be a React Class or Function.');
    }
  }
  else {
    throw new Error('view is a necessary parameter');
  }

  if (typeof mapData !== 'undefined') {
    if (typeof mapData !== 'function') {
      throw new Error('Expected the mapData to be a function.');
    }
  }
  else {
    throw new Error('mapData is a necessary parameter');
  }

  if (typeof properties !== 'undefined') {
    if (!utils.isObject(properties)) {
      throw new Error('Expected the properties to be a plain object.');
    }
  }

  if (typeof onEnter !== 'undefined') {
    if (typeof onEnter !== 'function') {
      throw new Error('Expected the onEnter to be a function.');
    }
  }

  return reactComposer(function (cb, id) {
    Store.addHandler(mapData, function (name, data) {
      cb(name, data);
    }, true, id);
  }, function(id){
    Store.deleteHandler(mapData, id);
  }, properties, onEnter, mapData)(view);
}