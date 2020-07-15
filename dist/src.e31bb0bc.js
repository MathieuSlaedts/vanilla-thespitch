// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"../node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    link.remove();
  };

  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"../node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"../node_modules/bulma/bulma.sass":[function(require,module,exports) {

        var reloadCSS = require('_css_loader');
        module.hot.dispose(reloadCSS);
        module.hot.accept(reloadCSS);
      
},{"_css_loader":"../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"assets/style.scss":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"webcam.min.js":[function(require,module,exports) {
var define;
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

// WebcamJS v1.0.25 - http://github.com/jhuckaby/webcamjs - MIT Licensed
(function (e) {
  var t;

  function a() {
    var e = Error.apply(this, arguments);
    e.name = this.name = "FlashError";
    this.stack = e.stack;
    this.message = e.message;
  }

  function i() {
    var e = Error.apply(this, arguments);
    e.name = this.name = "WebcamError";
    this.stack = e.stack;
    this.message = e.message;
  }

  var s = function s() {};

  s.prototype = Error.prototype;
  a.prototype = new s();
  i.prototype = new s();
  var Webcam = {
    version: "1.0.26",
    protocol: location.protocol.match(/https/i) ? "https" : "http",
    loaded: false,
    live: false,
    userMedia: true,
    iOS: /iPad|iPhone|iPod/.test(navigator.userAgent) && !e.MSStream,
    params: {
      width: 0,
      height: 0,
      dest_width: 0,
      dest_height: 0,
      image_format: "jpeg",
      jpeg_quality: 90,
      enable_flash: true,
      force_flash: false,
      flip_horiz: false,
      fps: 30,
      upload_name: "webcam",
      constraints: null,
      swfURL: "",
      flashNotDetectedText: "ERROR: No Adobe Flash Player detected.  Webcam.js relies on Flash for browsers that do not support getUserMedia (like yours).",
      noInterfaceFoundText: "No supported webcam interface found.",
      unfreeze_snap: true,
      iosPlaceholderText: "Click here to open camera.",
      user_callback: null,
      user_canvas: null
    },
    errors: {
      FlashError: a,
      WebcamError: i
    },
    hooks: {},
    init: function init() {
      var t = this;
      this.mediaDevices = navigator.mediaDevices && navigator.mediaDevices.getUserMedia ? navigator.mediaDevices : navigator.mozGetUserMedia || navigator.webkitGetUserMedia ? {
        getUserMedia: function getUserMedia(e) {
          return new Promise(function (t, a) {
            (navigator.mozGetUserMedia || navigator.webkitGetUserMedia).call(navigator, e, t, a);
          });
        }
      } : null;
      e.URL = e.URL || e.webkitURL || e.mozURL || e.msURL;
      this.userMedia = this.userMedia && !!this.mediaDevices && !!e.URL;

      if (navigator.userAgent.match(/Firefox\D+(\d+)/)) {
        if (parseInt(RegExp.$1, 10) < 21) this.userMedia = null;
      }

      if (this.userMedia) {
        e.addEventListener("beforeunload", function (e) {
          t.reset();
        });
      }
    },
    exifOrientation: function exifOrientation(e) {
      var t = new DataView(e);

      if (t.getUint8(0) != 255 || t.getUint8(1) != 216) {
        console.log("Not a valid JPEG file");
        return 0;
      }

      var a = 2;
      var i = null;

      while (a < e.byteLength) {
        if (t.getUint8(a) != 255) {
          console.log("Not a valid marker at offset " + a + ", found: " + t.getUint8(a));
          return 0;
        }

        i = t.getUint8(a + 1);

        if (i == 225) {
          a += 4;
          var s = "";

          for (n = 0; n < 4; n++) {
            s += String.fromCharCode(t.getUint8(a + n));
          }

          if (s != "Exif") {
            console.log("Not valid EXIF data found");
            return 0;
          }

          a += 6;
          var r = null;

          if (t.getUint16(a) == 18761) {
            r = false;
          } else if (t.getUint16(a) == 19789) {
            r = true;
          } else {
            console.log("Not valid TIFF data! (no 0x4949 or 0x4D4D)");
            return 0;
          }

          if (t.getUint16(a + 2, !r) != 42) {
            console.log("Not valid TIFF data! (no 0x002A)");
            return 0;
          }

          var o = t.getUint32(a + 4, !r);

          if (o < 8) {
            console.log("Not valid TIFF data! (First offset less than 8)", t.getUint32(a + 4, !r));
            return 0;
          }

          var l = a + o;
          var h = t.getUint16(l, !r);

          for (var c = 0; c < h; c++) {
            var d = l + c * 12 + 2;

            if (t.getUint16(d, !r) == 274) {
              var f = t.getUint16(d + 2, !r);
              var m = t.getUint32(d + 4, !r);

              if (f != 3 && m != 1) {
                console.log("Invalid EXIF orientation value type (" + f + ") or count (" + m + ")");
                return 0;
              }

              var p = t.getUint16(d + 8, !r);

              if (p < 1 || p > 8) {
                console.log("Invalid EXIF orientation value (" + p + ")");
                return 0;
              }

              return p;
            }
          }
        } else {
          a += 2 + t.getUint16(a + 2);
        }
      }

      return 0;
    },
    fixOrientation: function fixOrientation(e, t, a) {
      var i = new Image();
      i.addEventListener("load", function (e) {
        var s = document.createElement("canvas");
        var r = s.getContext("2d");

        if (t < 5) {
          s.width = i.width;
          s.height = i.height;
        } else {
          s.width = i.height;
          s.height = i.width;
        }

        switch (t) {
          case 2:
            r.transform(-1, 0, 0, 1, i.width, 0);
            break;

          case 3:
            r.transform(-1, 0, 0, -1, i.width, i.height);
            break;

          case 4:
            r.transform(1, 0, 0, -1, 0, i.height);
            break;

          case 5:
            r.transform(0, 1, 1, 0, 0, 0);
            break;

          case 6:
            r.transform(0, 1, -1, 0, i.height, 0);
            break;

          case 7:
            r.transform(0, -1, -1, 0, i.height, i.width);
            break;

          case 8:
            r.transform(0, -1, 1, 0, 0, i.width);
            break;
        }

        r.drawImage(i, 0, 0);
        a.src = s.toDataURL();
      }, false);
      i.src = e;
    },
    attach: function attach(a) {
      if (typeof a == "string") {
        a = document.getElementById(a) || document.querySelector(a);
      }

      if (!a) {
        return this.dispatch("error", new i("Could not locate DOM element to attach to."));
      }

      this.container = a;
      a.innerHTML = "";
      var s = document.createElement("div");
      a.appendChild(s);
      this.peg = s;
      if (!this.params.width) this.params.width = a.offsetWidth;
      if (!this.params.height) this.params.height = a.offsetHeight;

      if (!this.params.width || !this.params.height) {
        return this.dispatch("error", new i("No width and/or height for webcam.  Please call set() first, or attach to a visible element."));
      }

      if (!this.params.dest_width) this.params.dest_width = this.params.width;
      if (!this.params.dest_height) this.params.dest_height = this.params.height;
      this.userMedia = t === undefined ? this.userMedia : t;

      if (this.params.force_flash) {
        t = this.userMedia;
        this.userMedia = null;
      }

      if (typeof this.params.fps !== "number") this.params.fps = 30;
      var r = this.params.width / this.params.dest_width;
      var o = this.params.height / this.params.dest_height;

      if (this.userMedia) {
        var n = document.createElement("video");
        n.setAttribute("autoplay", "autoplay");
        n.setAttribute("playsinline", "playsinline");
        n.style.width = "" + this.params.dest_width + "px";
        n.style.height = "" + this.params.dest_height + "px";

        if (r != 1 || o != 1) {
          a.style.overflow = "hidden";
          n.style.webkitTransformOrigin = "0px 0px";
          n.style.mozTransformOrigin = "0px 0px";
          n.style.msTransformOrigin = "0px 0px";
          n.style.oTransformOrigin = "0px 0px";
          n.style.transformOrigin = "0px 0px";
          n.style.webkitTransform = "scaleX(" + r + ") scaleY(" + o + ")";
          n.style.mozTransform = "scaleX(" + r + ") scaleY(" + o + ")";
          n.style.msTransform = "scaleX(" + r + ") scaleY(" + o + ")";
          n.style.oTransform = "scaleX(" + r + ") scaleY(" + o + ")";
          n.style.transform = "scaleX(" + r + ") scaleY(" + o + ")";
        }

        a.appendChild(n);
        this.video = n;
        var l = this;
        this.mediaDevices.getUserMedia({
          audio: false,
          video: this.params.constraints || {
            mandatory: {
              minWidth: this.params.dest_width,
              minHeight: this.params.dest_height
            }
          }
        }).then(function (t) {
          n.onloadedmetadata = function (e) {
            l.stream = t;
            l.loaded = true;
            l.live = true;
            l.dispatch("load");
            l.dispatch("live");
            l.flip();
          };

          if ("srcObject" in n) {
            n.srcObject = t;
          } else {
            n.src = e.URL.createObjectURL(t);
          }
        }).catch(function (e) {
          if (l.params.enable_flash && l.detectFlash()) {
            setTimeout(function () {
              l.params.force_flash = 1;
              l.attach(a);
            }, 1);
          } else {
            l.dispatch("error", e);
          }
        });
      } else if (this.iOS) {
        var h = document.createElement("div");
        h.id = this.container.id + "-ios_div";
        h.className = "webcamjs-ios-placeholder";
        h.style.width = "" + this.params.width + "px";
        h.style.height = "" + this.params.height + "px";
        h.style.textAlign = "center";
        h.style.display = "table-cell";
        h.style.verticalAlign = "middle";
        h.style.backgroundRepeat = "no-repeat";
        h.style.backgroundSize = "contain";
        h.style.backgroundPosition = "center";
        var c = document.createElement("span");
        c.className = "webcamjs-ios-text";
        c.innerHTML = this.params.iosPlaceholderText;
        h.appendChild(c);
        var d = document.createElement("img");
        d.id = this.container.id + "-ios_img";
        d.style.width = "" + this.params.dest_width + "px";
        d.style.height = "" + this.params.dest_height + "px";
        d.style.display = "none";
        h.appendChild(d);
        var f = document.createElement("input");
        f.id = this.container.id + "-ios_input";
        f.setAttribute("type", "file");
        f.setAttribute("accept", "image/*");
        f.setAttribute("capture", "camera");
        var l = this;
        var m = this.params;
        f.addEventListener("change", function (e) {
          if (e.target.files.length > 0 && e.target.files[0].type.indexOf("image/") == 0) {
            var t = URL.createObjectURL(e.target.files[0]);
            var a = new Image();
            a.addEventListener("load", function (e) {
              var t = document.createElement("canvas");
              t.width = m.dest_width;
              t.height = m.dest_height;
              var i = t.getContext("2d");
              ratio = Math.min(a.width / m.dest_width, a.height / m.dest_height);
              var s = m.dest_width * ratio;
              var r = m.dest_height * ratio;
              var o = (a.width - s) / 2;
              var n = (a.height - r) / 2;
              i.drawImage(a, o, n, s, r, 0, 0, m.dest_width, m.dest_height);
              var l = t.toDataURL();
              d.src = l;
              h.style.backgroundImage = "url('" + l + "')";
            }, false);
            var i = new FileReader();
            i.addEventListener("load", function (e) {
              var i = l.exifOrientation(e.target.result);

              if (i > 1) {
                l.fixOrientation(t, i, a);
              } else {
                a.src = t;
              }
            }, false);
            var s = new XMLHttpRequest();
            s.open("GET", t, true);
            s.responseType = "blob";

            s.onload = function (e) {
              if (this.status == 200 || this.status === 0) {
                i.readAsArrayBuffer(this.response);
              }
            };

            s.send();
          }
        }, false);
        f.style.display = "none";
        a.appendChild(f);
        h.addEventListener("click", function (e) {
          if (m.user_callback) {
            l.snap(m.user_callback, m.user_canvas);
          } else {
            f.style.display = "block";
            f.focus();
            f.click();
            f.style.display = "none";
          }
        }, false);
        a.appendChild(h);
        this.loaded = true;
        this.live = true;
      } else if (this.params.enable_flash && this.detectFlash()) {
        e.Webcam = Webcam;
        var h = document.createElement("div");
        h.innerHTML = this.getSWFHTML();
        a.appendChild(h);
      } else {
        this.dispatch("error", new i(this.params.noInterfaceFoundText));
      }

      if (this.params.crop_width && this.params.crop_height) {
        var p = Math.floor(this.params.crop_width * r);
        var u = Math.floor(this.params.crop_height * o);
        a.style.width = "" + p + "px";
        a.style.height = "" + u + "px";
        a.style.overflow = "hidden";
        a.scrollLeft = Math.floor(this.params.width / 2 - p / 2);
        a.scrollTop = Math.floor(this.params.height / 2 - u / 2);
      } else {
        a.style.width = "" + this.params.width + "px";
        a.style.height = "" + this.params.height + "px";
      }
    },
    reset: function reset() {
      if (this.preview_active) this.unfreeze();
      this.unflip();

      if (this.userMedia) {
        if (this.stream) {
          if (this.stream.getVideoTracks) {
            var e = this.stream.getVideoTracks();
            if (e && e[0] && e[0].stop) e[0].stop();
          } else if (this.stream.stop) {
            this.stream.stop();
          }
        }

        delete this.stream;
        delete this.video;
      }

      if (this.userMedia !== true && this.loaded && !this.iOS) {
        var t = this.getMovie();
        if (t && t._releaseCamera) t._releaseCamera();
      }

      if (this.container) {
        this.container.innerHTML = "";
        delete this.container;
      }

      this.loaded = false;
      this.live = false;
    },
    set: function set() {
      if (arguments.length == 1) {
        for (var e in arguments[0]) {
          this.params[e] = arguments[0][e];
        }
      } else {
        this.params[arguments[0]] = arguments[1];
      }
    },
    on: function on(e, t) {
      e = e.replace(/^on/i, "").toLowerCase();
      if (!this.hooks[e]) this.hooks[e] = [];
      this.hooks[e].push(t);
    },
    off: function off(e, t) {
      e = e.replace(/^on/i, "").toLowerCase();

      if (this.hooks[e]) {
        if (t) {
          var a = this.hooks[e].indexOf(t);
          if (a > -1) this.hooks[e].splice(a, 1);
        } else {
          this.hooks[e] = [];
        }
      }
    },
    dispatch: function dispatch() {
      var t = arguments[0].replace(/^on/i, "").toLowerCase();
      var s = Array.prototype.slice.call(arguments, 1);

      if (this.hooks[t] && this.hooks[t].length) {
        for (var r = 0, o = this.hooks[t].length; r < o; r++) {
          var n = this.hooks[t][r];

          if (typeof n == "function") {
            n.apply(this, s);
          } else if (_typeof(n) == "object" && n.length == 2) {
            n[0][n[1]].apply(n[0], s);
          } else if (e[n]) {
            e[n].apply(e, s);
          }
        }

        return true;
      } else if (t == "error") {
        var l;

        if (s[0] instanceof a || s[0] instanceof i) {
          l = s[0].message;
        } else {
          l = "Could not access webcam: " + s[0].name + ": " + s[0].message + " " + s[0].toString();
        }

        alert("Webcam.js Error: " + l);
      }

      return false;
    },
    setSWFLocation: function setSWFLocation(e) {
      this.set("swfURL", e);
    },
    detectFlash: function detectFlash() {
      var t = "Shockwave Flash",
          a = "ShockwaveFlash.ShockwaveFlash",
          i = "application/x-shockwave-flash",
          s = e,
          r = navigator,
          o = false;

      if (typeof r.plugins !== "undefined" && _typeof(r.plugins[t]) === "object") {
        var n = r.plugins[t].description;

        if (n && typeof r.mimeTypes !== "undefined" && r.mimeTypes[i] && r.mimeTypes[i].enabledPlugin) {
          o = true;
        }
      } else if (typeof s.ActiveXObject !== "undefined") {
        try {
          var l = new ActiveXObject(a);

          if (l) {
            var h = l.GetVariable("$version");
            if (h) o = true;
          }
        } catch (e) {}
      }

      return o;
    },
    getSWFHTML: function getSWFHTML() {
      var t = "",
          i = this.params.swfURL;

      if (location.protocol.match(/file/)) {
        this.dispatch("error", new a("Flash does not work from local disk.  Please run from a web server."));
        return '<h3 style="color:red">ERROR: the Webcam.js Flash fallback does not work from local disk.  Please run it from a web server.</h3>';
      }

      if (!this.detectFlash()) {
        this.dispatch("error", new a("Adobe Flash Player not found.  Please install from get.adobe.com/flashplayer and try again."));
        return '<h3 style="color:red">' + this.params.flashNotDetectedText + "</h3>";
      }

      if (!i) {
        var s = "";
        var r = document.getElementsByTagName("script");

        for (var o = 0, n = r.length; o < n; o++) {
          var l = r[o].getAttribute("src");

          if (l && l.match(/\/webcam(\.min)?\.js/)) {
            s = l.replace(/\/webcam(\.min)?\.js.*$/, "");
            o = n;
          }
        }

        if (s) i = s + "/webcam.swf";else i = "webcam.swf";
      }

      if (e.localStorage && !localStorage.getItem("visited")) {
        this.params.new_user = 1;
        localStorage.setItem("visited", 1);
      }

      var h = "";

      for (var c in this.params) {
        if (h) h += "&";
        h += c + "=" + escape(this.params[c]);
      }

      t += '<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" type="application/x-shockwave-flash" codebase="' + this.protocol + '://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0" width="' + this.params.width + '" height="' + this.params.height + '" id="webcam_movie_obj" align="middle"><param name="wmode" value="opaque" /><param name="allowScriptAccess" value="always" /><param name="allowFullScreen" value="false" /><param name="movie" value="' + i + '" /><param name="loop" value="false" /><param name="menu" value="false" /><param name="quality" value="best" /><param name="bgcolor" value="#ffffff" /><param name="flashvars" value="' + h + '"/><embed id="webcam_movie_embed" src="' + i + '" wmode="opaque" loop="false" menu="false" quality="best" bgcolor="#ffffff" width="' + this.params.width + '" height="' + this.params.height + '" name="webcam_movie_embed" align="middle" allowScriptAccess="always" allowFullScreen="false" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" flashvars="' + h + '"></embed></object>';
      return t;
    },
    getMovie: function getMovie() {
      if (!this.loaded) return this.dispatch("error", new a("Flash Movie is not loaded yet"));
      var e = document.getElementById("webcam_movie_obj");
      if (!e || !e._snap) e = document.getElementById("webcam_movie_embed");
      if (!e) this.dispatch("error", new a("Cannot locate Flash movie in DOM"));
      return e;
    },
    freeze: function freeze() {
      var e = this;
      var t = this.params;
      if (this.preview_active) this.unfreeze();
      var a = this.params.width / this.params.dest_width;
      var i = this.params.height / this.params.dest_height;
      this.unflip();
      var s = t.crop_width || t.dest_width;
      var r = t.crop_height || t.dest_height;
      var o = document.createElement("canvas");
      o.width = s;
      o.height = r;
      var n = o.getContext("2d");
      this.preview_canvas = o;
      this.preview_context = n;

      if (a != 1 || i != 1) {
        o.style.webkitTransformOrigin = "0px 0px";
        o.style.mozTransformOrigin = "0px 0px";
        o.style.msTransformOrigin = "0px 0px";
        o.style.oTransformOrigin = "0px 0px";
        o.style.transformOrigin = "0px 0px";
        o.style.webkitTransform = "scaleX(" + a + ") scaleY(" + i + ")";
        o.style.mozTransform = "scaleX(" + a + ") scaleY(" + i + ")";
        o.style.msTransform = "scaleX(" + a + ") scaleY(" + i + ")";
        o.style.oTransform = "scaleX(" + a + ") scaleY(" + i + ")";
        o.style.transform = "scaleX(" + a + ") scaleY(" + i + ")";
      }

      this.snap(function () {
        o.style.position = "relative";
        o.style.left = "" + e.container.scrollLeft + "px";
        o.style.top = "" + e.container.scrollTop + "px";
        e.container.insertBefore(o, e.peg);
        e.container.style.overflow = "hidden";
        e.preview_active = true;
      }, o);
    },
    unfreeze: function unfreeze() {
      if (this.preview_active) {
        this.container.removeChild(this.preview_canvas);
        delete this.preview_context;
        delete this.preview_canvas;
        this.preview_active = false;
        this.flip();
      }
    },
    flip: function flip() {
      if (this.params.flip_horiz) {
        var e = this.container.style;
        e.webkitTransform = "scaleX(-1)";
        e.mozTransform = "scaleX(-1)";
        e.msTransform = "scaleX(-1)";
        e.oTransform = "scaleX(-1)";
        e.transform = "scaleX(-1)";
        e.filter = "FlipH";
        e.msFilter = "FlipH";
      }
    },
    unflip: function unflip() {
      if (this.params.flip_horiz) {
        var e = this.container.style;
        e.webkitTransform = "scaleX(1)";
        e.mozTransform = "scaleX(1)";
        e.msTransform = "scaleX(1)";
        e.oTransform = "scaleX(1)";
        e.transform = "scaleX(1)";
        e.filter = "";
        e.msFilter = "";
      }
    },
    savePreview: function savePreview(e, t) {
      var a = this.params;
      var i = this.preview_canvas;
      var s = this.preview_context;

      if (t) {
        var r = t.getContext("2d");
        r.drawImage(i, 0, 0);
      }

      e(t ? null : i.toDataURL("image/" + a.image_format, a.jpeg_quality / 100), i, s);
      if (this.params.unfreeze_snap) this.unfreeze();
    },
    snap: function snap(e, t) {
      if (!e) e = this.params.user_callback;
      if (!t) t = this.params.user_canvas;
      var a = this;
      var s = this.params;
      if (!this.loaded) return this.dispatch("error", new i("Webcam is not loaded yet"));
      if (!e) return this.dispatch("error", new i("Please provide a callback function or canvas to snap()"));

      if (this.preview_active) {
        this.savePreview(e, t);
        return null;
      }

      var r = document.createElement("canvas");
      r.width = this.params.dest_width;
      r.height = this.params.dest_height;
      var o = r.getContext("2d");

      if (this.params.flip_horiz) {
        o.translate(s.dest_width, 0);
        o.scale(-1, 1);
      }

      var n = function n() {
        if (this.src && this.width && this.height) {
          o.drawImage(this, 0, 0, s.dest_width, s.dest_height);
        }

        if (s.crop_width && s.crop_height) {
          var a = document.createElement("canvas");
          a.width = s.crop_width;
          a.height = s.crop_height;
          var i = a.getContext("2d");
          i.drawImage(r, Math.floor(s.dest_width / 2 - s.crop_width / 2), Math.floor(s.dest_height / 2 - s.crop_height / 2), s.crop_width, s.crop_height, 0, 0, s.crop_width, s.crop_height);
          o = i;
          r = a;
        }

        if (t) {
          var n = t.getContext("2d");
          n.drawImage(r, 0, 0);
        }

        e(t ? null : r.toDataURL("image/" + s.image_format, s.jpeg_quality / 100), r, o);
      };

      if (this.userMedia) {
        o.drawImage(this.video, 0, 0, this.params.dest_width, this.params.dest_height);
        n();
      } else if (this.iOS) {
        var l = document.getElementById(this.container.id + "-ios_div");
        var h = document.getElementById(this.container.id + "-ios_img");
        var c = document.getElementById(this.container.id + "-ios_input");

        iFunc = function (_iFunc) {
          function iFunc(_x) {
            return _iFunc.apply(this, arguments);
          }

          iFunc.toString = function () {
            return _iFunc.toString();
          };

          return iFunc;
        }(function (e) {
          n.call(h);
          h.removeEventListener("load", iFunc);
          l.style.backgroundImage = "none";
          h.removeAttribute("src");
          c.value = null;
        });

        if (!c.value) {
          h.addEventListener("load", iFunc);
          c.style.display = "block";
          c.focus();
          c.click();
          c.style.display = "none";
        } else {
          iFunc(null);
        }
      } else {
        var d = this.getMovie()._snap();

        var h = new Image();
        h.onload = n;
        h.src = "data:image/" + this.params.image_format + ";base64," + d;
      }

      return null;
    },
    configure: function configure(e) {
      if (!e) e = "camera";

      this.getMovie()._configure(e);
    },
    flashNotify: function flashNotify(e, t) {
      switch (e) {
        case "flashLoadComplete":
          this.loaded = true;
          this.dispatch("load");
          break;

        case "cameraLive":
          this.live = true;
          this.dispatch("live");
          break;

        case "error":
          this.dispatch("error", new a(t));
          break;

        default:
          break;
      }
    },
    b64ToUint6: function b64ToUint6(e) {
      return e > 64 && e < 91 ? e - 65 : e > 96 && e < 123 ? e - 71 : e > 47 && e < 58 ? e + 4 : e === 43 ? 62 : e === 47 ? 63 : 0;
    },
    base64DecToArr: function base64DecToArr(e, t) {
      var a = e.replace(/[^A-Za-z0-9\+\/]/g, ""),
          i = a.length,
          s = t ? Math.ceil((i * 3 + 1 >> 2) / t) * t : i * 3 + 1 >> 2,
          r = new Uint8Array(s);

      for (var o, n, l = 0, h = 0, c = 0; c < i; c++) {
        n = c & 3;
        l |= this.b64ToUint6(a.charCodeAt(c)) << 18 - 6 * n;

        if (n === 3 || i - c === 1) {
          for (o = 0; o < 3 && h < s; o++, h++) {
            r[h] = l >>> (16 >>> o & 24) & 255;
          }

          l = 0;
        }
      }

      return r;
    },
    upload: function upload(e, t, a) {
      var i = this.params.upload_name || "webcam";
      var s = "";
      if (e.match(/^data\:image\/(\w+)/)) s = RegExp.$1;else throw "Cannot locate image format in Data URI";
      var r = e.replace(/^data\:image\/\w+\;base64\,/, "");
      var o = new XMLHttpRequest();
      o.open("POST", t, true);

      if (o.upload && o.upload.addEventListener) {
        o.upload.addEventListener("progress", function (e) {
          if (e.lengthComputable) {
            var t = e.loaded / e.total;
            Webcam.dispatch("uploadProgress", t, e);
          }
        }, false);
      }

      var n = this;

      o.onload = function () {
        if (a) a.apply(n, [o.status, o.responseText, o.statusText]);
        Webcam.dispatch("uploadComplete", o.status, o.responseText, o.statusText);
      };

      var l = new Blob([this.base64DecToArr(r)], {
        type: "image/" + s
      });
      var h = new FormData();
      h.append(i, l, i + "." + s.replace(/e/, ""));
      o.send(h);
    }
  };
  Webcam.init();

  if (typeof define === "function" && define.amd) {
    define(function () {
      return Webcam;
    });
  } else if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && module.exports) {
    module.exports = Webcam;
  } else {
    e.Webcam = Webcam;
  }
})(window);
},{}],"../node_modules/axios/lib/helpers/bind.js":[function(require,module,exports) {
'use strict';

module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};

},{}],"../node_modules/axios/lib/utils.js":[function(require,module,exports) {
'use strict';

var bind = require('./helpers/bind');

/*global toString:true*/

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is a Buffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Buffer, otherwise false
 */
function isBuffer(val) {
  return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor)
    && typeof val.constructor.isBuffer === 'function' && val.constructor.isBuffer(val);
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(val) {
  return (typeof FormData !== 'undefined') && (val instanceof FormData);
}

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
function isFile(val) {
  return toString.call(val) === '[object File]';
}

/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.replace(/^\s*/, '').replace(/\s*$/, '');
}

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 * nativescript
 *  navigator.product -> 'NativeScript' or 'NS'
 */
function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && (navigator.product === 'ReactNative' ||
                                           navigator.product === 'NativeScript' ||
                                           navigator.product === 'NS')) {
    return false;
  }
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined'
  );
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = merge(result[key], val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Function equal to merge with the difference being that no reference
 * to original objects is kept.
 *
 * @see merge
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function deepMerge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = deepMerge(result[key], val);
    } else if (typeof val === 'object') {
      result[key] = deepMerge({}, val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

module.exports = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  deepMerge: deepMerge,
  extend: extend,
  trim: trim
};

},{"./helpers/bind":"../node_modules/axios/lib/helpers/bind.js"}],"../node_modules/axios/lib/helpers/buildURL.js":[function(require,module,exports) {
'use strict';

var utils = require('./../utils');

function encode(val) {
  return encodeURIComponent(val).
    replace(/%40/gi, '@').
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
module.exports = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      } else {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    var hashmarkIndex = url.indexOf('#');
    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }

    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};

},{"./../utils":"../node_modules/axios/lib/utils.js"}],"../node_modules/axios/lib/core/InterceptorManager.js":[function(require,module,exports) {
'use strict';

var utils = require('./../utils');

function InterceptorManager() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;

},{"./../utils":"../node_modules/axios/lib/utils.js"}],"../node_modules/axios/lib/core/transformData.js":[function(require,module,exports) {
'use strict';

var utils = require('./../utils');

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
module.exports = function transformData(data, headers, fns) {
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn(data, headers);
  });

  return data;
};

},{"./../utils":"../node_modules/axios/lib/utils.js"}],"../node_modules/axios/lib/cancel/isCancel.js":[function(require,module,exports) {
'use strict';

module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};

},{}],"../node_modules/axios/lib/helpers/normalizeHeaderName.js":[function(require,module,exports) {
'use strict';

var utils = require('../utils');

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};

},{"../utils":"../node_modules/axios/lib/utils.js"}],"../node_modules/axios/lib/core/enhanceError.js":[function(require,module,exports) {
'use strict';

/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The error.
 */
module.exports = function enhanceError(error, config, code, request, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }

  error.request = request;
  error.response = response;
  error.isAxiosError = true;

  error.toJSON = function() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: this.config,
      code: this.code
    };
  };
  return error;
};

},{}],"../node_modules/axios/lib/core/createError.js":[function(require,module,exports) {
'use strict';

var enhanceError = require('./enhanceError');

/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
module.exports = function createError(message, config, code, request, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, request, response);
};

},{"./enhanceError":"../node_modules/axios/lib/core/enhanceError.js"}],"../node_modules/axios/lib/core/settle.js":[function(require,module,exports) {
'use strict';

var createError = require('./createError');

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
module.exports = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  if (!validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError(
      'Request failed with status code ' + response.status,
      response.config,
      null,
      response.request,
      response
    ));
  }
};

},{"./createError":"../node_modules/axios/lib/core/createError.js"}],"../node_modules/axios/lib/helpers/isAbsoluteURL.js":[function(require,module,exports) {
'use strict';

/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
module.exports = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};

},{}],"../node_modules/axios/lib/helpers/combineURLs.js":[function(require,module,exports) {
'use strict';

/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
module.exports = function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
};

},{}],"../node_modules/axios/lib/core/buildFullPath.js":[function(require,module,exports) {
'use strict';

var isAbsoluteURL = require('../helpers/isAbsoluteURL');
var combineURLs = require('../helpers/combineURLs');

/**
 * Creates a new URL by combining the baseURL with the requestedURL,
 * only when the requestedURL is not already an absolute URL.
 * If the requestURL is absolute, this function returns the requestedURL untouched.
 *
 * @param {string} baseURL The base URL
 * @param {string} requestedURL Absolute or relative URL to combine
 * @returns {string} The combined full path
 */
module.exports = function buildFullPath(baseURL, requestedURL) {
  if (baseURL && !isAbsoluteURL(requestedURL)) {
    return combineURLs(baseURL, requestedURL);
  }
  return requestedURL;
};

},{"../helpers/isAbsoluteURL":"../node_modules/axios/lib/helpers/isAbsoluteURL.js","../helpers/combineURLs":"../node_modules/axios/lib/helpers/combineURLs.js"}],"../node_modules/axios/lib/helpers/parseHeaders.js":[function(require,module,exports) {
'use strict';

var utils = require('./../utils');

// Headers whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
var ignoreDuplicateOf = [
  'age', 'authorization', 'content-length', 'content-type', 'etag',
  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
  'last-modified', 'location', 'max-forwards', 'proxy-authorization',
  'referer', 'retry-after', 'user-agent'
];

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
module.exports = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) { return parsed; }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
        return;
      }
      if (key === 'set-cookie') {
        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
      }
    }
  });

  return parsed;
};

},{"./../utils":"../node_modules/axios/lib/utils.js"}],"../node_modules/axios/lib/helpers/isURLSameOrigin.js":[function(require,module,exports) {
'use strict';

var utils = require('./../utils');

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
    (function standardBrowserEnv() {
      var msie = /(msie|trident)/i.test(navigator.userAgent);
      var urlParsingNode = document.createElement('a');
      var originURL;

      /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
      function resolveURL(url) {
        var href = url;

        if (msie) {
        // IE needs attribute set twice to normalize properties
          urlParsingNode.setAttribute('href', href);
          href = urlParsingNode.href;
        }

        urlParsingNode.setAttribute('href', href);

        // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
        return {
          href: urlParsingNode.href,
          protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
          host: urlParsingNode.host,
          search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
          hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
          hostname: urlParsingNode.hostname,
          port: urlParsingNode.port,
          pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
            urlParsingNode.pathname :
            '/' + urlParsingNode.pathname
        };
      }

      originURL = resolveURL(window.location.href);

      /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
      return function isURLSameOrigin(requestURL) {
        var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
        return (parsed.protocol === originURL.protocol &&
            parsed.host === originURL.host);
      };
    })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return function isURLSameOrigin() {
        return true;
      };
    })()
);

},{"./../utils":"../node_modules/axios/lib/utils.js"}],"../node_modules/axios/lib/helpers/cookies.js":[function(require,module,exports) {
'use strict';

var utils = require('./../utils');

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs support document.cookie
    (function standardBrowserEnv() {
      return {
        write: function write(name, value, expires, path, domain, secure) {
          var cookie = [];
          cookie.push(name + '=' + encodeURIComponent(value));

          if (utils.isNumber(expires)) {
            cookie.push('expires=' + new Date(expires).toGMTString());
          }

          if (utils.isString(path)) {
            cookie.push('path=' + path);
          }

          if (utils.isString(domain)) {
            cookie.push('domain=' + domain);
          }

          if (secure === true) {
            cookie.push('secure');
          }

          document.cookie = cookie.join('; ');
        },

        read: function read(name) {
          var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
          return (match ? decodeURIComponent(match[3]) : null);
        },

        remove: function remove(name) {
          this.write(name, '', Date.now() - 86400000);
        }
      };
    })() :

  // Non standard browser env (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return {
        write: function write() {},
        read: function read() { return null; },
        remove: function remove() {}
      };
    })()
);

},{"./../utils":"../node_modules/axios/lib/utils.js"}],"../node_modules/axios/lib/adapters/xhr.js":[function(require,module,exports) {
'use strict';

var utils = require('./../utils');
var settle = require('./../core/settle');
var buildURL = require('./../helpers/buildURL');
var buildFullPath = require('../core/buildFullPath');
var parseHeaders = require('./../helpers/parseHeaders');
var isURLSameOrigin = require('./../helpers/isURLSameOrigin');
var createError = require('../core/createError');

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password || '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    var fullPath = buildFullPath(config.baseURL, config.url);
    request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    // Listen for ready state
    request.onreadystatechange = function handleLoad() {
      if (!request || request.readyState !== 4) {
        return;
      }

      // The request errored out and we didn't get a response, this will be
      // handled by onerror instead
      // With one exception: request that using file: protocol, most browsers
      // will return status as 0 even though it's a successful request
      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
        return;
      }

      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
      var response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(resolve, reject, response);

      // Clean up request
      request = null;
    };

    // Handle browser request cancellation (as opposed to a manual cancellation)
    request.onabort = function handleAbort() {
      if (!request) {
        return;
      }

      reject(createError('Request aborted', config, 'ECONNABORTED', request));

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config, null, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      var timeoutErrorMessage = 'timeout of ' + config.timeout + 'ms exceeded';
      if (config.timeoutErrorMessage) {
        timeoutErrorMessage = config.timeoutErrorMessage;
      }
      reject(createError(timeoutErrorMessage, config, 'ECONNABORTED',
        request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      var cookies = require('./../helpers/cookies');

      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath)) && config.xsrfCookieName ?
        cookies.read(config.xsrfCookieName) :
        undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    if (!utils.isUndefined(config.withCredentials)) {
      request.withCredentials = !!config.withCredentials;
    }

    // Add responseType to request if needed
    if (config.responseType) {
      try {
        request.responseType = config.responseType;
      } catch (e) {
        // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
        // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
        if (config.responseType !== 'json') {
          throw e;
        }
      }
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }

        request.abort();
        reject(cancel);
        // Clean up request
        request = null;
      });
    }

    if (requestData === undefined) {
      requestData = null;
    }

    // Send the request
    request.send(requestData);
  });
};

},{"./../utils":"../node_modules/axios/lib/utils.js","./../core/settle":"../node_modules/axios/lib/core/settle.js","./../helpers/buildURL":"../node_modules/axios/lib/helpers/buildURL.js","../core/buildFullPath":"../node_modules/axios/lib/core/buildFullPath.js","./../helpers/parseHeaders":"../node_modules/axios/lib/helpers/parseHeaders.js","./../helpers/isURLSameOrigin":"../node_modules/axios/lib/helpers/isURLSameOrigin.js","../core/createError":"../node_modules/axios/lib/core/createError.js","./../helpers/cookies":"../node_modules/axios/lib/helpers/cookies.js"}],"../node_modules/process/browser.js":[function(require,module,exports) {

// shim for using process in browser
var process = module.exports = {}; // cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
  throw new Error('setTimeout has not been defined');
}

function defaultClearTimeout() {
  throw new Error('clearTimeout has not been defined');
}

(function () {
  try {
    if (typeof setTimeout === 'function') {
      cachedSetTimeout = setTimeout;
    } else {
      cachedSetTimeout = defaultSetTimout;
    }
  } catch (e) {
    cachedSetTimeout = defaultSetTimout;
  }

  try {
    if (typeof clearTimeout === 'function') {
      cachedClearTimeout = clearTimeout;
    } else {
      cachedClearTimeout = defaultClearTimeout;
    }
  } catch (e) {
    cachedClearTimeout = defaultClearTimeout;
  }
})();

function runTimeout(fun) {
  if (cachedSetTimeout === setTimeout) {
    //normal enviroments in sane situations
    return setTimeout(fun, 0);
  } // if setTimeout wasn't available but was latter defined


  if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
    cachedSetTimeout = setTimeout;
    return setTimeout(fun, 0);
  }

  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedSetTimeout(fun, 0);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
      return cachedSetTimeout.call(null, fun, 0);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
      return cachedSetTimeout.call(this, fun, 0);
    }
  }
}

