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
/******/ 	return __webpack_require__(__webpack_require__.s = "./example/Example.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./example/Example.js":
/*!****************************!*\
  !*** ./example/Example.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar __1 = __webpack_require__(/*! .. */ \"./index.js\");\nvar Example = (function () {\n    function Example() {\n        var text = __1.CanvasTextureGen.createTexture(512, 512, function (ctx, w, h) {\n            ctx.save();\n            ctx.fillStyle = \"#fff\";\n            var dx = w / 2;\n            var dy = h / 2;\n            ctx.strokeStyle = \"#fff\";\n            ctx.lineWidth = 10;\n            var sx = Math.random() * 2;\n            var sy = Math.random() * 2;\n            ctx.translate(sx, sy);\n            ctx.strokeRect(20, 20, 512 - 40, 512 - 40);\n            ctx.stroke();\n            ctx.font = \"120px 'Arial'\";\n            ctx.fillText(\"SUPER\", 40, 220, w);\n            ctx.font = \"bold 154px 'Arial'\";\n            ctx.fillText(\"SARA\", 35, 370, w);\n            ctx.restore();\n            return ctx;\n        });\n        document.querySelector(\"#textel\").setAttribute(\"src\", text);\n        var kaliset = __1.TextureGen.createTexture(512, 512, function (pixel, x, y, w, h, v) {\n            var t = this, m = Math;\n            var s = function (p) {\n                var e = 0, l = e;\n                for (var i = 0; i < 13; i++) {\n                    var pl = l;\n                    l = t.length(p);\n                    var dot = t.dot(p, p);\n                    p = t.func(p, function (v) {\n                        return m.abs(v) / dot - .5;\n                    });\n                    e += m.exp(-1 / m.abs(l - pl));\n                }\n                return e;\n            };\n            var k = s(v) * .18;\n            return [m.abs((k * 1.1) * 255), m.abs((k * k * 1.3) * 255), m.abs((k * k * k) * 255)];\n        });\n        document.querySelector(\"#kaliset\").setAttribute(\"src\", kaliset);\n        var noise = __1.TextureGen.createTexture(512, 512, function (pixel, x, y, w, h) {\n            var s, n, r, g, b, n;\n            x /= w;\n            y /= h;\n            s = 20;\n            n = this.noise(s * x, s * y, .8);\n            r = g = b = Math.round(255 * n);\n            return [r, g, b];\n        });\n        document.querySelector(\"#noise\").setAttribute(\"src\", noise);\n        var grass = __1.TextureGen.createTexture(512, 512, function (pixel, x, y, w, h) {\n            var sx, sy, r, g, b, n;\n            x /= w;\n            y /= h;\n            sx = 3;\n            sy = 44;\n            n = this.noise(sx * x, sy * y, .1);\n            x = (.2 + Math.sin(3.14 * x)) / 2;\n            y = (1 + Math.sin(n * 4 * y)) / 2;\n            b = n * y * x * 255;\n            r = y * b;\n            g = y * 255;\n            return [r, g, b];\n        });\n        document.querySelector(\"#grass\").setAttribute(\"src\", grass);\n    }\n    return Example;\n}());\nvar demo;\ndocument.addEventListener(\"DOMContentLoaded\", function () {\n    demo = new Example();\n});\n\n\n//# sourceURL=webpack:///./example/Example.js?");

/***/ }),

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nfunction __export(m) {\n    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];\n}\nObject.defineProperty(exports, \"__esModule\", { value: true });\n__export(__webpack_require__(/*! ./src/demolishedTexture */ \"./src/demolishedTexture.js\"));\n\n\n//# sourceURL=webpack:///./index.js?");

/***/ }),

