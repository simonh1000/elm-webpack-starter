var instances = module.hot && module.hot.data
  ? module.hot.data.instances || {}
  : {};
var uid = 0;

module.exports = (function (Elm) {
  var embed = Elm.embed;
  var worker = Elm.worker;
  var fullscreen = Elm.fullscreen;

  return Object.assign(Elm, {
    embed: function(module, container, config) {
      var id = ++uid;

      //find module name
      var name = Object.keys(Elm).find(function (name) { return Elm[name] === module});
      var elm = embed(module, container, config);
      //hook dispose
      var dispose = elm.dispose;
      instances[id] = {
        elm: elm,
        name: name,
        config: config,
        dispose: dispose,
        container: container
      };
      elm.dispose = function () {
        delete instances[id];
        return dispose();
      } 
      return elm;
    },
    worker: function() {
      console.warn('elm-hot-loader currently only supports Elm.embed().');
      return proxy(worker, arguments);
    },
    fullscreen: function() {
      console.warn('elm-hot-loader currently only supports Elm.embed().');
      return proxy(fullscreen, arguments);
    }
  });

  function proxy(method, arguments, warn) {
    return method.apply(Elm, arguments);
  }
})(module.exports);

if (module.hot) {
  module.hot.accept();
  module.hot.dispose(function(data) {
    data.instances = instances;
  });

  var Elm = module.exports;
  Object.keys(instances).forEach(function(id) {
    var instance = instances[id];
    console.log('[elm-hot] Swapping module: ' + instance.name);
    var oldElm = instance.elm;
    console.log(oldElm);
    instance.elm = oldElm.swap(Elm[instance.name]);
  });
}