function runClearTimeout(marker) {
  if (cachedClearTimeout === clearTimeout) {
    //normal enviroments in sane situations
    return clearTimeout(marker);
  } // if clearTimeout wasn't available but was latter defined


  if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
    cachedClearTimeout = clearTimeout;
    return clearTimeout(marker);
  }

  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedClearTimeout(marker);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
      return cachedClearTimeout.call(null, marker);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
      // Some versions of I.E. have different rules for clearTimeout vs setTimeout
      return cachedClearTimeout.call(this, marker);
    }
  }
}

var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
  if (!draining || !currentQueue) {
    return;
  }

  draining = false;

  if (currentQueue.length) {
    queue = currentQueue.concat(queue);
  } else {
    queueIndex = -1;
  }

  if (queue.length) {
    drainQueue();
  }
}

function drainQueue() {
  if (draining) {
    return;
  }

  var timeout = runTimeout(cleanUpNextTick);
  draining = true;
  var len = queue.length;

  while (len) {
    currentQueue = queue;
    queue = [];

    while (++queueIndex < len) {
      if (currentQueue) {
        currentQueue[queueIndex].run();
      }
    }

    queueIndex = -1;
    len = queue.length;
  }

  currentQueue = null;
  draining = false;
  runClearTimeout(timeout);
}

