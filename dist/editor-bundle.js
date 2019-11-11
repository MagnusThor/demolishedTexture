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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./editor/Editor.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./editor/Editor.js":
/*!**************************!*\
  !*** ./editor/Editor.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar demolishedTexture_1 = __webpack_require__(/*! ../src/demolishedTexture */ \"./src/demolishedTexture.js\");\nwindow[\"GeneratorPixel\"] = demolishedTexture_1.TextureGen.createTexture;\nwindow[\"Generator2D\"] = demolishedTexture_1.CanvasTextureGen.createTexture;\ndocument.addEventListener(\"DOMContentLoaded\", function () {\n    var instance;\n    var sel = document.querySelector.bind(document);\n    var showError = function (message) {\n        sel(\".error pre\").textContent = message;\n    };\n    var formatBytes = function (bytes, decimals) {\n        if (bytes == 0)\n            return \"0 Byte\";\n        var k = 1024;\n        var sizes = [\"Bytes\", \"KB\", \"MB\", \"GB\", \"TB\", \"PB\"];\n        var i = Math.floor(Math.log(bytes) / Math.log(k));\n        return parseFloat((bytes / Math.pow(k, i)).toFixed(decimals)) + \" \" + sizes[i];\n    };\n    var sizeOfBase64String = function (base64String) {\n        if (!base64String)\n            return 0;\n        var padding = (base64String.match(/(=*)$/) || [])[1].length;\n        return 4 * Math.ceil((base64String.length / 3)) - padding;\n    };\n    var toFile = function (context, fn) {\n        instance.toBlob(fn);\n    };\n    var createSrc = function (context, frag, size) {\n        var mi = context == \"GeneratorPixel\" ? \"pixel, x, y, w, h,v\" : \"ctx,x,y,w,h\";\n        var source = \"\\n        \" + context + \"(\" + size + \",\" + size + \",function(\" + mi + \") {\\n            \" + frag + \"\\n        });\";\n        return source;\n    };\n    var editor = CodeMirror.fromTextArea(document.getElementById(\"texture-editor\"), {\n        mode: \"text/javascript\",\n        theme: \"neonsyntax\",\n        lineWrapping: true,\n        lineNumbers: true,\n        styleActiveLine: true,\n        matchBrackets: true\n    });\n    var dt = performance.now() / 1000;\n    var update = function () {\n        showError(\"\");\n        var context = sel(\"select#sel-context\").value;\n        var size = sel(\"select#texture-size\").value;\n        var frag = editor.getValue();\n        var source = createSrc(context, frag, size);\n        instance = eval(source);\n        var base64 = instance.toBase64();\n        var el = sel(\"img.result\");\n        sel(\"#size\").textContent = formatBytes(sizeOfBase64String(base64), 2);\n        sel(\"#size-gen\").textContent = formatBytes(source.length + 1280, 2);\n        el.setAttribute(\"src\", base64);\n    };\n    sel(\"#btn-export\").addEventListener(\"click\", function () {\n        var context = sel(\"select#sel-context\").value;\n        var download = sel(\"#download\");\n        download.classList.remove(\"d-none\");\n        download.textContent = \"Wait...\";\n        toFile(context, function (b) {\n            var url = URL.createObjectURL(b);\n            download.setAttribute(\"href\", url);\n            download.textContent = \"result.png\";\n        });\n    });\n    editor.on(\"change\", function (e) {\n        var bounce = -(dt - (performance.now() / 1000));\n        if (bounce > 0.5)\n            update();\n        dt = performance.now() / 1000;\n    });\n    window.onerror = function (ex) {\n        showError(ex.toString());\n    };\n    update();\n});\n\n\n//# sourceURL=webpack:///./editor/Editor.js?");

/***/ }),

