(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.consts = mod.exports;
  }
})(this, function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var version = exports.version = '3.0.0';
  var displayName = exports.displayName = 'PseudoFileSystem';
  var CURRENT_DIR = exports.CURRENT_DIR = '.';
  var PARENT_DIR = exports.PARENT_DIR = '..';
  var HOME_DIR = exports.HOME_DIR = '~';
  var STORAGE_KEY = exports.STORAGE_KEY = 'TERMINAL_IN_REACT_PSEUDO_FILESYSTEM';
  var DIR = exports.DIR = 'dir';
  var FILE = exports.FILE = 'file';
});