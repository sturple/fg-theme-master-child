 /*!
  * Isotope PACKAGED v2.2.2
  *
  * Licensed GPLv3 for open source use
  * or Isotope Commercial License for commercial use
  *
  * http://isotope.metafizzy.co
  * Copyright 2015 Metafizzy
  */

 ! function(a) {
   function b() {}

   function c(a) {
     function c(b) {
       b.prototype.option || (b.prototype.option = function(b) {
         a.isPlainObject(b) && (this.options = a.extend(!0, this.options, b))
       })
     }

     function e(b, c) {
       a.fn[b] = function(e) {
         if ("string" == typeof e) {
           for (var g = d.call(arguments, 1), h = 0, i = this.length; i > h; h++) {
             var j = this[h],
               k = a.data(j, b);
             if (k)
               if (a.isFunction(k[e]) && "_" !== e.charAt(0)) {
                 var l = k[e].apply(k, g);
                 if (void 0 !== l) return l
               } else f("no such method '" + e + "' for " + b + " instance");
             else f("cannot call methods on " + b + " prior to initialization; attempted to call '" + e + "'")
           }
           return this
         }
         return this.each(function() {
           var d = a.data(this, b);
           d ? (d.option(e), d._init()) : (d = new c(this, e), a.data(this, b, d))
         })
       }
     }
     if (a) {
       var f = "undefined" == typeof console ? b : function(a) {
         console.error(a)
       };
       return a.bridget = function(a, b) {
         c(b), e(a, b)
       }, a.bridget
     }
   }
   var d = Array.prototype.slice;
   "function" == typeof define && define.amd ? define("jquery-bridget/jquery.bridget", ["jquery"], c) : c("object" == typeof exports ? require("jquery") : a.jQuery)
 }(window),
 function(a) {
   function b(b) {
     var c = a.event;
     return c.target = c.target || c.srcElement || b, c
   }
   var c = document.documentElement,
     d = function() {};
   c.addEventListener ? d = function(a, b, c) {
     a.addEventListener(b, c, !1)
   } : c.attachEvent && (d = function(a, c, d) {
     a[c + d] = d.handleEvent ? function() {
       var c = b(a);
       d.handleEvent.call(d, c)
     } : function() {
       var c = b(a);
       d.call(a, c)
     }, a.attachEvent("on" + c, a[c + d])
   });
   var e = function() {};
   c.removeEventListener ? e = function(a, b, c) {
     a.removeEventListener(b, c, !1)
   } : c.detachEvent && (e = function(a, b, c) {
     a.detachEvent("on" + b, a[b + c]);
     try {
       delete a[b + c]
     } catch (d) {
       a[b + c] = void 0
     }
   });
   var f = {
     bind: d,
     unbind: e
   };
   "function" == typeof define && define.amd ? define("eventie/eventie", f) : "object" == typeof exports ? module.exports = f : a.eventie = f
 }(window),
 function() {
   "use strict";

   function a() {}

   function b(a, b) {
     for (var c = a.length; c--;)
       if (a[c].listener === b) return c;
     return -1
   }

   function c(a) {
     return function() {
       return this[a].apply(this, arguments)
     }
   }
   var d = a.prototype,
     e = this,
     f = e.EventEmitter;
   d.getListeners = function(a) {
     var b, c, d = this._getEvents();
     if (a instanceof RegExp) {
       b = {};
       for (c in d) d.hasOwnProperty(c) && a.test(c) && (b[c] = d[c])
     } else b = d[a] || (d[a] = []);
     return b
   }, d.flattenListeners = function(a) {
     var b, c = [];
     for (b = 0; b < a.length; b += 1) c.push(a[b].listener);
     return c
   }, d.getListenersAsObject = function(a) {
     var b, c = this.getListeners(a);
     return c instanceof Array && (b = {}, b[a] = c), b || c
   }, d.addListener = function(a, c) {
     var d, e = this.getListenersAsObject(a),
       f = "object" == typeof c;
     for (d in e) e.hasOwnProperty(d) && -1 === b(e[d], c) && e[d].push(f ? c : {
       listener: c,
       once: !1
     });
     return this
   }, d.on = c("addListener"), d.addOnceListener = function(a, b) {
     return this.addListener(a, {
       listener: b,
       once: !0
     })
   }, d.once = c("addOnceListener"), d.defineEvent = function(a) {
     return this.getListeners(a), this
   }, d.defineEvents = function(a) {
     for (var b = 0; b < a.length; b += 1) this.defineEvent(a[b]);
     return this
   }, d.removeListener = function(a, c) {
     var d, e, f = this.getListenersAsObject(a);
     for (e in f) f.hasOwnProperty(e) && (d = b(f[e], c), -1 !== d && f[e].splice(d, 1));
     return this
   }, d.off = c("removeListener"), d.addListeners = function(a, b) {
     return this.manipulateListeners(!1, a, b)
   }, d.removeListeners = function(a, b) {
     return this.manipulateListeners(!0, a, b)
   }, d.manipulateListeners = function(a, b, c) {
     var d, e, f = a ? this.removeListener : this.addListener,
       g = a ? this.removeListeners : this.addListeners;
     if ("object" != typeof b || b instanceof RegExp)
       for (d = c.length; d--;) f.call(this, b, c[d]);
     else
       for (d in b) b.hasOwnProperty(d) && (e = b[d]) && ("function" == typeof e ? f.call(this, d, e) : g.call(this, d, e));
     return this
   }, d.removeEvent = function(a) {
     var b, c = typeof a,
       d = this._getEvents();
     if ("string" === c) delete d[a];
     else if (a instanceof RegExp)
       for (b in d) d.hasOwnProperty(b) && a.test(b) && delete d[b];
     else delete this._events;
     return this
   }, d.removeAllListeners = c("removeEvent"), d.emitEvent = function(a, b) {
     var c, d, e, f, g = this.getListenersAsObject(a);
     for (e in g)
       if (g.hasOwnProperty(e))
         for (d = g[e].length; d--;) c = g[e][d], c.once === !0 && this.removeListener(a, c.listener), f = c.listener.apply(this, b || []), f === this._getOnceReturnValue() && this.removeListener(a, c.listener);
     return this
   }, d.trigger = c("emitEvent"), d.emit = function(a) {
     var b = Array.prototype.slice.call(arguments, 1);
     return this.emitEvent(a, b)
   }, d.setOnceReturnValue = function(a) {
     return this._onceReturnValue = a, this
   }, d._getOnceReturnValue = function() {
     return this.hasOwnProperty("_onceReturnValue") ? this._onceReturnValue : !0
   }, d._getEvents = function() {
     return this._events || (this._events = {})
   }, a.noConflict = function() {
     return e.EventEmitter = f, a
   }, "function" == typeof define && define.amd ? define("eventEmitter/EventEmitter", [], function() {
     return a
   }) : "object" == typeof module && module.exports ? module.exports = a : e.EventEmitter = a
 }.call(this),
   function(a) {
     function b(a) {
       if (a) {
         if ("string" == typeof d[a]) return a;
         a = a.charAt(0).toUpperCase() + a.slice(1);
         for (var b, e = 0, f = c.length; f > e; e++)
           if (b = c[e] + a, "string" == typeof d[b]) return b
       }
     }
     var c = "Webkit Moz ms Ms O".split(" "),
       d = document.documentElement.style;
     "function" == typeof define && define.amd ? define("get-style-property/get-style-property", [], function() {
       return b
     }) : "object" == typeof exports ? module.exports = b : a.getStyleProperty = b
   }(window),
   function(a, b) {
     function c(a) {
       var b = parseFloat(a),
         c = -1 === a.indexOf("%") && !isNaN(b);
       return c && b
     }

     function d() {}

     function e() {
       for (var a = {
           width: 0,
           height: 0,
           innerWidth: 0,
           innerHeight: 0,
           outerWidth: 0,
           outerHeight: 0
         }, b = 0, c = h.length; c > b; b++) {
         var d = h[b];
         a[d] = 0
       }
       return a
     }

     function f(b) {
       function d() {
         if (!m) {
           m = !0;
           var d = a.getComputedStyle;
           if (j = function() {
               var a = d ? function(a) {
                 return d(a, null)
               } : function(a) {
                 return a.currentStyle
               };
               return function(b) {
                 var c = a(b);
                 return c || g("Style returned " + c + ". Are you running this code in a hidden iframe on Firefox? See http://bit.ly/getsizebug1"), c
               }
             }(), k = b("boxSizing")) {
             var e = document.createElement("div");
             e.style.width = "200px", e.style.padding = "1px 2px 3px 4px", e.style.borderStyle = "solid", e.style.borderWidth = "1px 2px 3px 4px", e.style[k] = "border-box";
             var f = document.body || document.documentElement;
             f.appendChild(e);
             var h = j(e);
             l = 200 === c(h.width), f.removeChild(e)
           }
         }
       }

       function f(a) {
         if (d(), "string" == typeof a && (a = document.querySelector(a)), a && "object" == typeof a && a.nodeType) {
           var b = j(a);
           if ("none" === b.display) return e();
           var f = {};
           f.width = a.offsetWidth, f.height = a.offsetHeight;
           for (var g = f.isBorderBox = !(!k || !b[k] || "border-box" !== b[k]), m = 0, n = h.length; n > m; m++) {
             var o = h[m],
               p = b[o];
             p = i(a, p);
             var q = parseFloat(p);
             f[o] = isNaN(q) ? 0 : q
           }
           var r = f.paddingLeft + f.paddingRight,
             s = f.paddingTop + f.paddingBottom,
             t = f.marginLeft + f.marginRight,
             u = f.marginTop + f.marginBottom,
             v = f.borderLeftWidth + f.borderRightWidth,
             w = f.borderTopWidth + f.borderBottomWidth,
             x = g && l,
             y = c(b.width);
           y !== !1 && (f.width = y + (x ? 0 : r + v));
           var z = c(b.height);
           return z !== !1 && (f.height = z + (x ? 0 : s + w)), f.innerWidth = f.width - (r + v), f.innerHeight = f.height - (s + w), f.outerWidth = f.width + t, f.outerHeight = f.height + u, f
         }
       }

       function i(b, c) {
         if (a.getComputedStyle || -1 === c.indexOf("%")) return c;
         var d = b.style,
           e = d.left,
           f = b.runtimeStyle,
           g = f && f.left;
         return g && (f.left = b.currentStyle.left), d.left = c, c = d.pixelLeft, d.left = e, g && (f.left = g), c
       }
       var j, k, l, m = !1;
       return f
     }
     var g = "undefined" == typeof console ? d : function(a) {
         console.error(a)
       },
       h = ["paddingLeft", "paddingRight", "paddingTop", "paddingBottom", "marginLeft", "marginRight", "marginTop", "marginBottom", "borderLeftWidth", "borderRightWidth", "borderTopWidth", "borderBottomWidth"];
     "function" == typeof define && define.amd ? define("get-size/get-size", ["get-style-property/get-style-property"], f) : "object" == typeof exports ? module.exports = f(require("desandro-get-style-property")) : a.getSize = f(a.getStyleProperty)
   }(window),
   function(a) {
     function b(a) {
       "function" == typeof a && (b.isReady ? a() : g.push(a))
     }

     function c(a) {
       var c = "readystatechange" === a.type && "complete" !== f.readyState;
       b.isReady || c || d()
     }

     function d() {
       b.isReady = !0;
       for (var a = 0, c = g.length; c > a; a++) {
         var d = g[a];
         d()
       }
     }

     function e(e) {
       return "complete" === f.readyState ? d() : (e.bind(f, "DOMContentLoaded", c), e.bind(f, "readystatechange", c), e.bind(a, "load", c)), b
     }
     var f = a.document,
       g = [];
     b.isReady = !1, "function" == typeof define && define.amd ? define("doc-ready/doc-ready", ["eventie/eventie"], e) : "object" == typeof exports ? module.exports = e(require("eventie")) : a.docReady = e(a.eventie)
   }(window),
   function(a) {
     "use strict";

     function b(a, b) {
       return a[g](b)
     }

     function c(a) {
       if (!a.parentNode) {
         var b = document.createDocumentFragment();
         b.appendChild(a)
       }
     }

     function d(a, b) {
       c(a);
       for (var d = a.parentNode.querySelectorAll(b), e = 0, f = d.length; f > e; e++)
         if (d[e] === a) return !0;
       return !1
     }

     function e(a, d) {
       return c(a), b(a, d)
     }
     var f, g = function() {
       if (a.matches) return "matches";
       if (a.matchesSelector) return "matchesSelector";
       for (var b = ["webkit", "moz", "ms", "o"], c = 0, d = b.length; d > c; c++) {
         var e = b[c],
           f = e + "MatchesSelector";
         if (a[f]) return f
       }
     }();
     if (g) {
       var h = document.createElement("div"),
         i = b(h, "div");
       f = i ? b : e
     } else f = d;
     "function" == typeof define && define.amd ? define("matches-selector/matches-selector", [], function() {
       return f
     }) : "object" == typeof exports ? module.exports = f : window.matchesSelector = f
   }(Element.prototype),
   function(a, b) {
     "use strict";
     "function" == typeof define && define.amd ? define("fizzy-ui-utils/utils", ["doc-ready/doc-ready", "matches-selector/matches-selector"], function(c, d) {
       return b(a, c, d)
     }) : "object" == typeof exports ? module.exports = b(a, require("doc-ready"), require("desandro-matches-selector")) : a.fizzyUIUtils = b(a, a.docReady, a.matchesSelector)
   }(window, function(a, b, c) {
     var d = {};
     d.extend = function(a, b) {
       for (var c in b) a[c] = b[c];
       return a
     }, d.modulo = function(a, b) {
       return (a % b + b) % b
     };
     var e = Object.prototype.toString;
     d.isArray = function(a) {
       return "[object Array]" == e.call(a)
     }, d.makeArray = function(a) {
       var b = [];
       if (d.isArray(a)) b = a;
       else if (a && "number" == typeof a.length)
         for (var c = 0, e = a.length; e > c; c++) b.push(a[c]);
       else b.push(a);
       return b
     }, d.indexOf = Array.prototype.indexOf ? function(a, b) {
       return a.indexOf(b)
     } : function(a, b) {
       for (var c = 0, d = a.length; d > c; c++)
         if (a[c] === b) return c;
       return -1
     }, d.removeFrom = function(a, b) {
       var c = d.indexOf(a, b); - 1 != c && a.splice(c, 1)
     }, d.isElement = "function" == typeof HTMLElement || "object" == typeof HTMLElement ? function(a) {
       return a instanceof HTMLElement
     } : function(a) {
       return a && "object" == typeof a && 1 == a.nodeType && "string" == typeof a.nodeName
     }, d.setText = function() {
       function a(a, c) {
         b = b || (void 0 !== document.documentElement.textContent ? "textContent" : "innerText"), a[b] = c
       }
       var b;
       return a
     }(), d.getParent = function(a, b) {
       for (; a != document.body;)
         if (a = a.parentNode, c(a, b)) return a
     }, d.getQueryElement = function(a) {
       return "string" == typeof a ? document.querySelector(a) : a
     }, d.handleEvent = function(a) {
       var b = "on" + a.type;
       this[b] && this[b](a)
     }, d.filterFindElements = function(a, b) {
       a = d.makeArray(a);
       for (var e = [], f = 0, g = a.length; g > f; f++) {
         var h = a[f];
         if (d.isElement(h))
           if (b) {
             c(h, b) && e.push(h);
             for (var i = h.querySelectorAll(b), j = 0, k = i.length; k > j; j++) e.push(i[j])
           } else e.push(h)
       }
       return e
     }, d.debounceMethod = function(a, b, c) {
       var d = a.prototype[b],
         e = b + "Timeout";
       a.prototype[b] = function() {
         var a = this[e];
         a && clearTimeout(a);
         var b = arguments,
           f = this;
         this[e] = setTimeout(function() {
           d.apply(f, b), delete f[e]
         }, c || 100)
       }
     }, d.toDashed = function(a) {
       return a.replace(/(.)([A-Z])/g, function(a, b, c) {
         return b + "-" + c
       }).toLowerCase()
     };
     var f = a.console;
     return d.htmlInit = function(c, e) {
       b(function() {
         for (var b = d.toDashed(e), g = document.querySelectorAll(".js-" + b), h = "data-" + b + "-options", i = 0, j = g.length; j > i; i++) {
           var k, l = g[i],
             m = l.getAttribute(h);
           try {
             k = m && JSON.parse(m)
           } catch (n) {
             f && f.error("Error parsing " + h + " on " + l.nodeName.toLowerCase() + (l.id ? "#" + l.id : "") + ": " + n);
             continue
           }
           var o = new c(l, k),
             p = a.jQuery;
           p && p.data(l, e, o)
         }
       })
     }, d
   }),
   function(a, b) {
     "use strict";
     "function" == typeof define && define.amd ? define("outlayer/item", ["eventEmitter/EventEmitter", "get-size/get-size", "get-style-property/get-style-property", "fizzy-ui-utils/utils"], function(c, d, e, f) {
       return b(a, c, d, e, f)
     }) : "object" == typeof exports ? module.exports = b(a, require("wolfy87-eventemitter"), require("get-size"), require("desandro-get-style-property"), require("fizzy-ui-utils")) : (a.Outlayer = {}, a.Outlayer.Item = b(a, a.EventEmitter, a.getSize, a.getStyleProperty, a.fizzyUIUtils))
   }(window, function(a, b, c, d, e) {
     "use strict";

     function f(a) {
       for (var b in a) return !1;
       return b = null, !0
     }

     function g(a, b) {
       a && (this.element = a, this.layout = b, this.position = {
         x: 0,
         y: 0
       }, this._create())
     }

     function h(a) {
       return a.replace(/([A-Z])/g, function(a) {
         return "-" + a.toLowerCase()
       })
     }
     var i = a.getComputedStyle,
       j = i ? function(a) {
         return i(a, null)
       } : function(a) {
         return a.currentStyle
       },
       k = d("transition"),
       l = d("transform"),
       m = k && l,
       n = !!d("perspective"),
       o = {
         WebkitTransition: "webkitTransitionEnd",
         MozTransition: "transitionend",
         OTransition: "otransitionend",
         transition: "transitionend"
       }[k],
       p = ["transform", "transition", "transitionDuration", "transitionProperty"],
       q = function() {
         for (var a = {}, b = 0, c = p.length; c > b; b++) {
           var e = p[b],
             f = d(e);
           f && f !== e && (a[e] = f)
         }
         return a
       }();
     e.extend(g.prototype, b.prototype), g.prototype._create = function() {
       this._transn = {
         ingProperties: {},
         clean: {},
         onEnd: {}
       }, this.css({
         position: "absolute"
       })
     }, g.prototype.handleEvent = function(a) {
       var b = "on" + a.type;
       this[b] && this[b](a)
     }, g.prototype.getSize = function() {
       this.size = c(this.element)
     }, g.prototype.css = function(a) {
       var b = this.element.style;
       for (var c in a) {
         var d = q[c] || c;
         b[d] = a[c]
       }
     }, g.prototype.getPosition = function() {
       var a = j(this.element),
         b = this.layout.options,
         c = b.isOriginLeft,
         d = b.isOriginTop,
         e = a[c ? "left" : "right"],
         f = a[d ? "top" : "bottom"],
         g = this.layout.size,
         h = -1 != e.indexOf("%") ? parseFloat(e) / 100 * g.width : parseInt(e, 10),
         i = -1 != f.indexOf("%") ? parseFloat(f) / 100 * g.height : parseInt(f, 10);
       h = isNaN(h) ? 0 : h, i = isNaN(i) ? 0 : i, h -= c ? g.paddingLeft : g.paddingRight, i -= d ? g.paddingTop : g.paddingBottom, this.position.x = h, this.position.y = i
     }, g.prototype.layoutPosition = function() {
       var a = this.layout.size,
         b = this.layout.options,
         c = {},
         d = b.isOriginLeft ? "paddingLeft" : "paddingRight",
         e = b.isOriginLeft ? "left" : "right",
         f = b.isOriginLeft ? "right" : "left",
         g = this.position.x + a[d];
       c[e] = this.getXValue(g), c[f] = "";
       var h = b.isOriginTop ? "paddingTop" : "paddingBottom",
         i = b.isOriginTop ? "top" : "bottom",
         j = b.isOriginTop ? "bottom" : "top",
         k = this.position.y + a[h];
       c[i] = this.getYValue(k), c[j] = "", this.css(c), this.emitEvent("layout", [this])
     }, g.prototype.getXValue = function(a) {
       var b = this.layout.options;
       return b.percentPosition && !b.isHorizontal ? a / this.layout.size.width * 100 + "%" : a + "px"
     }, g.prototype.getYValue = function(a) {
       var b = this.layout.options;
       return b.percentPosition && b.isHorizontal ? a / this.layout.size.height * 100 + "%" : a + "px"
     }, g.prototype._transitionTo = function(a, b) {
       this.getPosition();
       var c = this.position.x,
         d = this.position.y,
         e = parseInt(a, 10),
         f = parseInt(b, 10),
         g = e === this.position.x && f === this.position.y;
       if (this.setPosition(a, b), g && !this.isTransitioning) return void this.layoutPosition();
       var h = a - c,
         i = b - d,
         j = {};
       j.transform = this.getTranslate(h, i), this.transition({
         to: j,
         onTransitionEnd: {
           transform: this.layoutPosition
         },
         isCleaning: !0
       })
     }, g.prototype.getTranslate = function(a, b) {
       var c = this.layout.options;
       return a = c.isOriginLeft ? a : -a, b = c.isOriginTop ? b : -b, n ? "translate3d(" + a + "px, " + b + "px, 0)" : "translate(" + a + "px, " + b + "px)"
     }, g.prototype.goTo = function(a, b) {
       this.setPosition(a, b), this.layoutPosition()
     }, g.prototype.moveTo = m ? g.prototype._transitionTo : g.prototype.goTo, g.prototype.setPosition = function(a, b) {
       this.position.x = parseInt(a, 10), this.position.y = parseInt(b, 10)
     }, g.prototype._nonTransition = function(a) {
       this.css(a.to), a.isCleaning && this._removeStyles(a.to);
       for (var b in a.onTransitionEnd) a.onTransitionEnd[b].call(this)
     }, g.prototype._transition = function(a) {
       if (!parseFloat(this.layout.options.transitionDuration)) return void this._nonTransition(a);
       var b = this._transn;
       for (var c in a.onTransitionEnd) b.onEnd[c] = a.onTransitionEnd[c];
       for (c in a.to) b.ingProperties[c] = !0, a.isCleaning && (b.clean[c] = !0);
       if (a.from) {
         this.css(a.from);
         var d = this.element.offsetHeight;
         d = null
       }
       this.enableTransition(a.to), this.css(a.to), this.isTransitioning = !0
     };
     var r = "opacity," + h(q.transform || "transform");
     g.prototype.enableTransition = function() {
       this.isTransitioning || (this.css({
         transitionProperty: r,
         transitionDuration: this.layout.options.transitionDuration
       }), this.element.addEventListener(o, this, !1))
     }, g.prototype.transition = g.prototype[k ? "_transition" : "_nonTransition"], g.prototype.onwebkitTransitionEnd = function(a) {
       this.ontransitionend(a)
     }, g.prototype.onotransitionend = function(a) {
       this.ontransitionend(a)
     };
     var s = {
       "-webkit-transform": "transform",
       "-moz-transform": "transform",
       "-o-transform": "transform"
     };
     g.prototype.ontransitionend = function(a) {
       if (a.target === this.element) {
         var b = this._transn,
           c = s[a.propertyName] || a.propertyName;
         if (delete b.ingProperties[c], f(b.ingProperties) && this.disableTransition(), c in b.clean && (this.element.style[a.propertyName] = "", delete b.clean[c]), c in b.onEnd) {
           var d = b.onEnd[c];
           d.call(this), delete b.onEnd[c]
         }
         this.emitEvent("transitionEnd", [this])
       }
     }, g.prototype.disableTransition = function() {
       this.removeTransitionStyles(), this.element.removeEventListener(o, this, !1), this.isTransitioning = !1
     }, g.prototype._removeStyles = function(a) {
       var b = {};
       for (var c in a) b[c] = "";
       this.css(b)
     };
     var t = {
       transitionProperty: "",
       transitionDuration: ""
     };
     return g.prototype.removeTransitionStyles = function() {
       this.css(t)
     }, g.prototype.removeElem = function() {
       this.element.parentNode.removeChild(this.element), this.css({
         display: ""
       }), this.emitEvent("remove", [this])
     }, g.prototype.remove = function() {
       if (!k || !parseFloat(this.layout.options.transitionDuration)) return void this.removeElem();
       var a = this;
       this.once("transitionEnd", function() {
         a.removeElem()
       }), this.hide()
     }, g.prototype.reveal = function() {
       delete this.isHidden, this.css({
         display: ""
       });
       var a = this.layout.options,
         b = {},
         c = this.getHideRevealTransitionEndProperty("visibleStyle");
       b[c] = this.onRevealTransitionEnd, this.transition({
         from: a.hiddenStyle,
         to: a.visibleStyle,
         isCleaning: !0,
         onTransitionEnd: b
       })
     }, g.prototype.onRevealTransitionEnd = function() {
       this.isHidden || this.emitEvent("reveal")
     }, g.prototype.getHideRevealTransitionEndProperty = function(a) {
       var b = this.layout.options[a];
       if (b.opacity) return "opacity";
       for (var c in b) return c
     }, g.prototype.hide = function() {
       this.isHidden = !0, this.css({
         display: ""
       });
       var a = this.layout.options,
         b = {},
         c = this.getHideRevealTransitionEndProperty("hiddenStyle");
       b[c] = this.onHideTransitionEnd, this.transition({
         from: a.visibleStyle,
         to: a.hiddenStyle,
         isCleaning: !0,
         onTransitionEnd: b
       })
     }, g.prototype.onHideTransitionEnd = function() {
       this.isHidden && (this.css({
         display: "none"
       }), this.emitEvent("hide"))
     }, g.prototype.destroy = function() {
       this.css({
         position: "",
         left: "",
         right: "",
         top: "",
         bottom: "",
         transition: "",
         transform: ""
       })
     }, g
   }),
   function(a, b) {
     "use strict";
     "function" == typeof define && define.amd ? define("outlayer/outlayer", ["eventie/eventie", "eventEmitter/EventEmitter", "get-size/get-size", "fizzy-ui-utils/utils", "./item"], function(c, d, e, f, g) {
       return b(a, c, d, e, f, g)
     }) : "object" == typeof exports ? module.exports = b(a, require("eventie"), require("wolfy87-eventemitter"), require("get-size"), require("fizzy-ui-utils"), require("./item")) : a.Outlayer = b(a, a.eventie, a.EventEmitter, a.getSize, a.fizzyUIUtils, a.Outlayer.Item)
   }(window, function(a, b, c, d, e, f) {
     "use strict";

     function g(a, b) {
       var c = e.getQueryElement(a);
       if (!c) return void(h && h.error("Bad element for " + this.constructor.namespace + ": " + (c || a)));
       this.element = c, i && (this.$element = i(this.element)), this.options = e.extend({}, this.constructor.defaults), this.option(b);
       var d = ++k;
       this.element.outlayerGUID = d, l[d] = this, this._create(), this.options.isInitLayout && this.layout()
     }
     var h = a.console,
       i = a.jQuery,
       j = function() {},
       k = 0,
       l = {};
     return g.namespace = "outlayer", g.Item = f, g.defaults = {
       containerStyle: {
         position: "relative"
       },
       isInitLayout: !0,
       isOriginLeft: !0,
       isOriginTop: !0,
       isResizeBound: !0,
       isResizingContainer: !0,
       transitionDuration: "0.4s",
       hiddenStyle: {
         opacity: 0,
         transform: "scale(0.001)"
       },
       visibleStyle: {
         opacity: 1,
         transform: "scale(1)"
       }
     }, e.extend(g.prototype, c.prototype), g.prototype.option = function(a) {
       e.extend(this.options, a)
     }, g.prototype._create = function() {
       this.reloadItems(), this.stamps = [], this.stamp(this.options.stamp), e.extend(this.element.style, this.options.containerStyle), this.options.isResizeBound && this.bindResize()
     }, g.prototype.reloadItems = function() {
       this.items = this._itemize(this.element.children)
     }, g.prototype._itemize = function(a) {
       for (var b = this._filterFindItemElements(a), c = this.constructor.Item, d = [], e = 0, f = b.length; f > e; e++) {
         var g = b[e],
           h = new c(g, this);
         d.push(h)
       }
       return d
     }, g.prototype._filterFindItemElements = function(a) {
       return e.filterFindElements(a, this.options.itemSelector)
     }, g.prototype.getItemElements = function() {
       for (var a = [], b = 0, c = this.items.length; c > b; b++) a.push(this.items[b].element);
       return a
     }, g.prototype.layout = function() {
       this._resetLayout(), this._manageStamps();
       var a = void 0 !== this.options.isLayoutInstant ? this.options.isLayoutInstant : !this._isLayoutInited;
       this.layoutItems(this.items, a), this._isLayoutInited = !0
     }, g.prototype._init = g.prototype.layout, g.prototype._resetLayout = function() {
       this.getSize()
     }, g.prototype.getSize = function() {
       this.size = d(this.element)
     }, g.prototype._getMeasurement = function(a, b) {
       var c, f = this.options[a];
       f ? ("string" == typeof f ? c = this.element.querySelector(f) : e.isElement(f) && (c = f), this[a] = c ? d(c)[b] : f) : this[a] = 0
     }, g.prototype.layoutItems = function(a, b) {
       a = this._getItemsForLayout(a), this._layoutItems(a, b), this._postLayout()
     }, g.prototype._getItemsForLayout = function(a) {
       for (var b = [], c = 0, d = a.length; d > c; c++) {
         var e = a[c];
         e.isIgnored || b.push(e)
       }
       return b
     }, g.prototype._layoutItems = function(a, b) {
       if (this._emitCompleteOnItems("layout", a), a && a.length) {
         for (var c = [], d = 0, e = a.length; e > d; d++) {
           var f = a[d],
             g = this._getItemLayoutPosition(f);
           g.item = f, g.isInstant = b || f.isLayoutInstant, c.push(g)
         }
         this._processLayoutQueue(c)
       }
     }, g.prototype._getItemLayoutPosition = function() {
       return {
         x: 0,
         y: 0
       }
     }, g.prototype._processLayoutQueue = function(a) {
       for (var b = 0, c = a.length; c > b; b++) {
         var d = a[b];
         this._positionItem(d.item, d.x, d.y, d.isInstant)
       }
     }, g.prototype._positionItem = function(a, b, c, d) {
       d ? a.goTo(b, c) : a.moveTo(b, c)
     }, g.prototype._postLayout = function() {
       this.resizeContainer()
     }, g.prototype.resizeContainer = function() {
       if (this.options.isResizingContainer) {
         var a = this._getContainerSize();
         a && (this._setContainerMeasure(a.width, !0), this._setContainerMeasure(a.height, !1))
       }
     }, g.prototype._getContainerSize = j, g.prototype._setContainerMeasure = function(a, b) {
       if (void 0 !== a) {
         var c = this.size;
         c.isBorderBox && (a += b ? c.paddingLeft + c.paddingRight + c.borderLeftWidth + c.borderRightWidth : c.paddingBottom + c.paddingTop + c.borderTopWidth + c.borderBottomWidth), a = Math.max(a, 0), this.element.style[b ? "width" : "height"] = a + "px"
       }
     }, g.prototype._emitCompleteOnItems = function(a, b) {
       function c() {
         e.dispatchEvent(a + "Complete", null, [b])
       }

       function d() {
         g++, g === f && c()
       }
       var e = this,
         f = b.length;
       if (!b || !f) return void c();
       for (var g = 0, h = 0, i = b.length; i > h; h++) {
         var j = b[h];
         j.once(a, d)
       }
     }, g.prototype.dispatchEvent = function(a, b, c) {
       var d = b ? [b].concat(c) : c;
       if (this.emitEvent(a, d), i)
         if (this.$element = this.$element || i(this.element), b) {
           var e = i.Event(b);
           e.type = a, this.$element.trigger(e, c)
         } else this.$element.trigger(a, c)
     }, g.prototype.ignore = function(a) {
       var b = this.getItem(a);
       b && (b.isIgnored = !0)
     }, g.prototype.unignore = function(a) {
       var b = this.getItem(a);
       b && delete b.isIgnored
     }, g.prototype.stamp = function(a) {
       if (a = this._find(a)) {
         this.stamps = this.stamps.concat(a);
         for (var b = 0, c = a.length; c > b; b++) {
           var d = a[b];
           this.ignore(d)
         }
       }
     }, g.prototype.unstamp = function(a) {
       if (a = this._find(a))
         for (var b = 0, c = a.length; c > b; b++) {
           var d = a[b];
           e.removeFrom(this.stamps, d), this.unignore(d)
         }
     }, g.prototype._find = function(a) {
       return a ? ("string" == typeof a && (a = this.element.querySelectorAll(a)), a = e.makeArray(a)) : void 0
     }, g.prototype._manageStamps = function() {
       if (this.stamps && this.stamps.length) {
         this._getBoundingRect();
         for (var a = 0, b = this.stamps.length; b > a; a++) {
           var c = this.stamps[a];
           this._manageStamp(c)
         }
       }
     }, g.prototype._getBoundingRect = function() {
       var a = this.element.getBoundingClientRect(),
         b = this.size;
       this._boundingRect = {
         left: a.left + b.paddingLeft + b.borderLeftWidth,
         top: a.top + b.paddingTop + b.borderTopWidth,
         right: a.right - (b.paddingRight + b.borderRightWidth),
         bottom: a.bottom - (b.paddingBottom + b.borderBottomWidth)
       }
     }, g.prototype._manageStamp = j, g.prototype._getElementOffset = function(a) {
       var b = a.getBoundingClientRect(),
         c = this._boundingRect,
         e = d(a),
         f = {
           left: b.left - c.left - e.marginLeft,
           top: b.top - c.top - e.marginTop,
           right: c.right - b.right - e.marginRight,
           bottom: c.bottom - b.bottom - e.marginBottom
         };
       return f
     }, g.prototype.handleEvent = function(a) {
       var b = "on" + a.type;
       this[b] && this[b](a)
     }, g.prototype.bindResize = function() {
       this.isResizeBound || (b.bind(a, "resize", this), this.isResizeBound = !0)
     }, g.prototype.unbindResize = function() {
       this.isResizeBound && b.unbind(a, "resize", this), this.isResizeBound = !1
     }, g.prototype.onresize = function() {
       function a() {
         b.resize(), delete b.resizeTimeout
       }
       this.resizeTimeout && clearTimeout(this.resizeTimeout);
       var b = this;
       this.resizeTimeout = setTimeout(a, 100)
     }, g.prototype.resize = function() {
       this.isResizeBound && this.needsResizeLayout() && this.layout()
     }, g.prototype.needsResizeLayout = function() {
       var a = d(this.element),
         b = this.size && a;
       return b && a.innerWidth !== this.size.innerWidth
     }, g.prototype.addItems = function(a) {
       var b = this._itemize(a);
       return b.length && (this.items = this.items.concat(b)), b
     }, g.prototype.appended = function(a) {
       var b = this.addItems(a);
       b.length && (this.layoutItems(b, !0), this.reveal(b))
     }, g.prototype.prepended = function(a) {
       var b = this._itemize(a);
       if (b.length) {
         var c = this.items.slice(0);
         this.items = b.concat(c), this._resetLayout(), this._manageStamps(), this.layoutItems(b, !0), this.reveal(b), this.layoutItems(c)
       }
     }, g.prototype.reveal = function(a) {
       this._emitCompleteOnItems("reveal", a);
       for (var b = a && a.length, c = 0; b && b > c; c++) {
         var d = a[c];
         d.reveal()
       }
     }, g.prototype.hide = function(a) {
       this._emitCompleteOnItems("hide", a);
       for (var b = a && a.length, c = 0; b && b > c; c++) {
         var d = a[c];
         d.hide()
       }
     }, g.prototype.revealItemElements = function(a) {
       var b = this.getItems(a);
       this.reveal(b)
     }, g.prototype.hideItemElements = function(a) {
       var b = this.getItems(a);
       this.hide(b)
     }, g.prototype.getItem = function(a) {
       for (var b = 0, c = this.items.length; c > b; b++) {
         var d = this.items[b];
         if (d.element === a) return d
       }
     }, g.prototype.getItems = function(a) {
       a = e.makeArray(a);
       for (var b = [], c = 0, d = a.length; d > c; c++) {
         var f = a[c],
           g = this.getItem(f);
         g && b.push(g)
       }
       return b
     }, g.prototype.remove = function(a) {
       var b = this.getItems(a);
       if (this._emitCompleteOnItems("remove", b), b && b.length)
         for (var c = 0, d = b.length; d > c; c++) {
           var f = b[c];
           f.remove(), e.removeFrom(this.items, f)
         }
     }, g.prototype.destroy = function() {
       var a = this.element.style;
       a.height = "", a.position = "", a.width = "";
       for (var b = 0, c = this.items.length; c > b; b++) {
         var d = this.items[b];
         d.destroy()
       }
       this.unbindResize();
       var e = this.element.outlayerGUID;
       delete l[e], delete this.element.outlayerGUID, i && i.removeData(this.element, this.constructor.namespace)
     }, g.data = function(a) {
       a = e.getQueryElement(a);
       var b = a && a.outlayerGUID;
       return b && l[b]
     }, g.create = function(a, b) {
       function c() {
         g.apply(this, arguments)
       }
       return Object.create ? c.prototype = Object.create(g.prototype) : e.extend(c.prototype, g.prototype), c.prototype.constructor = c, c.defaults = e.extend({}, g.defaults), e.extend(c.defaults, b), c.prototype.settings = {}, c.namespace = a, c.data = g.data, c.Item = function() {
         f.apply(this, arguments)
       }, c.Item.prototype = new f, e.htmlInit(c, a), i && i.bridget && i.bridget(a, c), c
     }, g.Item = f, g
   }),
   function(a, b) {
     "use strict";
     "function" == typeof define && define.amd ? define("isotope/js/item", ["outlayer/outlayer"], b) : "object" == typeof exports ? module.exports = b(require("outlayer")) : (a.Isotope = a.Isotope || {}, a.Isotope.Item = b(a.Outlayer))
   }(window, function(a) {
     "use strict";

     function b() {
       a.Item.apply(this, arguments)
     }
     b.prototype = new a.Item, b.prototype._create = function() {
       this.id = this.layout.itemGUID++, a.Item.prototype._create.call(this), this.sortData = {}
     }, b.prototype.updateSortData = function() {
       if (!this.isIgnored) {
         this.sortData.id = this.id, this.sortData["original-order"] = this.id, this.sortData.random = Math.random();
         var a = this.layout.options.getSortData,
           b = this.layout._sorters;
         for (var c in a) {
           var d = b[c];
           this.sortData[c] = d(this.element, this)
         }
       }
     };
     var c = b.prototype.destroy;
     return b.prototype.destroy = function() {
       c.apply(this, arguments), this.css({
         display: ""
       })
     }, b
   }),
   function(a, b) {
     "use strict";
     "function" == typeof define && define.amd ? define("isotope/js/layout-mode", ["get-size/get-size", "outlayer/outlayer"], b) : "object" == typeof exports ? module.exports = b(require("get-size"), require("outlayer")) : (a.Isotope = a.Isotope || {}, a.Isotope.LayoutMode = b(a.getSize, a.Outlayer))
   }(window, function(a, b) {
     "use strict";

     function c(a) {
       this.isotope = a, a && (this.options = a.options[this.namespace], this.element = a.element, this.items = a.filteredItems, this.size = a.size)
     }
     return function() {
       function a(a) {
         return function() {
           return b.prototype[a].apply(this.isotope, arguments)
         }
       }
       for (var d = ["_resetLayout", "_getItemLayoutPosition", "_manageStamp", "_getContainerSize", "_getElementOffset", "needsResizeLayout"], e = 0, f = d.length; f > e; e++) {
         var g = d[e];
         c.prototype[g] = a(g)
       }
     }(), c.prototype.needsVerticalResizeLayout = function() {
       var b = a(this.isotope.element),
         c = this.isotope.size && b;
       return c && b.innerHeight != this.isotope.size.innerHeight
     }, c.prototype._getMeasurement = function() {
       this.isotope._getMeasurement.apply(this, arguments)
     }, c.prototype.getColumnWidth = function() {
       this.getSegmentSize("column", "Width")
     }, c.prototype.getRowHeight = function() {
       this.getSegmentSize("row", "Height")
     }, c.prototype.getSegmentSize = function(a, b) {
       var c = a + b,
         d = "outer" + b;
       if (this._getMeasurement(c, d), !this[c]) {
         var e = this.getFirstItemSize();
         this[c] = e && e[d] || this.isotope.size["inner" + b]
       }
     }, c.prototype.getFirstItemSize = function() {
       var b = this.isotope.filteredItems[0];
       return b && b.element && a(b.element)
     }, c.prototype.layout = function() {
       this.isotope.layout.apply(this.isotope, arguments)
     }, c.prototype.getSize = function() {
       this.isotope.getSize(), this.size = this.isotope.size
     }, c.modes = {}, c.create = function(a, b) {
       function d() {
         c.apply(this, arguments)
       }
       return d.prototype = new c, b && (d.options = b), d.prototype.namespace = a, c.modes[a] = d, d
     }, c
   }),
   function(a, b) {
     "use strict";
     "function" == typeof define && define.amd ? define("masonry/masonry", ["outlayer/outlayer", "get-size/get-size", "fizzy-ui-utils/utils"], b) : "object" == typeof exports ? module.exports = b(require("outlayer"), require("get-size"), require("fizzy-ui-utils")) : a.Masonry = b(a.Outlayer, a.getSize, a.fizzyUIUtils)
   }(window, function(a, b, c) {
     var d = a.create("masonry");
     return d.prototype._resetLayout = function() {
       this.getSize(), this._getMeasurement("columnWidth", "outerWidth"), this._getMeasurement("gutter", "outerWidth"), this.measureColumns();
       var a = this.cols;
       for (this.colYs = []; a--;) this.colYs.push(0);
       this.maxY = 0
     }, d.prototype.measureColumns = function() {
       if (this.getContainerWidth(), !this.columnWidth) {
         var a = this.items[0],
           c = a && a.element;
         this.columnWidth = c && b(c).outerWidth || this.containerWidth
       }
       var d = this.columnWidth += this.gutter,
         e = this.containerWidth + this.gutter,
         f = e / d,
         g = d - e % d,
         h = g && 1 > g ? "round" : "floor";
       f = Math[h](f), this.cols = Math.max(f, 1)
     }, d.prototype.getContainerWidth = function() {
       var a = this.options.isFitWidth ? this.element.parentNode : this.element,
         c = b(a);
       this.containerWidth = c && c.innerWidth
     }, d.prototype._getItemLayoutPosition = function(a) {
       a.getSize();
       var b = a.size.outerWidth % this.columnWidth,
         d = b && 1 > b ? "round" : "ceil",
         e = Math[d](a.size.outerWidth / this.columnWidth);
       e = Math.min(e, this.cols);
       for (var f = this._getColGroup(e), g = Math.min.apply(Math, f), h = c.indexOf(f, g), i = {
           x: this.columnWidth * h,
           y: g
         }, j = g + a.size.outerHeight, k = this.cols + 1 - f.length, l = 0; k > l; l++) this.colYs[h + l] = j;
       return i
     }, d.prototype._getColGroup = function(a) {
       if (2 > a) return this.colYs;
       for (var b = [], c = this.cols + 1 - a, d = 0; c > d; d++) {
         var e = this.colYs.slice(d, d + a);
         b[d] = Math.max.apply(Math, e)
       }
       return b
     }, d.prototype._manageStamp = function(a) {
       var c = b(a),
         d = this._getElementOffset(a),
         e = this.options.isOriginLeft ? d.left : d.right,
         f = e + c.outerWidth,
         g = Math.floor(e / this.columnWidth);
       g = Math.max(0, g);
       var h = Math.floor(f / this.columnWidth);
       h -= f % this.columnWidth ? 0 : 1, h = Math.min(this.cols - 1, h);
       for (var i = (this.options.isOriginTop ? d.top : d.bottom) + c.outerHeight, j = g; h >= j; j++) this.colYs[j] = Math.max(i, this.colYs[j])
     }, d.prototype._getContainerSize = function() {
       this.maxY = Math.max.apply(Math, this.colYs);
       var a = {
         height: this.maxY
       };
       return this.options.isFitWidth && (a.width = this._getContainerFitWidth()), a
     }, d.prototype._getContainerFitWidth = function() {
       for (var a = 0, b = this.cols; --b && 0 === this.colYs[b];) a++;
       return (this.cols - a) * this.columnWidth - this.gutter
     }, d.prototype.needsResizeLayout = function() {
       var a = this.containerWidth;
       return this.getContainerWidth(), a !== this.containerWidth
     }, d
   }),
   function(a, b) {
     "use strict";
     "function" == typeof define && define.amd ? define("isotope/js/layout-modes/masonry", ["../layout-mode", "masonry/masonry"], b) : "object" == typeof exports ? module.exports = b(require("../layout-mode"), require("masonry-layout")) : b(a.Isotope.LayoutMode, a.Masonry)
   }(window, function(a, b) {
     "use strict";

     function c(a, b) {
       for (var c in b) a[c] = b[c];
       return a
     }
     var d = a.create("masonry"),
       e = d.prototype._getElementOffset,
       f = d.prototype.layout,
       g = d.prototype._getMeasurement;
     c(d.prototype, b.prototype), d.prototype._getElementOffset = e, d.prototype.layout = f, d.prototype._getMeasurement = g;
     var h = d.prototype.measureColumns;
     d.prototype.measureColumns = function() {
       this.items = this.isotope.filteredItems, h.call(this)
     };
     var i = d.prototype._manageStamp;
     return d.prototype._manageStamp = function() {
       this.options.isOriginLeft = this.isotope.options.isOriginLeft, this.options.isOriginTop = this.isotope.options.isOriginTop, i.apply(this, arguments)
     }, d
   }),
   function(a, b) {
     "use strict";
     "function" == typeof define && define.amd ? define("isotope/js/layout-modes/fit-rows", ["../layout-mode"], b) : "object" == typeof exports ? module.exports = b(require("../layout-mode")) : b(a.Isotope.LayoutMode)
   }(window, function(a) {
     "use strict";
     var b = a.create("fitRows");
     return b.prototype._resetLayout = function() {
       this.x = 0, this.y = 0, this.maxY = 0, this._getMeasurement("gutter", "outerWidth")
     }, b.prototype._getItemLayoutPosition = function(a) {
       a.getSize();
       var b = a.size.outerWidth + this.gutter,
         c = this.isotope.size.innerWidth + this.gutter;
       0 !== this.x && b + this.x > c && (this.x = 0, this.y = this.maxY);
       var d = {
         x: this.x,
         y: this.y
       };
       return this.maxY = Math.max(this.maxY, this.y + a.size.outerHeight), this.x += b, d
     }, b.prototype._getContainerSize = function() {
       return {
         height: this.maxY
       }
     }, b
   }),
   function(a, b) {
     "use strict";
     "function" == typeof define && define.amd ? define("isotope/js/layout-modes/vertical", ["../layout-mode"], b) : "object" == typeof exports ? module.exports = b(require("../layout-mode")) : b(a.Isotope.LayoutMode)
   }(window, function(a) {
     "use strict";
     var b = a.create("vertical", {
       horizontalAlignment: 0
     });
     return b.prototype._resetLayout = function() {
       this.y = 0
     }, b.prototype._getItemLayoutPosition = function(a) {
       a.getSize();
       var b = (this.isotope.size.innerWidth - a.size.outerWidth) * this.options.horizontalAlignment,
         c = this.y;
       return this.y += a.size.outerHeight, {
         x: b,
         y: c
       }
     }, b.prototype._getContainerSize = function() {
       return {
         height: this.y
       }
     }, b
   }),
   function(a, b) {
     "use strict";
     "function" == typeof define && define.amd ? define(["outlayer/outlayer", "get-size/get-size", "matches-selector/matches-selector", "fizzy-ui-utils/utils", "isotope/js/item", "isotope/js/layout-mode", "isotope/js/layout-modes/masonry", "isotope/js/layout-modes/fit-rows", "isotope/js/layout-modes/vertical"], function(c, d, e, f, g, h) {
       return b(a, c, d, e, f, g, h)
     }) : "object" == typeof exports ? module.exports = b(a, require("outlayer"), require("get-size"), require("desandro-matches-selector"), require("fizzy-ui-utils"), require("./item"), require("./layout-mode"), require("./layout-modes/masonry"), require("./layout-modes/fit-rows"), require("./layout-modes/vertical")) : a.Isotope = b(a, a.Outlayer, a.getSize, a.matchesSelector, a.fizzyUIUtils, a.Isotope.Item, a.Isotope.LayoutMode)
   }(window, function(a, b, c, d, e, f, g) {
     function h(a, b) {
       return function(c, d) {
         for (var e = 0, f = a.length; f > e; e++) {
           var g = a[e],
             h = c.sortData[g],
             i = d.sortData[g];
           if (h > i || i > h) {
             var j = void 0 !== b[g] ? b[g] : b,
               k = j ? 1 : -1;
             return (h > i ? 1 : -1) * k
           }
         }
         return 0
       }
     }
     var i = a.jQuery,
       j = String.prototype.trim ? function(a) {
         return a.trim()
       } : function(a) {
         return a.replace(/^\s+|\s+$/g, "")
       },
       k = document.documentElement,
       l = k.textContent ? function(a) {
         return a.textContent
       } : function(a) {
         return a.innerText
       },
       m = b.create("isotope", {
         layoutMode: "masonry",
         isJQueryFiltering: !0,
         sortAscending: !0
       });
     m.Item = f, m.LayoutMode = g, m.prototype._create = function() {
       this.itemGUID = 0, this._sorters = {}, this._getSorters(), b.prototype._create.call(this), this.modes = {}, this.filteredItems = this.items, this.sortHistory = ["original-order"];
       for (var a in g.modes) this._initLayoutMode(a)
     }, m.prototype.reloadItems = function() {
       this.itemGUID = 0, b.prototype.reloadItems.call(this)
     }, m.prototype._itemize = function() {
       for (var a = b.prototype._itemize.apply(this, arguments), c = 0, d = a.length; d > c; c++) {
         var e = a[c];
         e.id = this.itemGUID++
       }
       return this._updateItemsSortData(a), a
     }, m.prototype._initLayoutMode = function(a) {
       var b = g.modes[a],
         c = this.options[a] || {};
       this.options[a] = b.options ? e.extend(b.options, c) : c, this.modes[a] = new b(this)
     }, m.prototype.layout = function() {
       return !this._isLayoutInited && this.options.isInitLayout ? void this.arrange() : void this._layout()
     }, m.prototype._layout = function() {
       var a = this._getIsInstant();
       this._resetLayout(), this._manageStamps(), this.layoutItems(this.filteredItems, a), this._isLayoutInited = !0
     }, m.prototype.arrange = function(a) {
       function b() {
         d.reveal(c.needReveal), d.hide(c.needHide)
       }
       this.option(a), this._getIsInstant();
       var c = this._filter(this.items);
       this.filteredItems = c.matches;
       var d = this;
       this._bindArrangeComplete(), this._isInstant ? this._noTransition(b) : b(), this._sort(), this._layout()
     }, m.prototype._init = m.prototype.arrange, m.prototype._getIsInstant = function() {
       var a = void 0 !== this.options.isLayoutInstant ? this.options.isLayoutInstant : !this._isLayoutInited;
       return this._isInstant = a, a
     }, m.prototype._bindArrangeComplete = function() {
       function a() {
         b && c && d && e.dispatchEvent("arrangeComplete", null, [e.filteredItems])
       }
       var b, c, d, e = this;
       this.once("layoutComplete", function() {
         b = !0, a()
       }), this.once("hideComplete", function() {
         c = !0, a()
       }), this.once("revealComplete", function() {
         d = !0, a()
       })
     }, m.prototype._filter = function(a) {
       var b = this.options.filter;
       b = b || "*";
       for (var c = [], d = [], e = [], f = this._getFilterTest(b), g = 0, h = a.length; h > g; g++) {
         var i = a[g];
         if (!i.isIgnored) {
           var j = f(i);
           j && c.push(i), j && i.isHidden ? d.push(i) : j || i.isHidden || e.push(i)
         }
       }
       return {
         matches: c,
         needReveal: d,
         needHide: e
       }
     }, m.prototype._getFilterTest = function(a) {
       return i && this.options.isJQueryFiltering ? function(b) {
         return i(b.element).is(a)
       } : "function" == typeof a ? function(b) {
         return a(b.element)
       } : function(b) {
         return d(b.element, a)
       }
     }, m.prototype.updateSortData = function(a) {
       var b;
       a ? (a = e.makeArray(a), b = this.getItems(a)) : b = this.items, this._getSorters(), this._updateItemsSortData(b)
     }, m.prototype._getSorters = function() {
       var a = this.options.getSortData;
       for (var b in a) {
         var c = a[b];
         this._sorters[b] = n(c)
       }
     }, m.prototype._updateItemsSortData = function(a) {
       for (var b = a && a.length, c = 0; b && b > c; c++) {
         var d = a[c];
         d.updateSortData()
       }
     };
     var n = function() {
       function a(a) {
         if ("string" != typeof a) return a;
         var c = j(a).split(" "),
           d = c[0],
           e = d.match(/^\[(.+)\]$/),
           f = e && e[1],
           g = b(f, d),
           h = m.sortDataParsers[c[1]];
         return a = h ? function(a) {
           return a && h(g(a))
         } : function(a) {
           return a && g(a)
         }
       }

       function b(a, b) {
         var c;
         return c = a ? function(b) {
           return b.getAttribute(a)
         } : function(a) {
           var c = a.querySelector(b);
           return c && l(c)
         }
       }
       return a
     }();
     m.sortDataParsers = {
       parseInt: function(a) {
         return parseInt(a, 10)
       },
       parseFloat: function(a) {
         return parseFloat(a)
       }
     }, m.prototype._sort = function() {
       var a = this.options.sortBy;
       if (a) {
         var b = [].concat.apply(a, this.sortHistory),
           c = h(b, this.options.sortAscending);
         this.filteredItems.sort(c), a != this.sortHistory[0] && this.sortHistory.unshift(a)
       }
     }, m.prototype._mode = function() {
       var a = this.options.layoutMode,
         b = this.modes[a];
       if (!b) throw new Error("No layout mode: " + a);
       return b.options = this.options[a], b
     }, m.prototype._resetLayout = function() {
       b.prototype._resetLayout.call(this), this._mode()._resetLayout()
     }, m.prototype._getItemLayoutPosition = function(a) {
       return this._mode()._getItemLayoutPosition(a)
     }, m.prototype._manageStamp = function(a) {
       this._mode()._manageStamp(a)
     }, m.prototype._getContainerSize = function() {
       return this._mode()._getContainerSize()
     }, m.prototype.needsResizeLayout = function() {
       return this._mode().needsResizeLayout()
     }, m.prototype.appended = function(a) {
       var b = this.addItems(a);
       if (b.length) {
         var c = this._filterRevealAdded(b);
         this.filteredItems = this.filteredItems.concat(c)
       }
     }, m.prototype.prepended = function(a) {
       var b = this._itemize(a);
       if (b.length) {
         this._resetLayout(), this._manageStamps();
         var c = this._filterRevealAdded(b);
         this.layoutItems(this.filteredItems), this.filteredItems = c.concat(this.filteredItems), this.items = b.concat(this.items)
       }
     }, m.prototype._filterRevealAdded = function(a) {
       var b = this._filter(a);
       return this.hide(b.needHide), this.reveal(b.matches), this.layoutItems(b.matches, !0), b.matches
     }, m.prototype.insert = function(a) {
       var b = this.addItems(a);
       if (b.length) {
         var c, d, e = b.length;
         for (c = 0; e > c; c++) d = b[c], this.element.appendChild(d.element);
         var f = this._filter(b).matches;
         for (c = 0; e > c; c++) b[c].isLayoutInstant = !0;
         for (this.arrange(), c = 0; e > c; c++) delete b[c].isLayoutInstant;
         this.reveal(f)
       }
     };
     var o = m.prototype.remove;
     return m.prototype.remove = function(a) {
       a = e.makeArray(a);
       var b = this.getItems(a);
       o.call(this, a);
       var c = b && b.length;
       if (c)
         for (var d = 0; c > d; d++) {
           var f = b[d];
           e.removeFrom(this.filteredItems, f)
         }
     }, m.prototype.shuffle = function() {
       for (var a = 0, b = this.items.length; b > a; a++) {
         var c = this.items[a];
         c.sortData.random = Math.random()
       }
       this.options.sortBy = "random", this._sort(), this._layout()
     }, m.prototype._noTransition = function(a) {
       var b = this.options.transitionDuration;
       this.options.transitionDuration = 0;
       var c = a.call(this);
       return this.options.transitionDuration = b, c
     }, m.prototype.getFilteredItemElements = function() {
       for (var a = [], b = 0, c = this.filteredItems.length; c > b; b++) a.push(this.filteredItems[b].element);
       return a
     }, m
   });; /*! smooth-scroll v7.1.1 | (c) 2015 Chris Ferdinandi | MIT License | http://github.com/cferdinandi/smooth-scroll */
 ! function(e, t) {
   "function" == typeof define && define.amd ? define([], t(e)) : "object" == typeof exports ? module.exports = t(e) : e.smoothScroll = t(e)
 }("undefined" != typeof global ? global : this.window || this.global, function(e) {
   "use strict";
   var t, n, o, r, a = {},
     u = "querySelector" in document && "addEventListener" in e,
     c = {
       selector: "[data-scroll]",
       selectorHeader: "[data-scroll-header]",
       speed: 500,
       easing: "easeInOutCubic",
       offset: 0,
       updateURL: !0,
       callback: function() {}
     },
     i = function() {
       var e = {},
         t = !1,
         n = 0,
         o = arguments.length;
       "[object Boolean]" === Object.prototype.toString.call(arguments[0]) && (t = arguments[0], n++);
       for (var r = function(n) {
           for (var o in n) Object.prototype.hasOwnProperty.call(n, o) && (t && "[object Object]" === Object.prototype.toString.call(n[o]) ? e[o] = i(!0, e[o], n[o]) : e[o] = n[o])
         }; o > n; n++) {
         var a = arguments[n];
         r(a)
       }
       return e
     },
     s = function(e) {
       return Math.max(e.scrollHeight, e.offsetHeight, e.clientHeight)
     },
     l = function(e, t) {
       var n, o, r = t.charAt(0),
         a = "classList" in document.documentElement;
       for ("[" === r && (t = t.substr(1, t.length - 2), n = t.split("="), n.length > 1 && (o = !0, n[1] = n[1].replace(/"/g, "").replace(/'/g, ""))); e && e !== document; e = e.parentNode) {
         if ("." === r)
           if (a) {
             if (e.classList.contains(t.substr(1))) return e
           } else if (new RegExp("(^|\\s)" + t.substr(1) + "(\\s|$)").test(e.className)) return e;
         if ("#" === r && e.id === t.substr(1)) return e;
         if ("[" === r && e.hasAttribute(n[0])) {
           if (!o) return e;
           if (e.getAttribute(n[0]) === n[1]) return e
         }
         if (e.tagName.toLowerCase() === t) return e
       }
       return null
     },
     f = function(e) {
       for (var t, n = String(e), o = n.length, r = -1, a = "", u = n.charCodeAt(0); ++r < o;) {
         if (t = n.charCodeAt(r), 0 === t) throw new InvalidCharacterError("Invalid character: the input contains U+0000.");
         a += t >= 1 && 31 >= t || 127 == t || 0 === r && t >= 48 && 57 >= t || 1 === r && t >= 48 && 57 >= t && 45 === u ? "\\" + t.toString(16) + " " : t >= 128 || 45 === t || 95 === t || t >= 48 && 57 >= t || t >= 65 && 90 >= t || t >= 97 && 122 >= t ? n.charAt(r) : "\\" + n.charAt(r)
       }
       return a
     },
     d = function(e, t) {
       var n;
       return "easeInQuad" === e && (n = t * t), "easeOutQuad" === e && (n = t * (2 - t)), "easeInOutQuad" === e && (n = .5 > t ? 2 * t * t : -1 + (4 - 2 * t) * t), "easeInCubic" === e && (n = t * t * t), "easeOutCubic" === e && (n = --t * t * t + 1), "easeInOutCubic" === e && (n = .5 > t ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1), "easeInQuart" === e && (n = t * t * t * t), "easeOutQuart" === e && (n = 1 - --t * t * t * t), "easeInOutQuart" === e && (n = .5 > t ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t), "easeInQuint" === e && (n = t * t * t * t * t), "easeOutQuint" === e && (n = 1 + --t * t * t * t * t), "easeInOutQuint" === e && (n = .5 > t ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t), n || t
     },
     m = function(e, t, n) {
       var o = 0;
       if (e.offsetParent)
         do o += e.offsetTop, e = e.offsetParent; while (e);
       return o = o - t - n, o >= 0 ? o : 0
     },
     h = function() {
       return Math.max(e.document.body.scrollHeight, e.document.documentElement.scrollHeight, e.document.body.offsetHeight, e.document.documentElement.offsetHeight, e.document.body.clientHeight, e.document.documentElement.clientHeight)
     },
     p = function(e) {
       return e && "object" == typeof JSON && "function" == typeof JSON.parse ? JSON.parse(e) : {}
     },
     g = function(t, n) {
       e.history.pushState && (n || "true" === n) && "file:" !== e.location.protocol && e.history.pushState(null, null, [e.location.protocol, "//", e.location.host, e.location.pathname, e.location.search, t].join(""))
     },
     b = function(e) {
       return null === e ? 0 : s(e) + e.offsetTop
     };
   a.animateScroll = function(t, n, a) {
     var u = p(t ? t.getAttribute("data-options") : null),
       s = i(s || c, a || {}, u);
     n = "#" + f(n.substr(1));
     var l = "#" === n ? e.document.documentElement : e.document.querySelector(n),
       v = e.pageYOffset;
     o || (o = e.document.querySelector(s.selectorHeader)), r || (r = b(o));
     var y, O, S, I = m(l, r, parseInt(s.offset, 10)),
       H = I - v,
       E = h(),
       L = 0;
     g(n, s.updateURL);
     var j = function(o, r, a) {
         var u = e.pageYOffset;
         (o == r || u == r || e.innerHeight + u >= E) && (clearInterval(a), l.focus(), s.callback(t, n))
       },
       w = function() {
         L += 16, O = L / parseInt(s.speed, 10), O = O > 1 ? 1 : O, S = v + H * d(s.easing, O), e.scrollTo(0, Math.floor(S)), j(S, I, y)
       },
       C = function() {
         y = setInterval(w, 16)
       };
     0 === e.pageYOffset && e.scrollTo(0, 0), C()
   };
   var v = function(e) {
       var n = l(e.target, t.selector);
       n && "a" === n.tagName.toLowerCase() && (e.preventDefault(), a.animateScroll(n, n.hash, t))
     },
     y = function(e) {
       n || (n = setTimeout(function() {
         n = null, r = b(o)
       }, 66))
     };
   return a.destroy = function() {
     t && (e.document.removeEventListener("click", v, !1), e.removeEventListener("resize", y, !1), t = null, n = null, o = null, r = null)
   }, a.init = function(n) {
     u && (a.destroy(), t = i(c, n || {}), o = e.document.querySelector(t.selectorHeader), r = b(o), e.document.addEventListener("click", v, !1), o && e.addEventListener("resize", y, !1))
   }, a
 });;
 /*
  * Smoothzoom V 1.1.0
  * http://github.com/kthornbloom/smoothzoom
  *
  * Copyright 2015, Kevin Thornbloom
  * Free to use in personal and commercial projects.
  * Do not resell as a plugin
  * http://www.opensource.org/licenses/mit-license.php
  */

 (function($) {
   $.fn.extend({
     smoothZoom: function(opt) {
       var defaults = {
         zoominSpeed: 300,
         zoomoutSpeed: 400,
         zoominEasing: 'linear',
         zoomoutEasing: 'linear',
         navigationButtons: 'true',
         navigationLeft: '&#9664;',
         navigationRight: '&#9654;',
         navigationClose: '&#10006;',
         closeButton: 'true',
         showCaption: 'true',
         youtubeOptions: 'rel=0&autoplay=1',
         debug: false
       };
       var options = $.extend(defaults, opt);
       var $self = $(this);
       // CLICKING AN IMAGE
       $self.closest('a[data-smoothzoom]').click(function(event) {

         var offset = $('img', this).offset(),
           amountScrolled = $(window).scrollTop();

         $('img', this).attr('id', 'lightzoomed');
         $('body').append("<div class='sz-overlay' style='z-index: 990;'></div><a href='#' class='sz-zoomed' style='z-index: 991;' ></a>");

         // Add Nav buttons if needed, and if option is set
         var groupName = $('#lightzoomed').parents('a').data('smoothzoom'),
           groupTotal = $('a[data-smoothzoom=' + groupName + ']').length;
         if (options.navigationButtons == 'true' && groupTotal > 1) {
           $('body').append("<a href='#' class='sz-left' style='z-index: 991;'>" + options.navigationLeft + "</a><a href='#' class='sz-right' style='z-index: 991;'>" + options.navigationRight + "</a>");
         }

         // Add Close button if option is set
         if (options.closeButton == 'true') {
           $('body').append("<a href='#' class='sz-close' style='z-index: 991;'>" + options.navigationClose + "</a>");
         }

         // Add Caption div if option is set
         if (options.showCaption == 'true') {
           $('body').append("<div class='sz-caption'></div>");
           caption();
         }

         $('.sz-zoomed').css({
           width: $('img', this).width(),
           height: $('img', this).height(),
           top: (offset.top - amountScrolled),
           left: offset.left
         });
         //this appends the img or iframe to sz-zoomed
         getSourceCode($(this));
         _debug('Click Event', options);
         event.preventDefault();
       });

       // Close Everything On Click
       $(document.body).on("click", ".sz-zoomed,.sz-close", function(event) {
         closeAll();
         event.stopPropagation();
         return false;
       });

       // Next Button
       $(document.body).on("click", " .sz-right", function(event) {
         nextGroup(1);
         event.preventDefault();
       });

       // Prev Button
       $(document.body).on("click", ".sz-left", function(event) {
         nextGroup(-1);
         event.preventDefault();
       });
       _debug('Init for image', $self);
       // Update Caption
       function caption() {
         if (options.showCaption == 'true') {
           $('.sz-caption').fadeOut();
           var currentCap = $('#lightzoomed').attr('alt');
           if (currentCap) {
             $(".sz-caption").html("<span>" + currentCap + "</span>").fadeIn();
           } else {
             $(".sz-caption").empty();
           }
         }
       }
       // Checks if it is a youtube
       function getYoutubeId(str) {
         var match;
         match = str.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/);
         if (match && match[2].length === 11) {
           return match[2];
         } else {
           return false;
         }
       }

       // Close Function
       function closeAll() {
         var offset = $("#lightzoomed").offset(),
           originalWidth = $("#lightzoomed").width(),
           originalHeight = $("#lightzoomed").height(),
           amountScrolled = $(window).scrollTop();
         $('.sz-overlay, .sz-left, .sz-right').fadeOut();

         $('.sz-zoomed').stop(true, true).animate({
           width: originalWidth,
           height: originalHeight,
           top: (offset.top - amountScrolled),
           left: offset.left
         }, options.zoomoutSpeed, options.zoomoutEasing, function() {
           $('.sz-zoomed, .sz-overlay, .sz-right, .sz-left, .sz-caption, .sz-close').remove();
           $('#lightzoomed').removeAttr('id');
         });
         $('.sz-zoomed').data('firstime', true);
       }
       // Changes to Next Group either -1 backgwards or +1 forwards
       function nextGroup(moveValue) {
         var groupName = $('#lightzoomed').parents('a').data('smoothzoom'),
           currentIndex = $('#lightzoomed').parents('a').index("[data-smoothzoom=" + groupName + "]"),
           groupTotal = $('a[data-smoothzoom=' + groupName + ']').length;

         // error checking moveValue
         moveValue = moveValue === undefined ? 0 : moveValue;
         moveValue = Math.min(parseInt(moveValue), 1);
         var nextIndex = currentIndex + moveValue;
         if (nextIndex >= groupTotal) {
           nextIndex = 0;
         }
         if (nextIndex <= -1) {
           nextIndex = groupTotal - 1;
         }
         // fade out and remove current image
         $("#lightzoomed").removeAttr('id');

         $('.sz-zoomed').stop(true, true).animate({
           'opacity': '0'
         }, 200, function() {
           $("[data-smoothzoom=" + groupName + "]:eq(" + nextIndex + ")").find('img').attr('id', 'lightzoomed');
           $(this).html(getSourceCode($("#lightzoomed").parent()));
           caption();
         });
       }
       /** Gets Iframe or image and adds Animation  **/
       function getSourceCode($obj) {
         var source = $obj.attr('href');
         var modalW = ($obj.attr('data-width') === undefined) ? 1280 : Math.max($obj.attr('data-width'), 560);
         var modalH = ($obj.attr('data-height') === undefined) ? 720 : Math.max($obj.attr('data-height'), 315);

         _debug('Source', source, 'wr', $obj.attr('data-width'), 'w', modalW, 'hr', $obj.attr('data-height'), 'h', modalH);
         $('.sz-zoomed').data('firstime', false);
         var isImage = source.match(/(^data:image\/.*,)|(\.(jp(e|g|eg)|gif|png|bmp|webp|svg)((\?|#).*)?$)/i),
           overlay = "";
         // is an image
         if (isImage) {
           _debug('Source is Image');
           overlay += '<img style=" width: inherit; height: auto; opacity:0;" src="' + source + '" />';
           $('.sz-zoomed').html(overlay);
           $('<img/>').attr('src', source).load(function() {
             // after image is loaded do animation
             $('.sz-zoomed img').animate({
               opacity: '0.95'
             });
             $('.sz-zoomed').stop(true, true).animate(getCssObject(this.width, this.height), options.zoominSpeed, options.zoominEasing, function() {
               $('.sz-overlay, .sz-left, .sz-right, .sz-close').fadeIn(500, function() {
                 $('.sz-zoomed img').animate({
                   opacity: '1'
                 });
               });
             });
           });
         }
         // not an image
         else {
           // means it is a youtube video
           if (getYoutubeId(source) !== false) {

             _debug('Source is Youtube');
             overlay += ' <div class="embed-responsive embed-responsive-16by9" >';
             overlay += '<iframe   class="embed-responsive-item" ';
             overlay += 'src="https://www.youtube.com/embed/' + getYoutubeId(source) + '?' + options.youtubeOptions + '"';
             overlay += 'frameborder="0" allowfullscreen></iframe>';
             overlay += '</div>';
             $('.sz-zoomed').html(overlay);
             $('.sz-zoomed').stop(true, true).animate(getCssObject(modalW, modalH), options.zoominSpeed, options.zoominEasing, function() {
               $('.sz-overlay, .sz-left, .sz-right, .sz-close').fadeIn();
             });

           }
           //means it is something else, probably an ajax call
           else {
             _debug('Source is remote');

             $.ajax({
               url: source,
               dataType: 'html',
               success: function(data) {
                 $('.sz-zoomed').html(data);
                 $('.sz-zoomed').stop(true, true).animate(getCssObject(modalW, modalH), options.zoominSpeed, options.zoominEasing, function() {
                   $('.sz-overlay, .sz-left, .sz-right, .sz-close').fadeIn(500, function() {
                     $('.sz-zoomed *').animate({
                       opacity: '1'
                     });
                   });

                 });
               }
             });
           }

         }
       }

       /* This gets Css Object for animation handles resize to fit screen */
       function getCssObject(width, height) {
         var captionHeight = $('.sz-caption').outerHeight();
         var centerVert = ($(window).outerHeight() - captionHeight) / 2;
         var centerHorz = $(window).outerWidth() / 2;

         var factor = ($(window).outerWidth()) / width;
         var nWidth = width;
         var nHeight = height;
         // height is bigger
         if (height > (($(window).outerHeight() * 0.9) - captionHeight)) {
           factor = (($(window).outerHeight() * 0.9) - captionHeight) / height;
           nWidth = width * factor;
           nHeight = height * factor;

         }
         if (nWidth > $(window).outerWidth()) {
           nHeight = nHeight * factor;
         }
         nWidth = Math.min($(window).outerWidth(), nWidth);

         nHeight = Math.min($(window).outerHeight(), nHeight);

         var objTop = (centerVert - (nHeight / 2)) + 'px';
         var objLeft = (centerHorz - (nWidth / 2)) + 'px';

         var cssObject = {
           opacity: '1',
           top: objTop,
           left: objLeft,
           width: nWidth + 'px',
           height: nHeight + 'px',
         };
         _debug(cssObject);
         return cssObject;
       }

       function _debug() {
         if (options.debug) {
           console.log(arguments);
         }
       }

       // Keyboard shortcuts
       $(document).keydown(function(e) {
         _debug('keydown', e);
         switch (e.which) {
           case 37: // Left arrow
             if ($('.sz-overlay').length) {
               nextGroup(-1);
             }
             break;

           case 39: // Right arrow
             if ($('.sz-overlay').length) {
               nextGroup(1);
             }
             break;

           case 27: // Escape key
             closeAll();
             break;

           case 40: // Down arrow
             closeAll();
             break;

           default:
             return; // exit this handler for other keys
         }
         e.preventDefault();
       });

     }
   });
 })(jQuery);;
 /*! stickycomponent 2016-05-03 
  * Version: 1.1.0 
  * https://github.com/sturple/StickyComponent#readme 
  * Shawn Turple  
  */
 ! function(a) {
   a.fgStickyComponent = function(b, c) {
     var d = {
         topoffset: 75,
         triggertop: 150,
         startselector: void 0,
         activeclass: "fg-sticky-active",
         bottomoffset: 75,
         removesize: 990,
         stopselector: "footer",
         debug: !1,
         onInit: function() {}
       },
       e = this;
     e.settings = {}, e.globals = {
       parentSize: 0,
       parentTop: 0
     };
     var f = a(b);
     e.init = function() {
       e.settings = a.extend({}, d, c, f.data()), e._resize(), a(window).resize(function(a) {
         e._resize()
       }), a(window).scroll(function() {
         e._resize()
       }), e.settings.onInit(f)
     }, e.is_touch_device = function() {
       try {
         return document.createEvent("TouchEvent"), !0
       } catch (a) {
         return !1
       }
     }, e._resize = function() {
       if (window.innerWidth >= e.settings.removesize)
         if (f.css({
             width: f.parent().innerWidth() + "px",
             height: "auto",
             position: "absolute"
           }), e.globals.height = f.outerHeight(!0), e.globals.parentSize = f.parent().innerWidth(), e.globals.parentTop = f.parent().offset().top, e.settings.triggertop = void 0 === e.settings.startselector ? e.settings.triggertop : e.settings.startselector.offset().top, e.settings.triggertop <= a(window).scrollTop() + e.settings.topoffset) {
           var b = a(window).scrollTop() + (e.globals.height + e.settings.topoffset + e.settings.bottomoffset),
             c = a(e.settings.stopselector).offset().top - f.parent().offset().top - (e.settings.bottomoffset + e.globals.height);
           if ("active" !== f.data("status") && (f.data("status", "active"), f.addClass(e.settings.activeclass), f.trigger("fg.stickycomponent.active", [e.globals, a(window).scrollTop()])), a(e.settings.stopselector).offset().top < b) f.css({
             top: c + "px",
             position: "absolute"
           }), "bottom" !== f.data("state") && (f.data("state", "bottom"), f.trigger("fg.stickycomponent.bottom", [e.globals, a(window).scrollTop()]));
           else if (f.trigger("fg.stickycomponent.moving", [e.globals, a(window).scrollTop()]), e.is_touch_device()) {
             var d = a(window).scrollTop() - f.parent().offset().top + e.settings.topoffset;
             f.css({
               top: d + "px",
               postion: "absolute"
             })
           } else f.css({
             top: e.settings.topoffset + "px",
             position: "fixed"
           })
         } else f.css({
           top: 0,
           position: "relative"
         }), "normal" !== f.data("status") && (f.data("status", "normal"), f.removeClass(e.settings.activeclass), f.trigger("fg.stickycomponent.normal", [e.globals, a(window).scrollTop()])), "normal" !== f.data("state") && (f.data("state", "normal"), f.trigger("fg.stickycomponent.normal", [e.globals, a(window).scrollTop()]));
       else f.css({
         top: 0,
         position: "relative",
         width: f.parent().innerWidth() + "px",
         height: "100%"
       })
     };
     e.init()
   }, a.fn.fgStickyComponent = function(b) {
     return this.each(function() {
       if (void 0 === a(this).data("fgStickyComponent")) {
         var c = new a.fgStickyComponent(this, b);
         a(this).data("fgStickyComponent", c)
       }
     })
   }
 }(jQuery);;
 /*
     JQuery Advanced News Ticker 1.0.11 (20/02/14)
     created by risq
     website (docs & demos) : http://risq.github.io/jquery-advanced-news-ticker/
 */
 (function(b, k, l, m) {
   function g(a, f) {
     this.element = a;
     this.$el = b(a);
     this.options = b.extend({}, c, f);
     this._defaults = c;
     this._name = d;
     this.moveInterval;
     this.moving = this.paused = this.state = 0;
     (this.$el.is("ul") || this.$el.is("ol")) && this.init()
   }
   var d = "newsTicker",
     c = {
       row_height: 20,
       max_rows: 3,
       speed: 400,
       duration: 2500,
       direction: "up",
       autostart: 1,
       pauseOnHover: 1,
       nextButton: null,
       prevButton: null,
       startButton: null,
       stopButton: null,
       hasMoved: function() {},
       movingUp: function() {},
       movingDown: function() {},
       start: function() {},
       stop: function() {},
       pause: function() {},
       unpause: function() {}
     };
   g.prototype = {
     init: function() {
       this.$el.height(this.options.row_height * this.options.max_rows).css({
         overflow: "hidden"
       });
       this.checkSpeed();
       this.options.nextButton && "undefined" !== typeof this.options.nextButton[0] && this.options.nextButton.click(function(a) {
         this.moveNext();
         this.resetInterval()
       }.bind(this));
       this.options.prevButton && "undefined" !== typeof this.options.prevButton[0] && this.options.prevButton.click(function(a) {
         this.movePrev();
         this.resetInterval()
       }.bind(this));
       this.options.stopButton && "undefined" !== typeof this.options.stopButton[0] && this.options.stopButton.click(function(a) {
         this.stop()
       }.bind(this));
       this.options.startButton && "undefined" !== typeof this.options.startButton[0] && this.options.startButton.click(function(a) {
         this.start()
       }.bind(this));
       this.options.pauseOnHover && this.$el.hover(function() {
         this.state && this.pause()
       }.bind(this), function() {
         this.state && this.unpause()
       }.bind(this));
       this.options.autostart && this.start()
     },
     start: function() {
       this.state || (this.state =
         1, this.resetInterval(), this.options.start())
     },
     stop: function() {
       this.state && (clearInterval(this.moveInterval), this.state = 0, this.options.stop())
     },
     resetInterval: function() {
       this.state && (clearInterval(this.moveInterval), this.moveInterval = setInterval(function() {
         this.move()
       }.bind(this), this.options.duration))
     },
     move: function() {
       this.paused || this.moveNext()
     },
     moveNext: function() {
       "down" === this.options.direction ? this.moveDown() : "up" === this.options.direction && this.moveUp()
     },
     movePrev: function() {
       "down" === this.options.direction ?
         this.moveUp() : "up" === this.options.direction && this.moveDown()
     },
     pause: function() {
       this.paused || (this.paused = 1);
       this.options.pause()
     },
     unpause: function() {
       this.paused && (this.paused = 0);
       this.options.unpause()
     },
     moveDown: function() {
       this.moving || (this.moving = 1, this.options.movingDown(), this.$el.children("li:last").detach().prependTo(this.$el).css("marginTop", "-" + this.options.row_height + "px").animate({
         marginTop: "0px"
       }, this.options.speed, function() {
         this.moving = 0;
         this.options.hasMoved()
       }.bind(this)))
     },
     moveUp: function() {
       if (!this.moving) {
         this.moving =
           1;
         this.options.movingUp();
         var a = this.$el.children("li:first");
         a.animate({
           marginTop: "-" + this.options.row_height + "px"
         }, this.options.speed, function() {
           a.detach().css("marginTop", "0").appendTo(this.$el);
           this.moving = 0;
           this.options.hasMoved()
         }.bind(this))
       }
     },
     updateOption: function(a, b) {
       "undefined" !== typeof this.options[a] && (this.options[a] = b, "duration" == a || "speed" == a) && (this.checkSpeed(), this.resetInterval())
     },
     add: function(a) {
       this.$el.append(b("<li>").html(a))
     },
     getState: function() {
       return paused ? 2 : this.state
     },
     checkSpeed: function() {
       this.options.duration < this.options.speed + 25 && (this.options.speed = this.options.duration - 25)
     },
     destroy: function() {
       this._destroy()
     }
   };
   b.fn[d] = function(a) {
     var f = arguments;
     return this.each(function() {
       var c = b(this),
         e = b.data(this, "plugin_" + d),
         h = "object" === typeof a && a;
       e || c.data("plugin_" + d, e = new g(this, h));
       "string" === typeof a && e[a].apply(e, Array.prototype.slice.call(f, 1))
     })
   }
 })(jQuery, window, document);;
 /*!
  ***************** script.js ***********************
  * generic scripts
  */

 var sizePostfix = 'xl';
 if (window.innerWidth < 1920) {
   sizePostfix = 'lg';
 }
 if (window.innerWidth < 1200) {
   sizePostfix = 'md';
 }
 if (window.innerWidth < 993) {
   sizePostfix = 'sm';
 }
 if (window.innerWidth <= 768) {
   sizePostfix = 'xs';
 }
 if (window.innerWidth <= 480) {
   sizePostfix = 'xxs';
 }

 jQuery(function($) {
   /*** Email cloaking ***/
   var lastWindowTopLocation = $(window).scrollTop();

   emailCloak();

   /*** Updates all background images according to screen size; */
   $('*[data-background-' + sizePostfix + ']').each(function() {
     $(this).css({
       'background-image': 'url(' + $(this).data('background-' + sizePostfix) + ')'
     });
   });
   $('*[data-background]').each(function() {
     $(this).css({
       'background-image': 'url(' + $(this).data('background') + ')'
     });
   });

   /*** Updates all  images according to screen size;  */
   //$('img[data-image-'+sizePostfix+']')

   $('img').each(function() {
     getImageSize($(this));

   });
   $.each(document.getElementsByTagName("img"), function(index, value) {
     if (this.getAttribute('src') === null) {
       this.setAttribute('src', this.getAttribute('data-image'));
     }

   });

   $('.panel-group').on('shown.bs.collapse', function(event) {
     $(this).find('.panel-title *').removeClass('active');

     $(this).find('.panel-title *[href="#' + $(event.target).attr('id') + '"]').addClass('active');

   });

   var imgs = $('#articleContent img');
   if ((imgs.length > 0) && imgs.smoothZoom) {
     imgs.smoothZoom({
       navigationRight: '<i class=\"fa fa-angle-right\"></i>',
       navigationLeft: '<i class=\"fa fa-angle-left\"></i>',
       navigationClose: '<i class="fa fa-times-circle" aria-hidden="true"></i>'
     });

   }

   //adding hover code to bootstrap menus
   /*$('ul.nav li.dropdown').on('hover',
     function() {
       $(this).find('.dropdown-menu').stop(true, true).delay(200).fadeIn(500);
     }, function() {
       $(this).find('.dropdown-menu').stop(true, true).delay(200).fadeOut(500);
   });*/
   /*removes data in generalmodal*/
   $('#general-modal').on('hidden.bs.modal', function() {
     $(this).removeData('bs.modal');
   });
   $('#general-modal').on('loaded.bs.modal', function() {
     emailCloak();
   });

   if ((typeof $().smoothZoom === 'function') && ($('.script-gallery-action img').length > 0)) {
     $('.script-gallery-action img').smoothZoom({
       navigationRight: '<i class=\"fa fa-angle-right\"></i>',
       navigationLeft: '<i class=\"fa fa-angle-left\"></i>',
       navigationClose: '<i class="fa fa-times-circle" aria-hidden="true"></i>',
       zoomoutSpeed: 800
     });
   }
   /*
  if (typeof $().smoothScroll === 'function') {
	console.log('smooth scroll');
	smoothScroll.init();
  }*/
   smoothScroll.init({
     speed: 2000
   });

   if (($('.script-grid-gallery').length > 0) && $().isotope) {
     var $element = $('.script-grid-gallery');
     var $grid = $element.find('ul').isotope({
       itemSelector: 'li',
       layoutMode: 'fitRows'
     });
     imagesLoaded($element.find('img'), function(e, msg) {
       $grid.isotope('layout');
     });

   }

   //this is the code for stickycomponent
   if (($('.scipt-sidebar-sticky')) && (typeof $().fgStickyComponent === 'function')) {
     $('.script-sidebar-sticky').fgStickyComponent({
       startselector: $('.script-sidebar-sticky').parent(),
       topoffset: 36,
       bottomoffset: 36,
       removesize: 990,
       stopselector: '.footer',
     });

     $('.script-sidebar-sticky').on('fg.stickycomponent.active', function(e, globals, wtop) {
       var left = $(this).parent().parent().position().left + 15;
       $(this).css({
         'left': left + 'px'
       });
     });
     $('.script-sidebar-sticky').on('fg.stickycomponent.moving', function(e, globals, wtop) {
       var left = $(this).parent().parent().position().left + 15;
       $(this).css({
         'left': left + 'px'
       });
     });
     $('.script-sidebar-sticky').on('fg.stickycomponent.bottom', function(e, globals, wtop) {
       $(this).css({
         'left': 'inherit'
       });
     });
     $('.script-sidebar-sticky').on('fg.stickycomponent.normal', function(e, globals, wtop) {
       $(this).css({
         'left': 'inherit'
       });
     });
   }

   $(window).scroll(function() {
     didScroll = true;
     // this checks if there is a youtube video
     $('.script-autoplay').each(function() {
       var inview = (($(window).outerHeight() + $(window).scrollTop()) > ($(this).offset().top + $(this).outerHeight()));

       // top of screen passed object above && top + height is greater than item offscreen below
       var outview = (($(window).scrollTop() > $(this).offset().top) || (($(window).scrollTop() + $(window).outerHeight()) < $(this).offset().top));
       //	console.log(($(window).scrollTop() + $(window).outerHeight()) < $(this).offset().top , $(window).scrollTop(), $(this).offset().top)
       if (($(this).data('playstate') === undefined) && (inview) && videoready) {
         $(this).data('playstate', 'play');
         youtube_hp.playVideo();

       } else if ((outview) && ($(this).data('playstate') == 'play')) {
         $(this).data('playstate', 'stop');
         youtube_hp.stopVideo();

       }

     });
     $('.script-parallax').each(function() {
       if (updateParallax($(this))) {}

     });
   });

   /* script-parallax
    *  Adds parallaxing background 
    *  data-offset="0" data-ratio="2.5"
    */
   $('.script-parallax').each(function() {
     var offset = parseInt($(this).data('offset'));
     var backgroundX = '50%';
     if ($(this).hasClass('background-image-pull-right')) {
       backgroundX = 'right';
     }
     if ($(this).hasClass('background-image-pull-left')) {
       backgroundX = 'left';
     }
     $(this).css({
       'background-transparent': 'transparent',
       'background-position': backgroundX + ' ' + offset + 'px',
       'background-size': '100% auto'
     });
   });
   // this animates to hash
   var hash = window.location.hash;
   if ((hash.length > 1) && ($('a[href="' + hash + '"]').length > 0)) {
     hash = hash && $('a[href="' + hash + '"]').tab('show');
     if ($('a[href="' + hash + '"]').length > 0) {
       $('html, body').animate({
         scrollTop: $('a[href="' + hash + '"]').offset().top - 50
       }, 2000);
     }

   }

   $('header ul li:first-child').each(function(i, e) {
     e = $(e);
     e.click(e.toggleClass.bind(e, 'active'));
   });

   // this is a fix to add placeholders to form-7 in footer
   $('.footer .form-group > label.sr-only ~ * > input[type="text"], .footer .form-group > label.sr-only ~ * > input[type="email"], .footer .form-group > label.sr-only ~ * > textarea').each(function(i, e) {
     var label = $(e.parentElement.parentElement).children('label.sr-only')[0];
     e.setAttribute('placeholder', label.innerHTML);
   });

 });

 function getImageSize($img) {
   var sizeArray = ['xxs', 'xs', 'sm', 'md', 'lg', 'xl'];
   var src;
   for (index = sizeArray.indexOf(sizePostfix); index < sizeArray.length; ++index) {
     var attr = $img.attr('data-image-' + sizeArray[index]);
     if (attr !== undefined) {
       if (attr.length > 5) {
         $img.attr('src', attr);
         break;
       }

     }
   }
 }

 function emailCloak() {
   jQuery('.mailto, a[data-domain]').each(function() {
     jQuery(this).attr('href', 'mailto:' + jQuery(this).attr('data-prefix') + '@' + jQuery(this).attr('data-domain'));
     if (jQuery(this).text().length < 2) {
       jQuery(this).text(jQuery(this).attr('data-prefix') + '@' + jQuery(this).attr('data-domain'));
     }
   });
 }

 function imagesLoaded($, fn) {
   var c = $.length;
   var msg = [];
   /*
    $.addEventListener('onload',action);
    $.addEventListener('onerror',action); */

   $.on('load', action);
   $.on('error', action);

   function action(e) {
     --c;
     if (e.type === 'error') {
       msg.push('Error Loading.. ' + e.target.src);
     }
     if (c === 0) {
       fn(e, msg);
     }
   }
 }

 function fitScreen($resizeSelector, $arrayOfSelectors, callback) {
   var height = 0;
   jQuery.each($arrayOfSelectors, function() {
     height += jQuery(this).outerHeight();
   });
   callback((jQuery(window).outerHeight() - height), height);
 }

 // logic to check if parallax is going to go out of region, to do a fix   
 function updateParallax($obj, minheight) {
   minheight = minheight || 1200;
   var $ = jQuery;
   var pageBottom = (parseInt($(window).scrollTop()) + parseInt($(window).height()));

   if (window.innerWidth >= minheight) {
     if (pageBottom > $obj.offset().top) {
       var offset = $obj.data('offset');
       offset = (offset !== undefined) ? offset : 0;
       var ratio = $obj.data('ratio');
       ratio = (ratio !== undefined) ? ratio : 3;
       var parallaxDiff = pageBottom - parseInt($obj.offset().top);
       var parallaxAdj = -(parallaxDiff / ratio) + offset;
       $obj.data('imagePositionY', parallaxAdj);
       var backgroundX = '50%';
       if ($obj.hasClass('background-image-pull-right')) {
         backgroundX = 'right';
       }
       if ($obj.hasClass('background-image-pull-left')) {
         backgroundX = 'left';
       }

       $obj.css('background-position', backgroundX + ' ' + parallaxAdj + 'px');

       // THIS IS first time
       if ($obj.data('image') === undefined) {
         var image_url = $obj.css('background-image');
         image_url = image_url.match(/^url\("?(.+?)"?\)$/);
         if (image_url === null) {
           return false;
         }
         if (image_url[1]) {
           image_url = image_url[1];
           image = new Image();
           // just in case it gets called while loading image
           $obj.data('image', []);
           $(image).load(function() {
             $obj.data('image', this);
             $obj.data('imageHeight', this.naturalHeight);
             $obj.data('imageUrl', image_url);
             var backgroundPos = parseInt($obj.css('background-position-y'), 10);
             var checkImageFit = this.naturalHeight + backgroundPos;
             //console.log('first --self', $self.outerHeight(),'img ',this.naturalHeight, 'bckpos ',backgroundPos, 'check', checkImageFit );

           });
           image.src = image_url;
         }

       }
       // this means i have already created image it is stored in data-image
       else {
         var imageHeight = ($obj.data('imageHeight') !== undefined) ? $obj.data('imageHeight') : 200;
         var backgroundPos = $obj.data('imagePositionY');
         var checkImageFit = imageHeight + backgroundPos;
         $obj.data('imagePositionY', parallaxAdj);
         $obj.css('background-position', backgroundX + parallaxAdj + 'px');
       }
       return true;
     }
   } else {
     $obj.css({
       'background-position': '0 0',
       'background-size': 'cover'
     });
   }

 }; /****** theme.js *****/

 /* install specific ****/

 jQuery(function($) {
   //simply resizes screen on load
   if (window.innerWidth >= 1200) {
     fitScreen($('#header-container'), [$('.script-navigation')], function(resize, height) {
       resize = resize - 30;
       var NAV_LOCATION = 100;

       $('#header-container').css({
         'height': resize + 'px',
         'overflow': 'hidden'
       });
       $('#header-container').find('.carousel-indicators').css({
         bottom: 'inherit',
         top: (resize - NAV_LOCATION) + 'px'
       });
     });
   }

   $(window).resize(function(e) {
     if (window.innerWidth >= 1200) {
       fitScreen($('#header-container'), [$('.script-navigation')], function(resize, height) {
         resize = resize - 30;
         var NAV_LOCATION = 100;

         $('#header-container').css({
           'height': resize + 'px',
           'overflow': 'hidden'
         });
         $('#header-container').find('.carousel-indicators').css({
           bottom: 'inherit',
           top: (resize - NAV_LOCATION) + 'px'
         });

         var testimage = $('.carousel .item img').first()[0];
         var galleryAspect = testimage.naturalWidth / testimage.naturalHeight;
         var windowAspect = $(window).outerWidth() / resize;

         //image is not heigh enough
         if (galleryAspect >= windowAspect) {
           var ciwidth = galleryAspect * resize;
           $('.carousel-inner').css({
             width: ciwidth + 'px'
           });
         } else {
           $('.carousel-inner').css({
             width: '100%'
           });
         }
       });
     }

   });

   imagesLoaded($('.feature-carousel img'),
     function(e, msg) {
       var navpos = 0;
       if (msg.length > 0) {
         console.log('Error loading images.', msg);
       }
       // this updates the window and menu location after images have been loaded.            
       $('.carousel').css({
         'min-height': '100%'
       }).animate({
         opacity: 1
       });
       $(window).trigger('resize');

       $('.script-navigation').fgStickyComponent({
         topoffset: 0,
         triggertop: $('#header-container').offset().top + $('#header-container').outerHeight(),
         removesize: 1200
       });
       // this code is used for fading menu on scroll down and fading in menu on scroll up
       $('.script-navigation').on('fg.stickycomponent.moving', function(e, g, wt) {
         if (navpos < wt) {
           if (!$(this).hasClass('sticky-scroll-down')) {
             $(this).removeClass('sticky-scroll-up').addClass('sticky-scroll-down');
           }
         } else {
           if (!$(this).hasClass('sticky-scroll-up')) {
             $(this).removeClass('sticky-scroll-down').addClass('sticky-scroll-up');
           }
         }
         navpos = wt;
       });
       //clears all scrolling classes when in normal mode.
       $('.script-navigation').on('fg.stickycomponent.normal', function(e, g, wt) {
         $(this).removeClass('sticky-scroll-down sticky-scroll-up');
       });
     }
   );

   if (($('.awards-ticker').length > 0) && (typeof $().newsTicker === 'function')) {
     $('.awards-ticker').newsTicker({
       row_height: 120,
       max_rows: 3,
       speed: 1000,
       direction: 'up',
       duration: 6000,
       autostart: 1,
       pauseOnHover: 0
     });
   }

   if (($('.fg-wow').length > 0) && (typeof WOW === 'function')) {
     var wow = new WOW({
       boxClass: 'fg-wow', // animated element css class (default is wow)
       animateClass: 'animated', // animation css class (default is animated)
       offset: 0, // distance to the element when triggering the animation (default is 0)
       mobile: false, // trigger animations on mobile devices (default is true)
       live: true, // act on asynchronously loaded content (default is true)
       callback: function(box) {

       },
       scrollContainer: null // optional scroll container selector, otherwise use window
     });
     wow.init();
   }

 });

 ;
 /*! WOW - v1.1.2 - 2016-04-08
  * Copyright (c) 2016 Matthieu Aussaguel;*/
 (function() {
   var a, b, c, d, e, f = function(a, b) {
       return function() {
         return a.apply(b, arguments)
       }
     },
     g = [].indexOf || function(a) {
       for (var b = 0, c = this.length; c > b; b++)
         if (b in this && this[b] === a) return b;
       return -1
     };
   b = function() {
     function a() {}
     return a.prototype.extend = function(a, b) {
       var c, d;
       for (c in b) d = b[c], null == a[c] && (a[c] = d);
       return a
     }, a.prototype.isMobile = function(a) {
       return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(a)
     }, a.prototype.createEvent = function(a, b, c, d) {
       var e;
       return null == b && (b = !1), null == c && (c = !1), null == d && (d = null), null != document.createEvent ? (e = document.createEvent("CustomEvent"), e.initCustomEvent(a, b, c, d)) : null != document.createEventObject ? (e = document.createEventObject(), e.eventType = a) : e.eventName = a, e
     }, a.prototype.emitEvent = function(a, b) {
       return null != a.dispatchEvent ? a.dispatchEvent(b) : b in (null != a) ? a[b]() : "on" + b in (null != a) ? a["on" + b]() : void 0
     }, a.prototype.addEvent = function(a, b, c) {
       return null != a.addEventListener ? a.addEventListener(b, c, !1) : null != a.attachEvent ? a.attachEvent("on" + b, c) : a[b] = c
     }, a.prototype.removeEvent = function(a, b, c) {
       return null != a.removeEventListener ? a.removeEventListener(b, c, !1) : null != a.detachEvent ? a.detachEvent("on" + b, c) : delete a[b]
     }, a.prototype.innerHeight = function() {
       return "innerHeight" in window ? window.innerHeight : document.documentElement.clientHeight
     }, a
   }(), c = this.WeakMap || this.MozWeakMap || (c = function() {
     function a() {
       this.keys = [], this.values = []
     }
     return a.prototype.get = function(a) {
       var b, c, d, e, f;
       for (f = this.keys, b = d = 0, e = f.length; e > d; b = ++d)
         if (c = f[b], c === a) return this.values[b]
     }, a.prototype.set = function(a, b) {
       var c, d, e, f, g;
       for (g = this.keys, c = e = 0, f = g.length; f > e; c = ++e)
         if (d = g[c], d === a) return void(this.values[c] = b);
       return this.keys.push(a), this.values.push(b)
     }, a
   }()), a = this.MutationObserver || this.WebkitMutationObserver || this.MozMutationObserver || (a = function() {
     function a() {
       "undefined" != typeof console && null !== console && console.warn("MutationObserver is not supported by your browser."), "undefined" != typeof console && null !== console && console.warn("WOW.js cannot detect dom mutations, please call .sync() after loading new content.")
     }
     return a.notSupported = !0, a.prototype.observe = function() {}, a
   }()), d = this.getComputedStyle || function(a, b) {
     return this.getPropertyValue = function(b) {
       var c;
       return "float" === b && (b = "styleFloat"), e.test(b) && b.replace(e, function(a, b) {
         return b.toUpperCase()
       }), (null != (c = a.currentStyle) ? c[b] : void 0) || null
     }, this
   }, e = /(\-([a-z]){1})/g, this.WOW = function() {
     function e(a) {
       null == a && (a = {}), this.scrollCallback = f(this.scrollCallback, this), this.scrollHandler = f(this.scrollHandler, this), this.resetAnimation = f(this.resetAnimation, this), this.start = f(this.start, this), this.scrolled = !0, this.config = this.util().extend(a, this.defaults), null != a.scrollContainer && (this.config.scrollContainer = document.querySelector(a.scrollContainer)), this.animationNameCache = new c, this.wowEvent = this.util().createEvent(this.config.boxClass)
     }
     return e.prototype.defaults = {
       boxClass: "wow",
       animateClass: "animated",
       offset: 0,
       mobile: !0,
       live: !0,
       callback: null,
       scrollContainer: null
     }, e.prototype.init = function() {
       var a;
       return this.element = window.document.documentElement, "interactive" === (a = document.readyState) || "complete" === a ? this.start() : this.util().addEvent(document, "DOMContentLoaded", this.start), this.finished = []
     }, e.prototype.start = function() {
       var b, c, d, e;
       if (this.stopped = !1, this.boxes = function() {
           var a, c, d, e;
           for (d = this.element.querySelectorAll("." + this.config.boxClass), e = [], a = 0, c = d.length; c > a; a++) b = d[a], e.push(b);
           return e
         }.call(this), this.all = function() {
           var a, c, d, e;
           for (d = this.boxes, e = [], a = 0, c = d.length; c > a; a++) b = d[a], e.push(b);
           return e
         }.call(this), this.boxes.length)
         if (this.disabled()) this.resetStyle();
         else
           for (e = this.boxes, c = 0, d = e.length; d > c; c++) b = e[c], this.applyStyle(b, !0);
       return this.disabled() || (this.util().addEvent(this.config.scrollContainer || window, "scroll", this.scrollHandler), this.util().addEvent(window, "resize", this.scrollHandler), this.interval = setInterval(this.scrollCallback, 50)), this.config.live ? new a(function(a) {
         return function(b) {
           var c, d, e, f, g;
           for (g = [], c = 0, d = b.length; d > c; c++) f = b[c], g.push(function() {
             var a, b, c, d;
             for (c = f.addedNodes || [], d = [], a = 0, b = c.length; b > a; a++) e = c[a], d.push(this.doSync(e));
             return d
           }.call(a));
           return g
         }
       }(this)).observe(document.body, {
         childList: !0,
         subtree: !0
       }) : void 0
     }, e.prototype.stop = function() {
       return this.stopped = !0, this.util().removeEvent(this.config.scrollContainer || window, "scroll", this.scrollHandler), this.util().removeEvent(window, "resize", this.scrollHandler), null != this.interval ? clearInterval(this.interval) : void 0
     }, e.prototype.sync = function(b) {
       return a.notSupported ? this.doSync(this.element) : void 0
     }, e.prototype.doSync = function(a) {
       var b, c, d, e, f;
       if (null == a && (a = this.element), 1 === a.nodeType) {
         for (a = a.parentNode || a, e = a.querySelectorAll("." + this.config.boxClass), f = [], c = 0, d = e.length; d > c; c++) b = e[c], g.call(this.all, b) < 0 ? (this.boxes.push(b), this.all.push(b), this.stopped || this.disabled() ? this.resetStyle() : this.applyStyle(b, !0), f.push(this.scrolled = !0)) : f.push(void 0);
         return f
       }
     }, e.prototype.show = function(a) {
       return this.applyStyle(a), a.className = a.className + " " + this.config.animateClass, null != this.config.callback && this.config.callback(a), this.util().emitEvent(a, this.wowEvent), this.util().addEvent(a, "animationend", this.resetAnimation), this.util().addEvent(a, "oanimationend", this.resetAnimation), this.util().addEvent(a, "webkitAnimationEnd", this.resetAnimation), this.util().addEvent(a, "MSAnimationEnd", this.resetAnimation), a
     }, e.prototype.applyStyle = function(a, b) {
       var c, d, e;
       return d = a.getAttribute("data-wow-duration"), c = a.getAttribute("data-wow-delay"), e = a.getAttribute("data-wow-iteration"), this.animate(function(f) {
         return function() {
           return f.customStyle(a, b, d, c, e)
         }
       }(this))
     }, e.prototype.animate = function() {
       return "requestAnimationFrame" in window ? function(a) {
         return window.requestAnimationFrame(a)
       } : function(a) {
         return a()
       }
     }(), e.prototype.resetStyle = function() {
       var a, b, c, d, e;
       for (d = this.boxes, e = [], b = 0, c = d.length; c > b; b++) a = d[b], e.push(a.style.visibility = "visible");
       return e
     }, e.prototype.resetAnimation = function(a) {
       var b;
       return a.type.toLowerCase().indexOf("animationend") >= 0 ? (b = a.target || a.srcElement, b.className = b.className.replace(this.config.animateClass, "").trim()) : void 0
     }, e.prototype.customStyle = function(a, b, c, d, e) {
       return b && this.cacheAnimationName(a), a.style.visibility = b ? "hidden" : "visible", c && this.vendorSet(a.style, {
         animationDuration: c
       }), d && this.vendorSet(a.style, {
         animationDelay: d
       }), e && this.vendorSet(a.style, {
         animationIterationCount: e
       }), this.vendorSet(a.style, {
         animationName: b ? "none" : this.cachedAnimationName(a)
       }), a
     }, e.prototype.vendors = ["moz", "webkit"], e.prototype.vendorSet = function(a, b) {
       var c, d, e, f;
       d = [];
       for (c in b) e = b[c], a["" + c] = e, d.push(function() {
         var b, d, g, h;
         for (g = this.vendors, h = [], b = 0, d = g.length; d > b; b++) f = g[b], h.push(a["" + f + c.charAt(0).toUpperCase() + c.substr(1)] = e);
         return h
       }.call(this));
       return d
     }, e.prototype.vendorCSS = function(a, b) {
       var c, e, f, g, h, i;
       for (h = d(a), g = h.getPropertyCSSValue(b), f = this.vendors, c = 0, e = f.length; e > c; c++) i = f[c], g = g || h.getPropertyCSSValue("-" + i + "-" + b);
       return g
     }, e.prototype.animationName = function(a) {
       var b;
       try {
         b = this.vendorCSS(a, "animation-name").cssText
       } catch (c) {
         b = d(a).getPropertyValue("animation-name")
       }
       return "none" === b ? "" : b
     }, e.prototype.cacheAnimationName = function(a) {
       return this.animationNameCache.set(a, this.animationName(a))
     }, e.prototype.cachedAnimationName = function(a) {
       return this.animationNameCache.get(a)
     }, e.prototype.scrollHandler = function() {
       return this.scrolled = !0
     }, e.prototype.scrollCallback = function() {
       var a;
       return !this.scrolled || (this.scrolled = !1, this.boxes = function() {
         var b, c, d, e;
         for (d = this.boxes, e = [], b = 0, c = d.length; c > b; b++) a = d[b], a && (this.isVisible(a) ? this.show(a) : e.push(a));
         return e
       }.call(this), this.boxes.length || this.config.live) ? void 0 : this.stop()
     }, e.prototype.offsetTop = function(a) {
       for (var b; void 0 === a.offsetTop;) a = a.parentNode;
       for (b = a.offsetTop; a = a.offsetParent;) b += a.offsetTop;
       return b
     }, e.prototype.isVisible = function(a) {
       var b, c, d, e, f;
       return c = a.getAttribute("data-wow-offset") || this.config.offset, f = this.config.scrollContainer && this.config.scrollContainer.scrollTop || window.pageYOffset, e = f + Math.min(this.element.clientHeight, this.util().innerHeight()) - c, d = this.offsetTop(a), b = d + a.clientHeight, e >= d && b >= f
     }, e.prototype.util = function() {
       return null != this._util ? this._util : this._util = new b
     }, e.prototype.disabled = function() {
       return !this.config.mobile && this.util().isMobile(navigator.userAgent)
     }, e
   }()
 }).call(this);
