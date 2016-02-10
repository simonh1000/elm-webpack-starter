var instances = module.hot && module.hot.data
  ? module.hot.data.instances || {}
  : {};
var uid = module.hot && module.hot.data
  ? module.hot.uid || 0
  : 0;

module.exports = (function (Elm) {
  var embed = Elm.embed;
  var fullscreen = Elm.fullscreen;

  return Object.assign(Elm, {
    embed: function(module, container, config) {
      return wrap(module, container, config);
    },
    fullscreen: function(module, config) {
      return wrap(module, null , config);
    }
  });

  function getUID() {
    return ++uid;
  }

  function wrap(module, container, config) {
    var id = getUID();

    //find module name
    var name = Object.keys(Elm).find(function (name) { return Elm[name] === module});
    var elm = container 
      ? embed(module, container, config) 
      : fullscreen(module, config);

    //hook dispose
    var dispose = elm.dispose;
    var hookedDispose = function() {
      delete instances[id];
      return dispose();
    };
    hookedDispose.original = dispose;
    elm.dispose = hookedDispose;

    //register
    instances[id] = {
      elm: elm,
      name: name
    };

    return elm;
  }
})(module.exports);

if (module.hot) {
  module.hot.accept();
  module.hot.dispose(function(data) {
    data.instances = instances;
    data.uid = uid;
  });

  var Elm = module.exports;
  Object.keys(instances).forEach(function(id) {
    var instance = instances[id];
    console.log('[elm-hot] Swapping module: ' + instance.name);
    var oldElm = instance.elm;
    var hookedDispose = oldElm.dispose;
    oldElm.dispose = hookedDispose.original;
    var newElm = instance.elm = oldElm.swap(Elm[instance.name]);
    hookedDispose.original = newElm.dispose;
    newElm.dispose = hookedDispose;
    if ('swap' in newElm.ports) {
      //trigger re-render
      newElm.ports.swap.send(true)
    } else {
      console.log('[elm-hot] \'swap\' port is not defined.');
    }
  });
}