process.nextTick = function (fun) {
  var args = new Array(arguments.length - 1);

  if (arguments.length > 1) {
    for (var i = 1; i < arguments.length; i++) {
      args[i - 1] = arguments[i];
    }
  }

  queue.push(new Item(fun, args));

  if (queue.length === 1 && !draining) {
    runTimeout(drainQueue);
  }
}; // v8 likes predictible objects


function Item(fun, array) {
  this.fun = fun;
  this.array = array;
}

Item.prototype.run = function () {
  this.fun.apply(null, this.array);
};

process.title = 'browser';
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues

process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) {
  return [];
};

process.binding = function (name) {
  throw new Error('process.binding is not supported');
};

process.cwd = function () {
  return '/';
};

process.chdir = function (dir) {
  throw new Error('process.chdir is not supported');
};

process.umask = function () {
  return 0;
};
},{}],"../node_modules/axios/lib/defaults.js":[function(require,module,exports) {
var process = require("process");
'use strict';

var utils = require('./utils');
var normalizeHeaderName = require('./helpers/normalizeHeaderName');

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = require('./adapters/xhr');
  } else if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
    // For node use HTTP adapter
    adapter = require('./adapters/http');
  }
  return adapter;
}

var defaults = {
  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Accept');
    normalizeHeaderName(headers, 'Content-Type');
    if (utils.isFormData(data) ||
      utils.isArrayBuffer(data) ||
      utils.isBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    if (utils.isObject(data)) {
      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
      return JSON.stringify(data);
    }
    return data;
  }],

  transformResponse: [function transformResponse(data) {
    /*eslint no-param-reassign:0*/
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (e) { /* Ignore */ }
    }
    return data;
  }],

  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  }
};

