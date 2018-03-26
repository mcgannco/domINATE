## domINATE

domINATE is a Javascript DOM manipulation library built with vanilla Javascript and the native DOM API.

Live Demonstration: https://mcgannco.github.io/domINATE/
***
#### Functionality:
* Select / manipulate DOM elements
* Create / destroy DOM elements
* Make AJAX requests
***
#### Getting Started:
To incorporate domINATE in your project, first download or clone the Git repo.  Then use webpack to bundle the component files, and finally add the following script to the head tag of your HTML document.

```javascript
<script type="text/javascript" src="./lib/domINATE.js"></script>
```

#### Core Function ($l)

domINATE uses its core function $l, which takes a single argument (function, CSS selector, or HTML element)

###### Passed A Function
* The passed function is queued in an array until DOMContentLoaded invokes the stored functions

###### Passed A CSS Selector
* Returns a DOMNodeCollection of HTMLElements that match the selector

###### Passed A HTML Element
* Returns a DOMNodeCollection object / API
***
#### domINATE Object API
###### children()
Returns an array containing the  child elements of DOM elements

###### parent()
Returns an array containing the  parent elements of DOM elements

###### html(string)
If passed a string, each HTML element in the DomNodeCollection's innerHTML is set to that respective string.  If a string is not passed, the first HTMLElement's innerHTML in the DOMNodeCollection is returned

###### empty()
Erases each DOMNodeCollection elements innerHTML

###### append(el)
Adds argument passed in (if a string or HTML Element) to each element in the collection

###### remove(el)
Removes element from the DOMNodeCollection

###### find(selector)
Returns DOM elements by CSS selector

###### on(e, callback)
Adds an event listener to DOM elements

###### off(e, callback)
Removes an event listener to DOM elements

###### $l.ajax()
Leverages the XMLHTTPRequest API to send and receive data from a server. Default function is a GET request.
