(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'react', 'terminal-in-react', 'core-decorators', 'lodash.set', 'memoizerific', 'lang-map', 'react-syntax-highlighter', 'react-syntax-highlighter/dist/styles', './consts'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('react'), require('terminal-in-react'), require('core-decorators'), require('lodash.set'), require('memoizerific'), require('lang-map'), require('react-syntax-highlighter'), require('react-syntax-highlighter/dist/styles'), require('./consts'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.React, global.terminalInReact, global.coreDecorators, global.lodash, global.memoizerific, global.langMap, global.reactSyntaxHighlighter, global.styles, global.consts);
    global.basic = mod.exports;
  }
})(this, function (exports, _react, _terminalInReact, _coreDecorators, _lodash, _memoizerific, _langMap, _reactSyntaxHighlighter, _styles, _consts) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = configPlugin;

  var _react2 = _interopRequireDefault(_react);

  var _lodash2 = _interopRequireDefault(_lodash);

  var _memoizerific2 = _interopRequireDefault(_memoizerific);

  var _langMap2 = _interopRequireDefault(_langMap);

  var _reactSyntaxHighlighter2 = _interopRequireDefault(_reactSyntaxHighlighter);

  var syntaxStyles = _interopRequireWildcard(_styles);

  function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
      return obj;
    } else {
      var newObj = {};

      if (obj != null) {
        for (var key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
        }
      }

      newObj.default = obj;
      return newObj;
    }
  }

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  };

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  function _toConsumableArray(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
        arr2[i] = arr[i];
      }

      return arr2;
    } else {
      return Array.from(arr);
    }
  }

  var DIR = 'dir';
  var FILE = 'file';
  var HOME_PATH = ['home', 'user'];

  function has(obj, key) {
    return typeof obj[key] !== 'undefined';
  }

  function configPlugin() {
    var _dec, _class, _desc, _value, _class2, _class3, _temp;

    var pathSeporator = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '/';

    function toStringPath(path) {
      var stringParts = [].concat(_toConsumableArray(path.parts));
      if (path.isDir) {
        stringParts.push('');
      }
      if (path.isRoot) {
        stringParts.unshift('');
      }
      return stringParts.join(pathSeporator);
    }

    var PseudoFileSystem = (_dec = (0, _coreDecorators.decorate)((0, _memoizerific2.default)(500)), (0, _coreDecorators.autobind)(_class = (_class2 = (_temp = _class3 = function (_PluginBase) {
      _inherits(PseudoFileSystem, _PluginBase);

      function PseudoFileSystem(api, config) {
        _classCallCheck(this, PseudoFileSystem);

        var _this = _possibleConstructorReturn(this, (PseudoFileSystem.__proto__ || Object.getPrototypeOf(PseudoFileSystem)).call(this, api, config));

        _this.commands = {
          cd: _this.enterDir(),
          ls: _this.listDirContents(),
          rm: _this.removeFromFileSystemCommand(),
          mkdir: _this.createDirCommand(),
          touch: _this.createFileCommand(),
          cat: _this.runCat(),
          echo: _this.runEcho()
        };
        _this.descriptions = {
          cd: 'Change directory',
          ls: 'List contents of the current directory',
          rm: 'Remove a file or directory',
          mkdir: 'Create a new directory',
          touch: 'Touch a file',
          cat: 'Read contents of a file',
          echo: 'ECHOOOOOOO'
        };

        _this.getPublicMethods = function () {
          return {
            parsePath: _this.parsePath,
            isValidPath: function isValidPath(path, cb) {
              return cb(_this.isValidPath(path));
            },
            createDir: _this.createDir,
            createFile: _this.createFile,
            removeDir: _this.remove,
            removeFile: _this.remove,
            readDir: function readDir(path, cb) {
              return cb(_this.getContents(path, true));
            },
            readFile: function readFile(path, cb) {
              var file = _this.getContents(path);
              if (file !== null && (typeof file === 'undefined' ? 'undefined' : _typeof(file)) === 'object') {
                cb(file.contents);
              } else {
                cb(file);
              }
            },
            writeFile: _this.writeToFile,
            pathToString: toStringPath,
            types: {
              dir: DIR,
              file: FILE
            }
          };
        };

        _this.currentPath = '';

        var _ = ['' + pathSeporator + HOME_PATH.join(pathSeporator) + pathSeporator];
        setTimeout(function () {
          _this.enterDir().method({ _: _ });
        });
        return _this;
      }

      _createClass(PseudoFileSystem, [{
        key: 'doParse',
        value: function doParse(split, currentPath) {
          // eslint-disable-line class-methods-use-this
          var isDir = false;
          var isRoot = false;
          var baseIsASymbol = [_consts.CURRENT_DIR, _consts.PARENT_DIR, _consts.HOME_DIR].indexOf(split[0]) > -1;
          if (split[split.length - 1] === '' || split.length === 1 && baseIsASymbol) {
            isDir = true;
          }
          if (split[0] === '') {
            isRoot = true;
          }
          var modPath = split.filter(function (part) {
            return part.length !== 0;
          });
          if (!isRoot) {
            if (modPath[0] === _consts.CURRENT_DIR) {
              modPath = [].concat(_toConsumableArray(currentPath.parts), _toConsumableArray(modPath.slice(1)));
            } else if (modPath[0] === _consts.HOME_DIR) {
              modPath = [].concat(HOME_PATH, _toConsumableArray(modPath.slice(1)));
            } else if (modPath[0] === _consts.PARENT_DIR) {
              modPath = [].concat(_toConsumableArray(currentPath.parts), _toConsumableArray(modPath));
            }
          }

          if (baseIsASymbol) {
            isRoot = true;
          }

          for (var i = 0; i < modPath.length; i += 1) {
            if (modPath[i] === _consts.CURRENT_DIR) {
              modPath[i] = '';
            } else if (modPath[i] === _consts.PARENT_DIR) {
              if (i - 1 >= 0) {
                modPath[i - 1] = '';
              }
              modPath[i] = '';
            }
          }
          modPath = modPath.filter(function (part) {
            return part.length !== 0;
          });

          return {
            parts: modPath,
            isRoot: isRoot,
            isDir: isDir
          };
        }
      }, {
        key: 'parsePath',
        value: function parsePath(path) {
          var split = path.split(pathSeporator);
          if (['', _consts.CURRENT_DIR, _consts.PARENT_DIR, _consts.HOME_DIR].indexOf(split[0]) < 0) {
            split.unshift('.');
          }
          return this.doParse(split, this.currentPath);
        }
      }, {
        key: 'isValidPath',
        value: function isValidPath(path) {
          var parts = path.parts;

          var last = this.api.getData();
          for (var i = 0; i < parts.length; i += 1) {
            if (true || has(last.contents, parts[i])) {
              last = last.contents[parts[i]];
            } else {
              this.api.printLine('Not a valid path: ' + toStringPath(path));
              return false;
            }
          }
          return true;
        }
      }, {
        key: 'getContents',
        value: function getContents(path) {
          var str = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
          var parts = path.parts;

          if (this.isValidPath(path)) {
            var last = this.api.getData();
            for (var i = 0; i < parts.length; i += 1) {
              if (has(last.contents, parts[i])) {
                last = last.contents[parts[i]];
              }
            }
            if (str && typeof last !== 'string') {
              return ['.', '..'].concat(_toConsumableArray(Object.keys(last)));
            }
            return last;
          }
          return null;
        }
      }, {
        key: 'addToFileSystem',
        value: function addToFileSystem(_ref, data) {
          var parts = _ref.parts;

          var path = ['contents'].concat(_toConsumableArray(parts.join('Ω…ΩcontentsΩ…Ω').split('Ω…Ω')));
          this.api.setData((0, _lodash2.default)(this.api.getData(), path, data));
        }
      }, {
        key: 'enterDir',
        value: function enterDir() {
          var _this2 = this;

          return {
            method: function method(args) {
              if (args._.length > 0) {
                var newPath = _this2.parsePath(args._.join(' '));
                if (_this2.isValidPath(newPath)) {
                  _this2.currentPath = newPath;
                  _this2.api.setPromptPrefix(toStringPath(_this2.currentPath) + ' ');
                }
              }
            }
          };
        }
      }, {
        key: 'createDirCommand',
        value: function createDirCommand() {
          var _this3 = this;

          return {
            method: function method(args) {
              if (args._.length > 0) {
                var path = _this3.parsePath(args._[0]);
                _this3.createDir(path);
              }
            }
          };
        }
      }, {
        key: 'createDir',
        value: function createDir(path) {
          if (this.isValidPath(path)) {
            var parentDir = path.parts.slice(0, path.parts.length - 2);
            var newDir = path.parts[path.parts.length - 1];
            var dir = this.getContents({ parts: parentDir });
            if (dir !== null) {
              if (!has(dir.contents, newDir)) {
                this.addToFileSystem(path, {
                  name: newDir,
                  type: DIR,
                  contents: {}
                });
              }
            }
          }
        }
      }, {
        key: 'createFileCommand',
        value: function createFileCommand() {
          var _this4 = this;

          return {
            method: function method(args) {
              if (args._.length > 0) {
                var path = _this4.parsePath(args._[0]);
                _this4.createFile(path);
              }
            }
          };
        }
      }, {
        key: 'createFile',
        value: function createFile(path) {
          var parentDir = path.parts.slice(0, path.parts.length - 2);
          if (this.isValidPath({ parts: parentDir })) {
            var newFile = path.parts[path.parts.length - 1];
            var dir = this.getContents({ parts: parentDir });
            if (dir !== null) {
              if (!has(dir.contents, newFile)) {
                this.addToFileSystem(path, {
                  name: newFile,
                  type: FILE,
                  contents: ''
                });
              }
            }
          }
        }
      }, {
        key: 'remove',
        value: function remove(path) {
          var contents = this.getContents(path);
          if (contents !== null && typeof contents !== 'undefined') {
            this.addToFileSystem(path, undefined);
          }
        }
      }, {
        key: 'removeFromFileSystemCommand',
        value: function removeFromFileSystemCommand() {
          var _this5 = this;

          return {
            method: function method(args) {
              if (args._.length > 0) {
                var path = _this5.parsePath(args._.join(' '));
                var contents = _this5.getContents(path);
                if (contents !== null) {
                  if (contents.type === DIR && Object.keys(contents.contents).length > 0 && !args.recursive) {
                    _this5.api.printLine(toStringPath(path) + ' is not empty');
                  } else {
                    _this5.addToFileSystem(path, undefined);
                  }
                }
              }
            },
            options: [{
              name: 'recursive',
              description: 'Each item in the folder as well',
              defaultValue: false
            }, {
              name: 'force',
              description: 'Force the delete',
              defaultValue: false
            }]
          };
        }
      }, {
        key: 'runCat',
        value: function runCat() {
          var _this6 = this;

          return {
            method: function method(args) {
              if (args._.length > 0) {
                var split = args._;
                if (args._.indexOf('>>') > 0) {
                  split = args._.join(' ').split('>>');
                }
                var pathA = _this6.parsePath(split[0].trim());
                var file = _this6.getContents(pathA);
                if (file !== null && file.type === FILE) {
                  if (args._.indexOf('>>') > 0) {
                    var pathB = _this6.parsePath(split[1].trim());
                    _this6.writeToFile(pathB, file.contents, { flag: 'a' });
                  } else {
                    var splitName = file.name.split('.');
                    var lang = _langMap2.default.languages(splitName[splitName.length - 1])[0];
                    _this6.api.printLine(_react2.default.createElement(
                      _reactSyntaxHighlighter2.default,
                      { language: lang, style: syntaxStyles[lang] },
                      file.contents
                    ));
                  }
                }
              }
            }
          };
        }
      }, {
        key: 'runEcho',
        value: function runEcho() {
          var _this7 = this;

          return {
            method: function method(args) {
              if (args._.length > 0) {
                if (args._.indexOf('>>') > -1) {
                  var split = args._.join(' ').split(' >> ');
                  var path = _this7.parsePath(split[1]);
                  _this7.writeToFile(path, split[0], { flag: 'a' });
                } else {
                  _this7.api.printLine(args._.join(' '));
                }
              }
            }
          };
        }
      }, {
        key: 'writeToFile',
        value: function writeToFile(path) {
          var contents = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
          var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : { flag: 'w' };

          if (this.isValidPath(path)) {
            var file = this.getContents(path);
            if (file !== null && file.type === FILE) {
              if (options.flag === 'w') {
                file.contents = '' + contents;
              } else if (options.flag === 'a') {
                file.contents += '\n' + contents;
              }
              this.addToFileSystem(path, file);
            }
          }
        }
      }, {
        key: 'listDirContents',
        value: function listDirContents() {
          var _this8 = this;

          return {
            method: function method(args) {
              var path = _this8.parsePath(args._[0] || '.');
              if (path.isDir) {
                var dir = _this8.getContents(path);
                if (dir !== null) {
                  var contents = [{
                    name: '.',
                    type: DIR
                  }, {
                    name: '..',
                    type: DIR
                  }].concat(_toConsumableArray(Object.values(dir.contents)));
                  _this8.api.printLine(_react2.default.createElement(
                    'span',
                    null,
                    contents.filter(function (item) {
                      return typeof item !== 'undefined';
                    }).map(function (item) {
                      var styles = {
                        color: '#bdc3c7',
                        marginRight: 5,
                        width: 'calc(33% - 5px)',
                        display: 'inline-block'
                      };
                      if (contents.length > 3) {
                        styles.marginBottom = 5;
                      }
                      if (item.type === DIR) {
                        styles.color = '#2980b9';
                      }
                      return _react2.default.createElement(
                        'span',
                        {
                          style: styles,
                          title: item.type.toUpperCase(),
                          key: item.name + '-' + item.type
                        },
                        item.name
                      );
                    })
                  ));
                }
              }
            }
          };
        }
      }]);

      return PseudoFileSystem;
    }(_terminalInReact.PluginBase), _class3.displayName = _consts.displayName, _class3.version = _consts.version, _class3.defaultData = {
      name: pathSeporator,
      type: DIR,
      contents: {
        home: {
          name: 'home',
          type: DIR,
          contents: {
            user: {
              name: 'user',
              type: DIR,
              contents: {}
            }
          }
        }
      }
    }, _temp), (_applyDecoratedDescriptor(_class2.prototype, 'doParse', [_dec], Object.getOwnPropertyDescriptor(_class2.prototype, 'doParse'), _class2.prototype)), _class2)) || _class);


    return PseudoFileSystem;
  }
});