defaults.headers = {
  common: {
    'Accept': 'application/json, text/plain, */*'
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

module.exports = defaults;

},{"./utils":"../node_modules/axios/lib/utils.js","./helpers/normalizeHeaderName":"../node_modules/axios/lib/helpers/normalizeHeaderName.js","./adapters/xhr":"../node_modules/axios/lib/adapters/xhr.js","./adapters/http":"../node_modules/axios/lib/adapters/xhr.js","process":"../node_modules/process/browser.js"}],"../node_modules/axios/lib/core/dispatchRequest.js":[function(require,module,exports) {
'use strict';

var utils = require('./../utils');
var transformData = require('./transformData');
var isCancel = require('../cancel/isCancel');
var defaults = require('../defaults');

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData(
    config.data,
    config.headers,
    config.transformRequest
  );

  // Flatten headers
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers
  );

  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

  var adapter = config.adapter || defaults.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData(
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData(
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });
};

},{"./../utils":"../node_modules/axios/lib/utils.js","./transformData":"../node_modules/axios/lib/core/transformData.js","../cancel/isCancel":"../node_modules/axios/lib/cancel/isCancel.js","../defaults":"../node_modules/axios/lib/defaults.js"}],"../node_modules/axios/lib/core/mergeConfig.js":[function(require,module,exports) {
'use strict';

var utils = require('../utils');

/**
 * Config-specific merge-function which creates a new config-object
 * by merging two configuration objects together.
 *
 * @param {Object} config1
 * @param {Object} config2
 * @returns {Object} New object resulting from merging config2 to config1
 */
module.exports = function mergeConfig(config1, config2) {
  // eslint-disable-next-line no-param-reassign
  config2 = config2 || {};
  var config = {};

  var valueFromConfig2Keys = ['url', 'method', 'params', 'data'];
  var mergeDeepPropertiesKeys = ['headers', 'auth', 'proxy'];
  var defaultToConfig2Keys = [
    'baseURL', 'url', 'transformRequest', 'transformResponse', 'paramsSerializer',
    'timeout', 'withCredentials', 'adapter', 'responseType', 'xsrfCookieName',
    'xsrfHeaderName', 'onUploadProgress', 'onDownloadProgress',
    'maxContentLength', 'validateStatus', 'maxRedirects', 'httpAgent',
    'httpsAgent', 'cancelToken', 'socketPath'
  ];

  utils.forEach(valueFromConfig2Keys, function valueFromConfig2(prop) {
    if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    }
  });

  utils.forEach(mergeDeepPropertiesKeys, function mergeDeepProperties(prop) {
    if (utils.isObject(config2[prop])) {
      config[prop] = utils.deepMerge(config1[prop], config2[prop]);
    } else if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    } else if (utils.isObject(config1[prop])) {
      config[prop] = utils.deepMerge(config1[prop]);
    } else if (typeof config1[prop] !== 'undefined') {
      config[prop] = config1[prop];
    }
  });

  utils.forEach(defaultToConfig2Keys, function defaultToConfig2(prop) {
    if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    } else if (typeof config1[prop] !== 'undefined') {
      config[prop] = config1[prop];
    }
  });

  var axiosKeys = valueFromConfig2Keys
    .concat(mergeDeepPropertiesKeys)
    .concat(defaultToConfig2Keys);

  var otherKeys = Object
    .keys(config2)
    .filter(function filterAxiosKeys(key) {
      return axiosKeys.indexOf(key) === -1;
    });

  utils.forEach(otherKeys, function otherKeysDefaultToConfig2(prop) {
    if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    } else if (typeof config1[prop] !== 'undefined') {
      config[prop] = config1[prop];
    }
  });

  return config;
};

},{"../utils":"../node_modules/axios/lib/utils.js"}],"../node_modules/axios/lib/core/Axios.js":[function(require,module,exports) {
'use strict';

var utils = require('./../utils');
var buildURL = require('../helpers/buildURL');
var InterceptorManager = require('./InterceptorManager');
var dispatchRequest = require('./dispatchRequest');
var mergeConfig = require('./mergeConfig');

/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = arguments[1] || {};
    config.url = arguments[0];
  } else {
    config = config || {};
  }

  config = mergeConfig(this.defaults, config);

  // Set config.method
  if (config.method) {
    config.method = config.method.toLowerCase();
  } else if (this.defaults.method) {
    config.method = this.defaults.method.toLowerCase();
  } else {
    config.method = 'get';
  }

  // Hook up interceptors middleware
  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);

  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};

