(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'dexie', 'core-decorators', './consts'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('dexie'), require('core-decorators'), require('./consts'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.dexie, global.coreDecorators, global.consts);
    global.db = mod.exports;
  }
})(this, function (exports, _dexie, _coreDecorators, _consts) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  exports.default = function (pathSeporator, clear) {
    if (clear) {
      _dexie2.default.delete(_consts.STORAGE_KEY);
    }

    var _defineDB = defineDB(pathSeporator),
        _defineDB2 = _slicedToArray(_defineDB, 3),
        db = _defineDB2[0],
        Folder = _defineDB2[1],
        File = _defineDB2[2];

    db.folders.count(function (count) {
      if (count === 0) {
        db.folders.add(new Folder('', { fullPath: '' }, true));
        db.folders.toCollection().first().then(function (item) {
          db.folders.add(new Folder('home', item));
          db.folders.add(new Folder('user', { fullPath: item.fullPath + 'home' + pathSeporator, id: item.id + 1 }));
        });
      }
    });

    return [db, Folder, File];
  };

  var _dexie2 = _interopRequireDefault(_dexie);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
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

  function defineDB(pathSeporator) {
    var _class, _class2;

    var db = new _dexie2.default(_consts.STORAGE_KEY);

    db.version(1).stores({
      folders: '++id,&[id+path],folderId,fullPath',
      files: '++id,&[folderId+filename],filename,extension,folderId,fullPath'
    });

    var Folder = (0, _coreDecorators.autobind)(_class = function () {
      function Folder(path) {
        var parentFolder = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { fullPath: '' };
        var base = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

        _classCallCheck(this, Folder);

        this.path = path;
        this.fullPath = parentFolder.fullPath + path + pathSeporator;
        this.folderId = parentFolder.id;
        this.type = _consts.DIR;
        this.isBase = base;
      }

      _createClass(Folder, [{
        key: 'save',
        value: function save() {
          return db.folders.put(this);
        }
      }]);

      return Folder;
    }()) || _class;

    var File = (0, _coreDecorators.autobind)(_class2 = function () {
      function File(filename, extention, parentFolder) {
        var contents = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';

        _classCallCheck(this, File);

        this.fullPath = parentFolder.fullPath + filename + '.' + extention;
        this.filename = filename;
        this.extention = extention;
        this.folderId = parentFolder.id;
        this.content = contents;
        this.type = _consts.FILE;
      }

      _createClass(File, [{
        key: 'setContents',
        value: function setContents() {
          var contents = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

          this.content = contents;
          this.save();
        }
      }, {
        key: 'getFullName',
        value: function getFullName() {
          return (this.filename || '') + (this.extention ? '.' : '') + (this.extention || '');
        }
      }, {
        key: 'save',
        value: function save() {
          return db.files.put(this);
        }
      }]);

      return File;
    }()) || _class2;

    db.folders.mapToClass(Folder);
    db.files.mapToClass(File);

    return [db, Folder, File];
  }
});