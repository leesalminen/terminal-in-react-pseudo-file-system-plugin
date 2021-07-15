(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'react', 'terminal-in-react', 'core-decorators', 'memoizerific', 'lang-map', 'react-syntax-highlighter', 'react-syntax-highlighter/dist/styles', './consts', './db'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('react'), require('terminal-in-react'), require('core-decorators'), require('memoizerific'), require('lang-map'), require('react-syntax-highlighter'), require('react-syntax-highlighter/dist/styles'), require('./consts'), require('./db'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.React, global.terminalInReact, global.coreDecorators, global.memoizerific, global.langMap, global.reactSyntaxHighlighter, global.styles, global.consts, global.db);
    global.indexDb = mod.exports;
  }
})(this, function (exports, _react, _terminalInReact, _coreDecorators, _memoizerific, _langMap, _reactSyntaxHighlighter, _styles, _consts, _db) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = configPlugin;

  var _react2 = _interopRequireDefault(_react);

  var _memoizerific2 = _interopRequireDefault(_memoizerific);

  var _langMap2 = _interopRequireDefault(_langMap);

  var _reactSyntaxHighlighter2 = _interopRequireDefault(_reactSyntaxHighlighter);

  var syntaxStyles = _interopRequireWildcard(_styles);

  var _db2 = _interopRequireDefault(_db);

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

  var _slicedToArray = function () {
    function sliceIterator(arr, i) {
      var _arr = [];
      var _n = true;
      var _d = false;
      var _e = undefined;

      try {
        for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);

          if (i && _arr.length === i) break;
        }
      } catch (err) {
        _d = true;
        _e = err;
      } finally {
        try {
          if (!_n && _i["return"]) _i["return"]();
        } finally {
          if (_d) throw _e;
        }
      }

      return _arr;
    }

    return function (arr, i) {
      if (Array.isArray(arr)) {
        return arr;
      } else if (Symbol.iterator in Object(arr)) {
        return sliceIterator(arr, i);
      } else {
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
      }
    };
  }();

  var HOME_PATH = ['', 'home', 'user'];

  function last(ary) {
    return ary[ary.length - 1];
  }

  function parentFolderPath(path) {
    var len = path.length;
    if (len - 1 <= 0) {
      return { parts: [], isRoot: true, isDir: true };
    }
    return { parts: path.slice(0, len - 1), isRoot: true, isDir: true };
  }

  function configPlugin() {
    var _dec, _class, _desc, _value, _class2, _class3, _temp;

    var pathSeporator = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '/';
    var clearDbOnStart = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    var _dbCreator = (0, _db2.default)(pathSeporator, clearDbOnStart),
        _dbCreator2 = _slicedToArray(_dbCreator, 3),
        db = _dbCreator2[0],
        Folder = _dbCreator2[1],
        File = _dbCreator2[2];

    function pathFromArgs(args) {
      var dir = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      var path = args._.join(' ').trim();
      if (dir && last(path) !== pathSeporator) {
        path += pathSeporator;
      } else if (!dir && last(path) === pathSeporator) {
        path = path.slice(0, path.length - 1);
      }
      return path;
    }

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

    function editOrCreateFolder(parent, name) {
      db.folders.where('fullPath').equals(parent.fullPath + name + pathSeporator).count(function (count) {
        if (count === 0) {
          db.folders.add(new Folder(name, parent));
        }
      });
    }

    function editOrCreateFile(parent, name, content) {
      var split = name.split('.');
      var extention = last(split);
      var filename = split.slice(0, split.length - 1).join('.');
      db.files.where('fullPath').equals(parent.fullPath + name).first(function (file) {
        if (typeof file === 'undefined') {
          db.files.add(new File(filename, extention, parent, content));
        } else {
          file.setContents(content);
        }
      });
    }

    function getFolder(path, cb) {
      var fullPath = toStringPath(path);
      db.folders.where('fullPath').equals(fullPath).first(cb);
    }

    function getFile(path, cb) {
      var fullPath = toStringPath(path);
      db.files.where('fullPath').equals(fullPath).first(cb);
    }

    function modifyFileSystem(_ref, data) {
      var parts = _ref.parts,
          isDir = _ref.isDir;

      if (parts.length > 0) {
        getFolder(parentFolderPath(parts), function (parent) {
          if (isDir) {
            editOrCreateFolder(parent, last(parts));
          } else {
            editOrCreateFile(parent, last(parts), data);
          }
        });
      }
    }

    function _getContents(path, cb) {
      var str = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      if (path.isDir) {
        getFolder(path, function (folder) {
          if (typeof folder === 'undefined') {
            cb(null);
          } else if (str) {
            db.folders.where('folderId').equals(folder.id).toArray(function (folders) {
              db.files.where('folderId').equals(folder.id).toArray(function (files) {
                cb([].concat(_toConsumableArray(folders), _toConsumableArray(files)));
              });
            });
          } else {
            cb(folder);
          }
        });
      } else {
        getFile(path, function (file) {
          if (typeof file === 'undefined') {
            cb(null);
          } else if (str) {
            cb(file.content);
          } else {
            cb(file);
          }
        });
      }
    }

    function removeFromFileSystem(path) {
      _getContents(path, function (item) {
        if (item !== null) {
          if (path.isDir) {
            if (!item.isBase) {
              db.folders.delete(item.id);
            }
          } else {
            db.files.delete(item.id);
          }
        }
      });
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
          cd: false,
          ls: false,
          rm: false,
          mkdir: false,
          touch: false,
          cat: false,
          echo: false
        };

        _this.getPublicMethods = function () {
          return {
            parsePath: _this.parsePath,
            isValidPath: _this.isValidPath,
            createDir: _this.createDir,
            createFile: _this.createFile,
            removeDir: _this.remove,
            removeFile: _this.remove,
            readDir: function readDir(path, cb) {
              return _this.getContents(path, cb, _consts.DIR, true);
            },
            readFile: function readFile(path, cb) {
              return _this.getContents(path, cb, _consts.FILE, true);
            },
            writeFile: _this.writeToFile,
            pathToString: toStringPath,
            types: {
              dir: _consts.DIR,
              file: _consts.FILE
            }
          };
        };

        _this.currentPath = '';
        window.commands = _this.getPublicMethods;
        window.pathFromArgs = pathFromArgs;
        window.getContents = _getContents;

        var _ = ['' + pathSeporator + HOME_PATH.join(pathSeporator) + pathSeporator];
        _this.enterDir().method({ _: _ });
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
        value: function isValidPath(path, cb) {
          var _this2 = this;

          var handleRes = function handleRes(res) {
            if (typeof res === 'undefined') {
              _this2.api.printLine('Not a valid path: ' + toStringPath(path));
              cb(false);
            } else {
              cb(true);
            }
          };
          if (path.isDir) {
            getFolder(path, handleRes);
          } else {
            getFile(path, handleRes);
          }
        }
      }, {
        key: 'getContents',
        value: function getContents(path, cb, type) {
          var str = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

          if (type === _consts.DIR && path.isDir || type === _consts.FILE && !path.isDir) {
            this.isValidPath(path, function (valid) {
              if (valid) {
                _getContents(path, cb, str);
              } else {
                cb(null);
              }
            });
          } else {
            cb(null);
          }
        }
      }, {
        key: 'enterDir',
        value: function enterDir() {
          var _this3 = this;

          return {
            method: function method(args) {
              if (args._.length > 0) {
                var newPath = _this3.parsePath(pathFromArgs(args, true));
                _this3.isValidPath(newPath, function (valid) {
                  if (valid) {
                    _this3.currentPath = newPath;
                    _this3.api.setPromptPrefix(toStringPath(_this3.currentPath) + ' ');
                  }
                });
              }
            }
          };
        }
      }, {
        key: 'createDirCommand',
        value: function createDirCommand() {
          var _this4 = this;

          return {
            method: function method(args) {
              if (args._.length > 0) {
                var path = _this4.parsePath(pathFromArgs(args, true));
                _this4.createDir(path);
              }
            }
          };
        }
      }, {
        key: 'createDir',
        value: function createDir(path) {
          this.isValidPath(parentFolderPath(path.parts), function (valid) {
            if (valid) {
              modifyFileSystem(path);
            }
          });
        }
      }, {
        key: 'createFileCommand',
        value: function createFileCommand() {
          var _this5 = this;

          return {
            method: function method(args) {
              if (args._.length > 0) {
                var path = _this5.parsePath(pathFromArgs(args));
                _this5.createFile(path);
              }
            }
          };
        }
      }, {
        key: 'createFile',
        value: function createFile(path) {
          this.isValidPath(parentFolderPath(path.parts), function (valid) {
            if (valid) {
              modifyFileSystem(path, '');
            }
          });
        }
      }, {
        key: 'remove',
        value: function remove(path) {
          this.validPath(path, function (valid) {
            if (valid) {
              removeFromFileSystem(path);
            }
          });
        }
      }, {
        key: 'removeFromFileSystemCommand',
        value: function removeFromFileSystemCommand() {
          var _this6 = this;

          return {
            method: function method(args) {
              if (args._.length > 0) {
                var path = _this6.parsePath(args._.join(' ').trim());
                _this6.validPath(path, function (valid) {
                  if (valid) {
                    if (path.isDir) {
                      _this6.getContents(path, function (contents) {
                        if (contents.length > 0 && !args.recursive) {
                          _this6.api.printLine(toStringPath(path) + ' is not empty');
                        } else if (contents.length > 0 && !args.force) {
                          _this6.api.printLine(toStringPath(path) + ' is not empty');
                        } else {
                          _this6.remove(path);
                        }
                      }, _consts.DIR, true);
                    } else {
                      _this6.remove(path);
                    }
                  }
                });
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
          var _this7 = this;

          return {
            method: function method(args) {
              if (args._.length > 0) {
                var split = args._;
                if (args._.indexOf('>>') > 0) {
                  split = args._.join(' ').split('>>');
                }
                var pathA = _this7.parsePath(pathFromArgs({ _: split[0].split(' ') }));
                _this7.getContents(pathA, function (fileA) {
                  if (fileA !== null) {
                    if (args._.indexOf('>>') > 0) {
                      var pathB = _this7.parsePath(pathFromArgs({ _: split[1].split(' ') }));
                      _this7.writeToFile(pathB, fileA.content, { flag: 'a' });
                    } else {
                      var lang = _langMap2.default.languages(fileA.extention || '')[0];
                      _this7.api.printLine(_react2.default.createElement(
                        _reactSyntaxHighlighter2.default,
                        { language: lang, style: syntaxStyles[lang] },
                        fileA.content
                      ));
                    }
                  }
                }, _consts.FILE);
              }
            }
          };
        }
      }, {
        key: 'runEcho',
        value: function runEcho() {
          var _this8 = this;

          return {
            method: function method(args) {
              if (args._.length > 0) {
                if (args._.indexOf('>>') > -1) {
                  var split = args._.join(' ').split(' >> ');
                  var path = _this8.parsePath(pathFromArgs({ _: split[1].split(' ') }));
                  _this8.writeToFile(path, split[0], { flag: 'a' });
                } else {
                  _this8.api.printLine(args._.join(' '));
                }
              }
            }
          };
        }
      }, {
        key: 'writeToFile',
        value: function writeToFile(path) {
          var _this9 = this;

          var contents = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
          var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : { flag: 'w' };

          this.isValidPath(path, function (valid) {
            if (valid) {
              _this9.getContents(path, function (file) {
                if (file !== null) {
                  var content = file;
                  if (options.flag === 'w') {
                    content = '' + contents;
                  } else if (options.flag === 'a') {
                    content += '\n' + contents;
                  }
                  modifyFileSystem(path, content);
                }
              }, _consts.FILE, true);
            }
          });
        }
      }, {
        key: 'listDirContents',
        value: function listDirContents() {
          var _this10 = this;

          return {
            method: function method(args) {
              var path = _this10.parsePath(pathFromArgs({ _: args._.length > 0 ? args._ : ['.'] }, true));
              if (path.isDir) {
                _this10.getContents(path, function (dir) {
                  if (dir !== null) {
                    var contents = [{
                      path: '.',
                      type: _consts.DIR
                    }, {
                      path: '..',
                      type: _consts.DIR
                    }].concat(_toConsumableArray(dir));
                    _this10.api.printLine(_react2.default.createElement(
                      'span',
                      null,
                      contents.map(function (item) {
                        var styles = {
                          color: '#bdc3c7',
                          marginRight: 5,
                          width: 'calc(33% - 5px)',
                          display: 'inline-block'
                        };
                        if (contents.length > 3) {
                          styles.marginBottom = 5;
                        }
                        if (item.type === _consts.DIR) {
                          styles.color = '#2980b9';
                        }
                        return _react2.default.createElement(
                          'span',
                          {
                            style: styles,
                            title: item.type.toUpperCase(),
                            key: item.fullPath + '-' + item.type
                          },
                          item.type === _consts.DIR ? item.path : item.getFullName()
                        );
                      })
                    ));
                  }
                }, _consts.DIR, true);
              }
            }
          };
        }
      }]);

      return PseudoFileSystem;
    }(_terminalInReact.PluginBase), _class3.displayName = _consts.displayName, _class3.version = _consts.version, _temp), (_applyDecoratedDescriptor(_class2.prototype, 'doParse', [_dec], Object.getOwnPropertyDescriptor(_class2.prototype, 'doParse'), _class2.prototype)), _class2)) || _class);


    return PseudoFileSystem;
  }
});