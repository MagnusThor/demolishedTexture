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

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var demolishedTexture_1 = __webpack_require__(1);
var Example = (function () {
    function Example() {
        var text = demolishedTexture_1.ComplexTexture.createTexture(512, 512, function (ctx, w, h) {
            ctx.save();
            ctx.fillStyle = "#fff";
            var dx = w / 2;
            var dy = h / 2;
            ctx.strokeStyle = "#fff";
            ctx.lineWidth = 10;
            var sx = Math.random() * 2;
            var sy = Math.random() * 2;
            ctx.translate(sx, sy);
            ctx.strokeRect(20, 20, 512 - 40, 512 - 40);
            ctx.stroke();
            ctx.font = "120px 'Arial'";
            ctx.fillText("SUPER", 40, 220, w);
            ctx.font = "bold 154px 'Arial'";
            ctx.fillText("SARA", 35, 370, w);
            ctx.restore();
            return ctx;
        });
        document.querySelector("#textel").setAttribute("src", text);
        var kaliset = demolishedTexture_1.DemolishedTextureGen.createTexture(512, 512, function (pixel, x, y, w, h) {
            var t = this, m = Math;
            var kset = function (p) {
                var e = 0, l = e;
                for (var i = 0; i < 13; i++) {
                    var pl = l, l = t.length(p);
                    var dot = t.dot(p, p);
                    p = t.func(p, function (v, i) {
                        return m.abs(v) / dot - 0.5;
                    });
                    e += m.exp(-1 / m.abs(l - pl));
                }
                return e;
            };
            var k = kset([t.toScale(x, w), t.toScale(y, w), 0]) * .18;
            return [Math.abs((k * 1.1) * 255), Math.abs((k * k * 1.3) * 255), Math.abs((k * k * k) * 255)];
        });
        document.querySelector("#kaliset").setAttribute("src", kaliset);
        var noise = demolishedTexture_1.DemolishedTextureGen.createTexture(512, 512, function (pixel, x, y, w, h) {
            var s, n, r, g, b;
            x /= w;
            y /= h;
            s = 20;
            n = this.noise(s * x, s * y, .8);
            r = g = b = Math.round(255 * n);
            return [r, g, b];
        });
        document.querySelector("#noise").setAttribute("src", noise);
        var grass = demolishedTexture_1.DemolishedTextureGen.createTexture(512, 512, function (pixel, x, y, w, h) {
            var sx, sy, r, g, b;
            x /= w;
            y /= h;
            sx = 3;
            sy = 44;
            n = this.noise(sx * x, sy * y, .1);
            x = (.2 + Math.sin(3.14 * x)) / 2;
            y = (1 + Math.sin(n * 4 * y)) / 2;
            b = n * y * x * 255;
            r = y * b;
            g = y * 255;
            return [r, g, b];
        });
        document.querySelector("#grass").setAttribute("src", grass);
    }
    return Example;
}());
var demo;
document.addEventListener("DOMContentLoaded", function () {
    demo = new Example();
});


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var TextureBase = (function () {
    function TextureBase() {
        this.perm = this.seed(255);
    }
    TextureBase.prototype.normalize = function (a) {
        var l = this.length(a);
        l != 0 ? a = this.func(a, function (v, i) {
            return v / l;
        }) : a = a;
        return a;
    };
    TextureBase.prototype.abs = function (a) {
        return a.map(function (v, i) { return Math.abs(v); });
    };
    TextureBase.prototype.func = function (a, exp) {
        return a.map(function (v, i) { return exp(v, i); });
    };
    TextureBase.prototype.toScale = function (v, w) {
        var a = 0, b = w, c = -1, d = 1.;
        return (v - a) / (b - a) * (d - c) + c;
    };
    ;
    TextureBase.prototype.dot = function (a, b) {
        return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
    };
    TextureBase.prototype.length = function (a) {
        return Math.sqrt(a[0] * a[0] + a[1] * a[1] + a[2] * a[2]);
    };
    TextureBase.prototype.fade = function (t) {
        return t * t * t * (t * (t * 6 - 15) + 10);
    };
    TextureBase.prototype.lerp = function (t, a, b) { return a + t * (b - a); };
    TextureBase.prototype.grad = function (hash, x, y, z) {
        var h = hash & 15;
        var u = h < 8 ? x : y, v = h < 4 ? y : h == 12 || h == 14 ? x : z;
        return ((h & 1) == 0 ? u : -u) + ((h & 2) == 0 ? v : -v);
    };
    TextureBase.prototype.scale = function (n) { return (1 + n) / 2; };
    TextureBase.prototype.seed = function (n) {
        var p = [];
        for (var a = [], b = 0; n >= b; b++)
            a.push(b);
        for (b = 0; n >= b; b++) {
            var c = n * Math.random(), d = a[~~c];
            a.splice(c, 1, a[b]);
            a.splice(b, 1, d);
        }
        ;
        for (var i = 0; i < n; i++)
            p[n + i] = p[i] = a[i];
        return p;
    };
    TextureBase.prototype.noise = function (x, y, z) {
        var t = this;
        var p = this.perm;
        var X = ~~(x) & 255, Y = ~~(y) & 255, Z = ~~(z) & 255;
        x -= ~~(x);
        y -= ~~(y);
        z -= ~~(z);
        var u = t.fade(x), v = t.fade(y), w = t.fade(z);
        var A = p[X] + Y, AA = p[A] + Z, AB = p[A + 1] + Z, B = p[X + 1] + Y, BA = p[B] + Z, BB = p[B + 1] + Z;
        return t.scale(t.lerp(w, t.lerp(v, t.lerp(u, t.grad(p[AA], x, y, z), t.grad(p[BA], x - 1, y, z)), t.lerp(u, t.grad(p[AB], x, y - 1, z), t.grad(p[BB], x - 1, y - 1, z))), t.lerp(v, t.lerp(u, t.grad(p[AA + 1], x, y, z - 1), t.grad(p[BA + 1], x - 1, y, z - 1)), t.lerp(u, t.grad(p[AB + 1], x, y - 1, z - 1), t.grad(p[BB + 1], x - 1, y - 1, z - 1)))));
    };
    return TextureBase;
}());
exports.TextureBase = TextureBase;
var DemolishedTextureGen = (function () {
    function DemolishedTextureGen(width, height) {
        var _this = this;
        this.width = width;
        this.height = height;
        this.coord = function (pixel, x, y, w, h, fn) {
            var r = pixel[0];
            var g = pixel[1];
            var b = pixel[2];
            var res = fn.apply(_this.helpers, [[r, b, g], x, y, w, h]);
            return res;
        };
        var c = document.createElement("canvas");
        c.width = width;
        c.height = height;
        this.ctx = c.getContext("2d");
        this.ctx.fillStyle = "#000000";
        this.ctx.fillRect(0, 0, this.width, this.height);
        this.buffer = this.ctx.getImageData(0, 0, this.width, this.height);
        this.helpers = new TextureBase();
    }
    DemolishedTextureGen.createTexture = function (width, height, fn) {
        var instance = new DemolishedTextureGen(width, height);
        instance.render(fn);
        return instance.toBase64();
    };
    DemolishedTextureGen.prototype.render = function (fn) {
        var buffer = this.buffer;
        var w = this.width, h = this.height;
        for (var idx, x = 0; x < w; x++) {
            for (var y = 0; y < h; y++) {
                idx = (x + y * w) * 4;
                var r = buffer.data[idx + 0];
                var g = buffer.data[idx + 1];
                var b = buffer.data[idx + 2];
                var pixel = this.coord([r, g, b], x, y, w, h, fn);
                buffer.data[idx + 0] = pixel[0];
                buffer.data[idx + 1] = pixel[1];
                buffer.data[idx + 2] = pixel[2];
            }
        }
        this.ctx.putImageData(buffer, 0, 0);
    };
    DemolishedTextureGen.prototype.toBase64 = function () {
        return this.ctx.canvas.toDataURL("image/png");
    };
    return DemolishedTextureGen;
}());
exports.DemolishedTextureGen = DemolishedTextureGen;
var ComplexTexture = (function (_super) {
    __extends(ComplexTexture, _super);
    function ComplexTexture(w, h) {
        return _super.call(this, w, h) || this;
    }
    ComplexTexture.prototype.draw = function (fn) {
        var res = fn.apply(this.helpers, [this.ctx, this.width, this, this.height]);
        return res;
    };
    ComplexTexture.createTexture = function (width, height, fn) {
        var instance = new ComplexTexture(width, height);
        instance.draw(fn);
        return instance.toBase64();
    };
    return ComplexTexture;
}(DemolishedTextureGen));
exports.ComplexTexture = ComplexTexture;


/***/ })
/******/ ]);