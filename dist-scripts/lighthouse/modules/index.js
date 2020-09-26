"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lighthouse = require("./lighthouse");

Object.keys(_lighthouse).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _lighthouse[key];
    }
  });
});

var _browser = require("./browser");

Object.keys(_browser).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _browser[key];
    }
  });
});