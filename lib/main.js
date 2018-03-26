// const DOMNodeCollection = require('./dom_node_collection');
import DOMNodeCollection from './dom_node_collection';
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
      return new DOMNodeCollection([el]);
    }
  }
};

const handleFunction = (func) => {
  if (!_docReady) {
    _docReadyCallbacks.push(func);
  } else {
    func();
  }
};

const getNodes = (selector) => {
  const nodes = document.querySelectorAll(selector);
  const nodesArray = Array.from(nodes);
  return new DOMNodeCollection(nodesArray);
};

$l.extend = (base, ...addObjects) => {
  addObjects.forEach((obj) => {
    Object.keys(obj).forEach((key) => {
      base[key] = obj[key];
    });
  });
  return base;
};

$l.ajax = (options) => {
  const request = new XMLHTTPRequest();
    const defaults = {
      url: "",
      method: 'GET',
      contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
      data: {},
      success: () => {},
      error: () => {}
    };
    options = $l.extend(defaults, options);

    if (options.method.toUpperCase() === "GET"){
      options.url += "?" + toQueryString(options.data);
    }

    request.open(options.method, options.url, true);
    request.onload = event => {
    if (request.status === 200) {
      options.success(request.response);
    } else {
      options.error(request.reponse);
    }
  };

  request.send(JSON.stringify(options.data));
};

const toQueryString = (obj) => {
  let result = "";
  for (const prop in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, prop)) {
      result += `${prop}=${obj[prop]}&`;
    }
  }
  return result.substring(0, result.length - 1);
};

document.addEventListener('DOMContentLoaded', () => {
  _docReady = true;
  _docReadyCBs.forEach(func => func());
});