Axios.prototype.getUri = function getUri(config) {
  config = mergeConfig(this.defaults, config);
  return buildURL(config.url, config.params, config.paramsSerializer).replace(/^\?/, '');
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, data, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

module.exports = Axios;

},{"./../utils":"../node_modules/axios/lib/utils.js","../helpers/buildURL":"../node_modules/axios/lib/helpers/buildURL.js","./InterceptorManager":"../node_modules/axios/lib/core/InterceptorManager.js","./dispatchRequest":"../node_modules/axios/lib/core/dispatchRequest.js","./mergeConfig":"../node_modules/axios/lib/core/mergeConfig.js"}],"../node_modules/axios/lib/cancel/Cancel.js":[function(require,module,exports) {
'use strict';

/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */
function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;

module.exports = Cancel;

},{}],"../node_modules/axios/lib/cancel/CancelToken.js":[function(require,module,exports) {
'use strict';

var Cancel = require('./Cancel');

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel(message);
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

module.exports = CancelToken;

},{"./Cancel":"../node_modules/axios/lib/cancel/Cancel.js"}],"../node_modules/axios/lib/helpers/spread.js":[function(require,module,exports) {
'use strict';

/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */
module.exports = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};

},{}],"../node_modules/axios/lib/axios.js":[function(require,module,exports) {
'use strict';

var utils = require('./utils');
var bind = require('./helpers/bind');
var Axios = require('./core/Axios');
var mergeConfig = require('./core/mergeConfig');
var defaults = require('./defaults');

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios.Axios = Axios;

// Factory for creating new instances
axios.create = function create(instanceConfig) {
  return createInstance(mergeConfig(axios.defaults, instanceConfig));
};

// Expose Cancel & CancelToken
axios.Cancel = require('./cancel/Cancel');
axios.CancelToken = require('./cancel/CancelToken');
axios.isCancel = require('./cancel/isCancel');

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = require('./helpers/spread');

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports.default = axios;

},{"./utils":"../node_modules/axios/lib/utils.js","./helpers/bind":"../node_modules/axios/lib/helpers/bind.js","./core/Axios":"../node_modules/axios/lib/core/Axios.js","./core/mergeConfig":"../node_modules/axios/lib/core/mergeConfig.js","./defaults":"../node_modules/axios/lib/defaults.js","./cancel/Cancel":"../node_modules/axios/lib/cancel/Cancel.js","./cancel/CancelToken":"../node_modules/axios/lib/cancel/CancelToken.js","./cancel/isCancel":"../node_modules/axios/lib/cancel/isCancel.js","./helpers/spread":"../node_modules/axios/lib/helpers/spread.js"}],"../node_modules/axios/index.js":[function(require,module,exports) {
module.exports = require('./lib/axios');
},{"./lib/axios":"../node_modules/axios/lib/axios.js"}],"index.js":[function(require,module,exports) {
"use strict";

require("bulma");

require("./assets/style.scss");

require("./webcam.min.js");

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var formatDate = function formatDate(myDate) {
  var myDay = ("0" + myDate.getDate()).slice(-2);
  var myMonth = ("0" + (myDate.getMonth() + 1)).slice(-2);
  return myDate.getFullYear() + "" + myMonth + "" + myDay;
};

var myToday = function myToday() {
  var myDate = new Date();
  return formatDate(myDate);
};

var myTodayMinus15 = function myTodayMinus15() {
  var myDate = new Date();
  myDate.setDate(myDate.getDate() - 15);
  return formatDate(myDate);
};

var isBetween = function isBetween(n, a, b) {
  return (n - a) * (n - b) <= 0;
};
/*
 *
 *
 *
 * accueil
 *
 *
 *
 */


var ecranAccueil = document.querySelector("#ecran-accueil");
var ecranIdentification = document.querySelector("#ecran-identification");
var ecranInscription = document.querySelector("#ecran-inscription");
var ecranEntrer = document.querySelector("#ecran-entrer");
var ecranSortir = document.querySelector("#ecran-sortir");
var ecranProfil = document.querySelector("#ecran-profil");
var ecranFin = document.querySelector("#ecran-fin");
var ecranConfidentialite = document.querySelector("#ecran-confidentialite");
var ecrans = document.querySelectorAll(".ecran");
var retour = document.querySelectorAll(".retour");
var boutonSinscrire = document.querySelectorAll(".bouton-sinscrire a");
var retourIdentification = document.querySelector(".retour-identification");
ecranAccueil.addEventListener('click', function (ev) {
  return accueilHandler(ev);
});
retour.forEach(function (el) {
  el.addEventListener('click', function (ev) {
    return retourHandler(ev);
  });
});
boutonSinscrire.forEach(function (el) {
  el.addEventListener('click', function (ev) {
    return boutonSinscrireHandler(ev);
  });
});
retourIdentification.addEventListener('click', function (ev) {
  return retourIdentificationHandler(ev);
});

var accueilHandler = function accueilHandler(ev) {
  ev.preventDefault();
  if (ev.target.tagName !== "A") return;
  var target = ev.target.dataset.target;
  document.querySelector(target).classList.remove("is-hidden");
};

var retourHandler = function retourHandler(ev) {
  ev.preventDefault();
  if (ev.target.tagName !== "A") return;
  ecrans.forEach(function (element) {
    if (!element.classList.contains("is-hidden") && element.id !== 'ecran-accueil') {
      element.classList.add("is-hidden");
    }

    ;
  });
};

var boutonSinscrireHandler = function boutonSinscrireHandler(ev) {
  ev.preventDefault();
  if (ev.target.tagName !== "A") return;
  ecranInscription.classList.remove("is-hidden");
};

var retourIdentificationHandler = function retourIdentificationHandler(ev) {
  ev.preventDefault();
  if (ev.target.tagName !== "A") return;
  ecranInscription.classList.add("is-hidden");
  ecranIdentification.querySelector(".message").innerHTML = '';
};
/*
 *
 *
 *
 * 
 */


var requeteVisiteurs = "https://ingrwf-08.firebaseio.com/visiteurs.json";

var requeteUnVisiteur = function requeteUnVisiteur(idVisiteur) {
  return "https://ingrwf-08.firebaseio.com/visiteurs/" + idVisiteur + "/visites.json";
};
/*
 *
 *
 *
 * Identification
 *
 *
 *
 */


var identificationForm = document.querySelector("#identification");
identificationForm.addEventListener("click", function (ev) {
  return identification(ev);
});

var identification = function identification(ev) {
  ev.preventDefault();
  if (ev.target.tagName !== "BUTTON") return;
  var idVisiteur = identificationForm.querySelector("#id-visiteur").value;
  if (idVisiteur === "") return;

  _axios.default.get(requeteVisiteurs).then(function (response) {
    if (response.data[idVisiteur]) {
      var idVisiteurInput = document.querySelector("#visite-idVisiteur");
      var idVisiteurInputTest = document.querySelector("#visite-idVisiteur-test");
      idVisiteurInput.value = idVisiteur;
      idVisiteurInputTest.textContent = idVisiteur;
      ecranEntrer.classList.remove("is-hidden");
    } else {
      ecranIdentification.querySelector(".message").innerHTML = "<p>Cet identifiant n'est pas correct</p>";
    }
  });
};
/*
 *
 *
 *
 * Inscription
 *
 *
 *
 */


var inscriptionForm = document.querySelector("#inscription");
inscriptionForm.addEventListener("click", function (ev) {
  return inscription(ev);
});

var inscription = function inscription(ev) {
  ev.preventDefault();
  if (ev.target.tagName !== "BUTTON") return;
  var nouveauVisiteur = {
    nom: inscriptionForm.querySelector("#inscription-nom").value,
    prenom: inscriptionForm.querySelector("#inscription-prenom").value,
    email: inscriptionForm.querySelector("#inscription-email").value,
    photo: "hello.jpg"
  };

  _axios.default.post(requeteVisiteurs, nouveauVisiteur).then(function (response) {
    var idVisiteurInput = document.querySelector("#visite-idVisiteur");
    var idVisiteurInputTest = document.querySelector("#visite-idVisiteur-test");
    idVisiteurInput.value = response.data.name;
    idVisiteurInputTest.textContent = response.data.name;
    ecranEntrer.classList.remove("is-hidden");
  });
};

Webcam.set({
  width: 320,
  height: 240,
  image_format: 'jpeg',
  jpeg_quality: 90
});
Webcam.attach('#my_camera');

function take_snapshot() {
  Webcam.snap(function (data_uri) {
    document.getElementById('results').innerHTML = '<h2>Here is your image:</h2>' + '<img src="' + data_uri + '"/>';
  });
}
/*
 *
 *
 *
 * Entrer
 *
 *
 *
 */


var entrerForm = document.querySelector("#entrer");
var visiteObjet = document.querySelector("#visite-objet");
var visiteFormation = document.querySelector("#visite-formation");
var visiteFormationContainer = visiteFormation.closest(".field");
var visitePersonnel = document.querySelector("#visite-personnel");
var visitePersonnelContainer = visitePersonnel.closest(".field");
var visiteVisiteur = document.querySelector("#visite-idVisiteur");
entrerForm.addEventListener("click", function (ev) {
  return entrer(ev);
});
visiteObjet.addEventListener("change", function (ev) {
  return objetDeLaVisite(ev);
});

var objetDeLaVisite = function objetDeLaVisite(ev) {
  ev.preventDefault();
  /*
   *
   * Formation
   *
   */

  if (ev.target.value === "formation") {
    var urlPost = "https://mathieu.go.yo.fr/wp-json/wp/v2/formations";

    _axios.default.get(urlPost).then(function (response) {
      response.data.forEach(function (el) {
        var formationID = el.id;
        var formationTitle = el.title.rendered;
        var formationLocal = el.acf.local;
        var formationDebut = el.acf.formations_date_de_debut.split("/").reverse().join("");
        var formationFin = el.acf.formations_date_de_fin.split("/").reverse().join("");

        if (isBetween(myToday(), formationDebut, formationFin) !== false) {
          visiteFormation.innerHTML += '<option value="' + formationID + '" data-local="' + formationLocal + '">' + formationTitle + "</option>";
        }
      });
      visiteFormationContainer.classList.remove("is-hidden");

      if (!visitePersonnelContainer.classList.contains("is-hidden")) {
        visitePersonnelContainer.classList.add("is-hidden");
      }
    });
  }
  /*
   *
   * Personnel
   *
   */


  if (ev.target.value === "personnel") {
    var _urlPost = "http://mathieu.go.yo.fr/wp-json/wp/v2/membres_personnel";

    _axios.default.get(_urlPost).then(function (response) {
      response.data.forEach(function (el) {
        var personnelID = el.id;
        var personnelTitle = el.title.rendered;
        var personnelLocal = el.acf.local;
        visitePersonnel.innerHTML += '<option value="' + personnelID + '" data-local="' + personnelLocal + '">' + personnelTitle + "</option>";
      });
      visitePersonnelContainer.classList.remove("is-hidden");

      if (!visiteFormationContainer.classList.contains("is-hidden")) {
        visiteFormationContainer.classList.add("is-hidden");
      }
    });
  }
};
/*
 *
 * Entrer
 *
 */


var entrer = function entrer(ev) {
  ev.preventDefault();
  if (ev.target.tagName !== "BUTTON") return;
  if (visiteObjet.value !== "formation" && visiteObjet.value !== "personnel") return;
  var idVisite = "";
  var urlVisite = "";

  if (visiteObjet.value === "formation") {
    idVisite = visiteFormation.value;
    urlVisite = "http://mathieu.go.yo.fr/wp-json/wp/v2/formations/" + idVisite;
    console.log(ev);
  } else if (visiteObjet.value === "personnel") {
    idVisite = visitePersonnel.value;
    urlVisite = "http://mathieu.go.yo.fr/wp-json/wp/v2/membres_personnel/" + idVisite;
  }

  var idVisiteur = visiteVisiteur.value;
  var urlPost = "https://ingrwf-08.firebaseio.com/visiteurs/" + idVisiteur + "/visites.json";
  var nouvelleDate = {
    date: myToday(),
    objet: visiteObjet.value,
    id: idVisite,
    terminee: false
  };

  _axios.default.post(urlPost, nouvelleDate).then(function (response) {
    var requeteVisiteur = "https://ingrwf-08.firebaseio.com/visiteurs/" + idVisiteur + ".json";

    _axios.default.all([_axios.default.get(requeteVisiteur), _axios.default.get(urlVisite)]).then(function (response) {
      var visiteur = response[0].data;
      var visite = response[1].data;
      var content = "<h1>Bonjour " + visiteur.prenom + ", bonne visite</h1>";
      content += "<p>Nom:  " + visiteur.nom + "</p>";
      content += "<p>Prénom:  " + visiteur.prenom + "</p>";
      content += "<p>Identifiant: " + idVisiteur + "</p>";
      content += "<br />";

      if (visite.type === "membres_personnel") {
        content += "<p>Vous venez rendre visite à: " + visite.title.rendered + "</p>";
      }

      if (visite.type === "formations") {
        content += "<p>Vous venez ici pour la formation: " + visite.title.rendered + "</p>";
      }

      content += "<p>Veuillez vous rendre au Local: " + visite.acf.local + "</p>";
      ecranProfil.querySelector(".profil-datas").innerHTML = content;
      ecranProfil.classList.remove('is-hidden');
    });
  });
};
/*
 *
 * sortie
 *
 */


var sortirForm = document.querySelector("#sortir");
sortirForm.addEventListener("click", function (ev) {
  return terminerVisite(ev);
});

var terminerVisite = function terminerVisite(ev) {
  ev.preventDefault();
  if (ev.target.tagName !== "BUTTON") return;
  var idVisiteur = sortirForm.querySelector("#sortir-id-visiteur").value;
  if (idVisiteur === "") return;
  var urlPost = requeteUnVisiteur(idVisiteur);

  _axios.default.get(urlPost).then(function (response) {
    var visites = response.data;

    if (visites === null) {
      ecranSortir.querySelector('.message').innerHTML = "<p>Cet identifiant n'est pas correct</p>";
    }

    for (var visite in visites) {
      console.log("no");

      var _urlPost2 = "https://ingrwf-08.firebaseio.com/visiteurs/" + idVisiteur + "/visites/" + visite + "/terminee.json";

      _axios.default.put(_urlPost2, true).then(function (response) {
        ecranFin.classList.remove('is-hidden');
        setTimeout(window.location.reload.bind(window.location), 3000);
      });
    }
  });
};
/*
 *
 * Outdated
 *
 */


sortirForm.addEventListener("click", function (ev) {
  return supprimerDatePerimee(ev);
});

var supprimerDatePerimee = function supprimerDatePerimee(ev) {
  ev.preventDefault();
  if (ev.target.tagName !== "BUTTON") return; // const idVisiteur = sortirForm.querySelector("#sortir-id-visiteur");

  var urlPost = "https://ingrwf-08.firebaseio.com/visiteurs.json";

  _axios.default.get(urlPost).then(function (response) {
    var visiteurs = response.data;

    for (var visiteur in visiteurs) {
      // console.log(visiteurs[visiteur], visiteur);
      var visites = visiteurs[visiteur].visites;

      if (visites) {
        var deadline = myTodayMinus15(); // console.log(visites);

        for (var visite in visites) {
          //console.log(visites[visite].date);
          var visiteDate = visites[visite].date;

          if (visiteDate < deadline) {
            console.log("supprimer cette date: ", "id du visiteur: " + visiteur, "id de la visite: " + visite, "date de la visite: " + visiteDate, "date de la d'ajd: " + deadline);

            var _urlPost3 = "https://ingrwf-08.firebaseio.com/visiteurs/" + visiteur + "/visites/" + visite + ".json";

            _axios.default.delete(_urlPost3).then(function (response) {// console.log(response.data);
            });
          }
        }
      }
    }
  });
};
},{"bulma":"../node_modules/bulma/bulma.sass","./assets/style.scss":"assets/style.scss","./webcam.min.js":"webcam.min.js","axios":"../node_modules/axios/index.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "54948" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/src.e31bb0bc.js.map