class DOMNodeCollection {
  constructor(arr) {
    this.arr = arr;
  }

  html(string) {
    if (typeof string === "string") {
      this.arr.forEach((el) => {
        el.innerHTML = string;
      });
    } else if(this.arr.length > 0) {
      return this.arr[0].innerHTML;
    }
  }

  empty() {
    this.arr.forEach(el => el.innerHTML = "");
  }

  append(child) {
    if (typeof child === "string") {
       this.arr.forEach((el) => {
       el.innerHTML += child;
     });
   } else if (child instanceof DomNodeCollection) {
         this.arr.forEach((el) => {
         child.arr.forEach((childNode) => {
         el.appendChild(childNode.cloneNode(true));
         });
       });
     }
  }

  attr(name, value) {
    if(!value) {
      return this.arr[0].getAttribute(name);
    } else {
      this.arr.forEach((el) => {
        el.setAttribute(name, value);
      });
    }
  }

  addClass(string) {
    this.arr.forEach((el) => {
      el.classList.add(string);
    })
  }

  removeClass(string) {
    this.arr.forEach((el) => {
      el.classList.remove(string);
    })
  }

  toggleClass(string) {
    this.arr.forEach((el) => {
      el.classList.toggle(string);
    })
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
      const eventType = `event-${e}`;
      if (typeof el[eventType] === "undefined") {
        el[eventType] = [];
      }
      el[eventType].push(callback);
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

// module.exports = DOMNodeCollection;
export default DOMNodeCollection;
