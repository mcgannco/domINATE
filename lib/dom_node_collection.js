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