/***/ "./src/demolishedTexture.js":
/*!**********************************!*\
  !*** ./src/demolishedTexture.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __extends = (this && this.__extends) || (function () {\n    var extendStatics = function (d, b) {\n        extendStatics = Object.setPrototypeOf ||\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\n            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };\n        return extendStatics(d, b);\n    };\n    return function (d, b) {\n        extendStatics(d, b);\n        function __() { this.constructor = d; }\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n    };\n})();\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar TextureBase = (function () {\n    function TextureBase() {\n        this.perm = this.seed(255);\n    }\n    TextureBase.prototype.vec = function (x, y, z, a) {\n        return [x, y, z, a].filter(function (v) { return v; });\n    };\n    TextureBase.prototype.normalize = function (a) {\n        var l = this.length(a);\n        l != 0 ? a = this.func(a, function (v, i) {\n            return v / l;\n        }) : a = a;\n        return a;\n    };\n    TextureBase.prototype.R = function (a, b) {\n        return Math.abs((a * b) * 255);\n    };\n    TextureBase.prototype.abs = function (a) {\n        return a.map(function (v, i) { return Math.abs(v); });\n    };\n    TextureBase.prototype.func = function (a, exp) {\n        return a.map(function (v, i) { return exp(v, i); });\n    };\n    TextureBase.prototype.toScale = function (v, w) {\n        var a = 0, b = w, c = -1, d = 1.;\n        return (v - a) / (b - a) * (d - c) + c;\n    };\n    ;\n    TextureBase.prototype.dot = function (a, b) {\n        return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];\n    };\n    TextureBase.prototype.length = function (a) {\n        return Math.sqrt(a[0] * a[0] + a[1] * a[1] + a[2] * a[2]);\n    };\n    TextureBase.prototype.fade = function (t) {\n        return t * t * t * (t * (t * 6 - 15) + 10);\n    };\n    TextureBase.prototype.clamp = function (n, a, b) {\n        return n <= a ? a : n >= b ? b : n;\n    };\n    TextureBase.prototype.lerp = function (t, a, b) { return a + t * (b - a); };\n    TextureBase.prototype.grad = function (hash, x, y, z) {\n        var h = hash & 15;\n        var u = h < 8 ? x : y, v = h < 4 ? y : h == 12 || h == 14 ? x : z;\n        return ((h & 1) == 0 ? u : -u) + ((h & 2) == 0 ? v : -v);\n    };\n    TextureBase.prototype.scale = function (n) { return (1 + n) / 2; };\n    TextureBase.prototype.seed = function (n) {\n        var p = [];\n        for (var a = [], b = 0; n >= b; b++)\n            a.push(b);\n        for (b = 0; n >= b; b++) {\n            var c = n * Math.random(), d = a[~~c];\n            a.splice(c, 1, a[b]);\n            a.splice(b, 1, d);\n        }\n        ;\n        for (var i = 0; i < n; i++)\n            p[n + i] = p[i] = a[i];\n        return p;\n    };\n    TextureBase.prototype.noise = function (x, y, z) {\n        var t = this;\n        var p = this.perm;\n        var X = ~~(x) & 255, Y = ~~(y) & 255, Z = ~~(z) & 255;\n        x -= ~~(x);\n        y -= ~~(y);\n        z -= ~~(z);\n        var u = t.fade(x), v = t.fade(y), w = t.fade(z);\n        var A = p[X] + Y, AA = p[A] + Z, AB = p[A + 1] + Z, B = p[X + 1] + Y, BA = p[B] + Z, BB = p[B + 1] + Z;\n        return t.scale(t.lerp(w, t.lerp(v, t.lerp(u, t.grad(p[AA], x, y, z), t.grad(p[BA], x - 1, y, z)), t.lerp(u, t.grad(p[AB], x, y - 1, z), t.grad(p[BB], x - 1, y - 1, z))), t.lerp(v, t.lerp(u, t.grad(p[AA + 1], x, y, z - 1), t.grad(p[BA + 1], x - 1, y, z - 1)), t.lerp(u, t.grad(p[AB + 1], x, y - 1, z - 1), t.grad(p[BB + 1], x - 1, y - 1, z - 1)))));\n    };\n    return TextureBase;\n}());\nexports.TextureBase = TextureBase;\nvar TextureGen = (function () {\n    function TextureGen(width, height) {\n        var _this = this;\n        this.width = width;\n        this.height = height;\n        this.frag = function (pixel, x, y, w, h, v, fn) {\n            var r = pixel[0];\n            var g = pixel[1];\n            var b = pixel[2];\n            var t = _this.helpers;\n            var res = fn.apply(t, [[r, b, g], x, y, w, h, v]);\n            return res;\n        };\n        var c = document.createElement(\"canvas\");\n        c.width = width;\n        c.height = height;\n        this.ctx = c.getContext(\"2d\");\n        this.ctx.fillStyle = \"#0\";\n        this.ctx.fillRect(0, 0, this.width, this.height);\n        this.buffer = this.ctx.getImageData(0, 0, this.width, this.height);\n        this.helpers = new TextureBase();\n    }\n    TextureGen.createTexture = function (width, height, fn) {\n        var instance = new TextureGen(width, height);\n        instance.render(fn);\n        return instance;\n    };\n    TextureGen.prototype.render = function (fn) {\n        var buffer = this.buffer;\n        var w = this.width, h = this.height;\n        var s = this.helpers.toScale;\n        for (var idx, x = 0; x < w; x++) {\n            for (var y = 0; y < h; y++) {\n                idx = (x + y * w) * 4;\n                var r = buffer.data[idx + 0];\n                var g = buffer.data[idx + 1];\n                var b = buffer.data[idx + 2];\n                var v = [s(x, w), s(y, w), 0];\n                var pixel = this.frag([r, g, b], x, y, w, h, v, fn);\n                buffer.data[idx + 0] = pixel[0];\n                buffer.data[idx + 1] = pixel[1];\n                buffer.data[idx + 2] = pixel[2];\n            }\n        }\n        this.ctx.putImageData(buffer, 0, 0);\n    };\n    TextureGen.prototype.toBase64 = function () {\n        return this.ctx.canvas.toDataURL(\"image/png\");\n    };\n    TextureGen.prototype.toBlob = function (cb) {\n        this.ctx.canvas.toBlob(cb, \"image/png\");\n    };\n    return TextureGen;\n}());\nexports.TextureGen = TextureGen;\nvar CanvasTextureGen = (function (_super) {\n    __extends(CanvasTextureGen, _super);\n    function CanvasTextureGen(x, y, w, h) {\n        return _super.call(this, w, h) || this;\n    }\n    CanvasTextureGen.prototype.D = function (fn) {\n        var res = fn.apply(this.helpers, [this.ctx, 0, 0, this.width, this, this.height]);\n        return res;\n    };\n    CanvasTextureGen.createTexture = function (width, height, fn) {\n        var instance = new CanvasTextureGen(0, 0, width, height);\n        instance.D(fn);\n        return instance;\n    };\n    return CanvasTextureGen;\n}(TextureGen));\nexports.CanvasTextureGen = CanvasTextureGen;\n\n\n//# sourceURL=webpack:///./src/demolishedTexture.js?");

/***/ })

/******/ });