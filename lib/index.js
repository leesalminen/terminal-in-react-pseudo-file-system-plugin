(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', './basic', './indexDb'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./basic'), require('./indexDb'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.basic, global.indexDb);
    global.index = mod.exports;
  }
})(this, function (exports, _basic, _indexDb) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = configPlugin;

  var _basic2 = _interopRequireDefault(_basic);

  var _indexDb2 = _interopRequireDefault(_indexDb);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function configPlugin() {
    var pathSeporator = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '/';
    var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'basic';

    for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      args[_key - 2] = arguments[_key];
    }

    if (type === 'basic') {
      return _basic2.default.apply(undefined, [pathSeporator].concat(args));
    } else if (type === 'db') {
      return _indexDb2.default.apply(undefined, [pathSeporator].concat(args));
    }
    throw new Error('The type "' + type + '" is not an available storage type');
  }
});