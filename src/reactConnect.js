import Store from './store';
import reactComposer from './reactComposer';

export default function (view, mapData, properties, onEnter) {
  return reactComposer(function (cb, id) {
    Store.addHandler(mapData, function (name, data) {
      cb(name, data);
    }, true, id);
  }, function(id){
    Store.deleteHandler(mapData, id);
  }, properties, onEnter, mapData)(view);
}