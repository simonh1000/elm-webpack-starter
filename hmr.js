if (module.hot) {
  //try {
    (function() {
      "use strict";
      var instances = module.hot && module.hot.data
        ? module.hot.data.instances || {}
        : {};
      var uid = module.hot && module.hot.data
        ? module.hot.uid || 0
        : 0;

      var Elm = wrapElm(module.exports);

      module.hot.accept();
      module.hot.dispose(function(data) {
        data.instances = instances;
        data.uid = uid;
      });

      Object.keys(instances).forEach(function(id) {
        var instance = instances[id];
        console.log('[elm-hot] Swapping module: ' + instance.name + '#' + id);
        var oldElm = instance.elm;
        var hookedDispose = oldElm.dispose;
        oldElm.dispose = hookedDispose.original;
        var newElm = instance.elm = oldElm.swap(Elm[instance.name]);
        hookedDispose.original = newElm.dispose;
        newElm.dispose = hookedDispose;

        //reconnect ports
        var portSubscribes = instance.portSubscribes;
        var portNames;
        if (portSubscribes) {
          portNames = Object.keys(portSubscribes);
          if (portNames.length) {
            portNames.forEach(function(name) {
              var handlers = portSubscribes[name];
              if (!handlers.length) {
                return;
              }
              console.log('[elm-hot] Reconnect ' + handlers.length + ' handler(s) to port \'' + name + '\'.');
              handlers.forEach(function(handler) {
                newElm.ports[name].subscribe(handler);
              });

              wrapPorts(newElm, portSubscribes);
            });
          }
        }

        if ('swap' in newElm.ports) {
          //trigger re-render
          newElm.ports.swap.send(true)
        } else {
          console.error('[elm-hot] \'swap\' port is not defined.');
        }
      });

      module.exports = Elm;

      function wrapElm(Elm) {
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
            name: name,
            portSubscribes: wrapPorts(elm, {})
          };

          return elm;
        }
      }

      //hook ports to reconnect after swap
      function wrapPorts(elm, portSubscribes) {
        var portNames = Object.keys(elm.ports);
        //hook ports
        if (portNames.length) {
          portNames
            .filter(function(name) {
              return 'subscribe' in elm.ports[name];
            })
            .forEach(function(portName) {
              var port = elm.ports[portName];
              var subscribe = port.subscribe;
              var unsubscribe = port.unsubscribe;
              elm.ports[portName] = Object.assign(port, {
                subscribe: function(handler) {
                  console.log('[elm-hot] ports.' + portName + '.subscribe called.');
                  if (!portSubscribes[portName]) {
                    portSubscribes[portName] = [ handler ];
                  } else {
                    //TODO handle subscribing handler more than once?
                    portSubscribes[portName].push(handler);
                  }
                  return subscribe.call(port, handler);
                },
                unsubscribe: function(handler) {
                  console.log('[elm-hot] ports.' + portName + '.unsubscribe called.');
                  var list = portSubscribes[portName];
                  if (list && list.indexOf(handler) !== -1) {
                    list.splice(list.lastIndexOf(handler), 1);
                  } else {
                    console.warn('[elm-hot] ports.' + portName + '.unsubscribe: handler not subscribed');
                  }
                  return unsubscribe.call(port, handler);
                }
              });
            });
        }
        return portSubscribes;
      }
    })();
  /*
  } catch (e) {
    console.error('[elm-hot] crashed. Please report this to https://github.com/fluxxu/elm-hot-loader/issues');
    console.error(e);
  }
  */
}