/***/ "./src/demolishedTexture.js":
/*!**********************************!*\
  !*** ./src/demolishedTexture.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __extends = (this && this.__extends) || (function () {\n    var extendStatics = function (d, b) {\n        extendStatics = Object.setPrototypeOf ||\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\n            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };\n        return extendStatics(d, b);\n    };\n    return function (d, b) {\n        extendStatics(d, b);\n        function __() { this.constructor = d; }\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n    };\n})();\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar TextureBase = (function () {\n    function TextureBase() {\n        this.perm = this.seed(255);\n    }\n    TextureBase.prototype.vec = function (x, y, z, a) {\n        return [x, y, z, a].filter(function (v) { return v; });\n    };\n    TextureBase.prototype.normalize = function (a) {\n        var l = this.length(a);\n        l != 0 ? a = this.func(a, function (v, i) {\n            return v / l;\n        }) : a = a;\n        return a;\n    };\n    TextureBase.prototype.abs = function (a) {\n        return a.map(function (v, i) { return Math.abs(v); });\n    };\n    TextureBase.prototype.func = function (a, exp) {\n        return a.map(function (v, i) { return exp(v, i); });\n    };\n    TextureBase.prototype.toScale = function (v, w) {\n        var a = 0, b = w, c = -1, d = 1.;\n        return (v - a) / (b - a) * (d - c) + c;\n    };\n    ;\n    TextureBase.prototype.dot = function (a, b) {\n        return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];\n    };\n    TextureBase.prototype.length = function (a) {\n        return Math.sqrt(a[0] * a[0] + a[1] * a[1] + a[2] * a[2]);\n    };\n    TextureBase.prototype.fade = function (t) {\n        return t * t * t * (t * (t * 6 - 15) + 10);\n    };\n    TextureBase.prototype.lerp = function (t, a, b) { return a + t * (b - a); };\n    TextureBase.prototype.grad = function (hash, x, y, z) {\n        var h = hash & 15;\n        var u = h < 8 ? x : y, v = h < 4 ? y : h == 12 || h == 14 ? x : z;\n        return ((h & 1) == 0 ? u : -u) + ((h & 2) == 0 ? v : -v);\n    };\n    TextureBase.prototype.scale = function (n) { return (1 + n) / 2; };\n    TextureBase.prototype.seed = function (n) {\n        var p = [];\n        for (var a = [], b = 0; n >= b; b++)\n            a.push(b);\n        for (b = 0; n >= b; b++) {\n            var c = n * Math.random(), d = a[~~c];\n            a.splice(c, 1, a[b]);\n            a.splice(b, 1, d);\n        }\n        ;\n        for (var i = 0; i < n; i++)\n            p[n + i] = p[i] = a[i];\n        return p;\n    };\n    TextureBase.prototype.noise = function (x, y, z) {\n        var t = this;\n        var p = this.perm;\n        var X = ~~(x) & 255, Y = ~~(y) & 255, Z = ~~(z) & 255;\n        x -= ~~(x);\n        y -= ~~(y);\n        z -= ~~(z);\n        var u = t.fade(x), v = t.fade(y), w = t.fade(z);\n        var A = p[X] + Y, AA = p[A] + Z, AB = p[A + 1] + Z, B = p[X + 1] + Y, BA = p[B] + Z, BB = p[B + 1] + Z;\n        return t.scale(t.lerp(w, t.lerp(v, t.lerp(u, t.grad(p[AA], x, y, z), t.grad(p[BA], x - 1, y, z)), t.lerp(u, t.grad(p[AB], x, y - 1, z), t.grad(p[BB], x - 1, y - 1, z))), t.lerp(v, t.lerp(u, t.grad(p[AA + 1], x, y, z - 1), t.grad(p[BA + 1], x - 1, y, z - 1)), t.lerp(u, t.grad(p[AB + 1], x, y - 1, z - 1), t.grad(p[BB + 1], x - 1, y - 1, z - 1)))));\n    };\n    return TextureBase;\n}());\nexports.TextureBase = TextureBase;\nvar TextureGen = (function () {\n    function TextureGen(width, height) {\n        var _this = this;\n        this.width = width;\n        this.height = height;\n        this.frag = function (pixel, x, y, w, h, v, fn) {\n            var r = pixel[0];\n            var g = pixel[1];\n            var b = pixel[2];\n            var t = _this.helpers;\n            var res = fn.apply(t, [[r, b, g], x, y, w, h, v]);\n            return res;\n        };\n        var c = document.createElement(\"canvas\");\n        c.width = width;\n        c.height = height;\n        this.ctx = c.getContext(\"2d\");\n        this.ctx.fillStyle = \"#0\";\n        this.ctx.fillRect(0, 0, this.width, this.height);\n        this.buffer = this.ctx.getImageData(0, 0, this.width, this.height);\n        this.helpers = new TextureBase();\n    }\n    TextureGen.createTexture = function (width, height, fn) {\n        var instance = new TextureGen(width, height);\n        instance.render(fn);\n        return instance.toBase64();\n    };\n    TextureGen.prototype.render = function (fn) {\n        var buffer = this.buffer;\n        var w = this.width, h = this.height;\n        var s = this.helpers.toScale;\n        for (var idx, x = 0; x < w; x++) {\n            for (var y = 0; y < h; y++) {\n                idx = (x + y * w) * 4;\n                var r = buffer.data[idx + 0];\n                var g = buffer.data[idx + 1];\n                var b = buffer.data[idx + 2];\n                var v = [s(x, w), s(y, w), 0];\n                var pixel = this.frag([r, g, b], x, y, w, h, v, fn);\n                buffer.data[idx + 0] = pixel[0];\n                buffer.data[idx + 1] = pixel[1];\n                buffer.data[idx + 2] = pixel[2];\n            }\n        }\n        this.ctx.putImageData(buffer, 0, 0);\n    };\n    TextureGen.prototype.toBase64 = function () {\n        return this.ctx.canvas.toDataURL(\"image/png\");\n    };\n    return TextureGen;\n}());\nexports.TextureGen = TextureGen;\nvar CanvasTextureGen = (function (_super) {\n    __extends(CanvasTextureGen, _super);\n    function CanvasTextureGen(x, y, w, h) {\n        return _super.call(this, w, h) || this;\n    }\n    CanvasTextureGen.prototype.D = function (fn) {\n        var res = fn.apply(this.helpers, [this.ctx, 0, 0, this.width, this, this.height]);\n        return res;\n    };\n    CanvasTextureGen.createTexture = function (width, height, fn) {\n        var instance = new CanvasTextureGen(0, 0, width, height);\n        instance.D(fn);\n        return instance.toBase64();\n    };\n    return CanvasTextureGen;\n}(TextureGen));\nexports.CanvasTextureGen = CanvasTextureGen;\n\n\n//# sourceURL=webpack:///./src/demolishedTexture.js?");

/***/ })

/******/ });