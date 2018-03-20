/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const DOMNodeCollection = __webpack_require__(1);
const _docReadyCBs = [];
let _docReady = false;

window.$l = (el) => {
  switch (typeof el) {
    case "function":
      return handleFunction(el);
    case "string":
      return getNodes(el);
    case "object":
    if (el instanceof HTMLElement) {
      return new DomNodeCollection([el]);
    }
  }
};

handleFunction = (func) => {
  if (!_docReady) {
    _docReadyCallbacks.push(func);
  } else {
    func();
  }
};

getNodes = (selector) => {
  const nodes = document.querySelectorAll(selector);
  const nodesArray = Array.from(nodes);
  return new DomNodeCollection(nodesArray);
};

$l.extend = function () {
  const base = arguments[0];
  Array.from(arguments).slice(1).forEach(obj => {
    Object.keys(obj).forEach(key => {
      base[key] = obj[key];
    });
  });
  return base;
};

$l.ajax = function(options) {
  const req = new XMLHTTPRequest();
    const defaults = {
      url: "",
      method: 'GET',
      contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
      data: {},
      success: () => {},
      error: () => {}
    };
};

document.addEventListener('DOMContentLoaded', () => {
  _docReady = true;
  _docReadyCBs.forEach(func => func());
});


/***/ }),
/* 1 */
/***/ (function(module, exports) {

class DOMNodeCollection {
  constructor(arr) {
    this.arr = arr;
  }

  html(element) {
    if (typeof element === "string") {
      this.arr.forEach((el) => {
        el.innerHTML = element;
      });
    } else if(this.arr.length > 0) {
      return this.arr[0].innerHTML;
    }
  }

  empty() {
    this.arr.forEach(el => el.innerHTML = "");
  }

  append(child) {
    if (typeof child === "object" && !(children instanceof DomNodeCollection)) {
      child = $l(child);
    }

    if (typeof child === "string") {
       this.arr.forEach((el) => {
       el.innerHTML += child;
     });
   } else if (child instanceof DomNodeCollection) {
         this.arr.forEach((el) => {
         child.each((childNode) => {
         el.appendChild(childNode.cloneNode(true));
         });
       });
     }
  }

  children() {
    const result = [];
    this.arr.forEach(el => {
      Array.from(el.children).forEach(child => result.push(child));
    });
    return new DOMNodeCollection(result);
  }

  parent() {
    const result = [];
    this.arr.forEach(el => {
      result.push(el.parentNode);
    });
    return new DOMNodeCollection(result);
  }

  find(selector) {
    const result = [];

    this.arr.forEach(child => {
      Array.from(child.querySelectorAll(selector)).forEach(el => result.push(el));
    });
    return new DOMNodeCollection(result);
  }

  remove() {
    this.arr.forEach(el => el.remove());
    this.arr = [];
  }

  on(e, callback) {
    this.arr.forEach((el) => {
      el.addEventListener(e, callback);
      const key = `${e}`;
      if (typeof el[key] === "undefined") {
        el[key] = [];
      }
      el[key].push(callback);
    });
  }

  off(e) {
    this.arr.forEach((el) => {
      const key = `${e}`;
      if (el[key]) {
        el[key].forEach((callback) => {
          el.removeEventListener(e, callback);
        });
      }
      el[key] = [];
    });
  }
}

module.exports = DOMNodeCollection;


/***/ })
/******/ ]);