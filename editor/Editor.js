"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var demolishedTexture_1 = require("../src/demolishedTexture");
window["GeneratorPixel"] = demolishedTexture_1.TextureGen.createTexture;
window["Generator2D"] = demolishedTexture_1.CanvasTextureGen.createTexture;
document.addEventListener("DOMContentLoaded", function () {
    var instance;
    var sel = document.querySelector.bind(document);
    var showError = function (message) {
        sel(".error pre").textContent = message;
    };
    var formatBytes = function (bytes, decimals) {
        if (bytes == 0)
            return "0 Byte";
        var k = 1024;
        var sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB"];
        var i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(decimals)) + " " + sizes[i];
    };
    var sizeOfBase64String = function (base64String) {
        if (!base64String)
            return 0;
        var padding = (base64String.match(/(=*)$/) || [])[1].length;
        return 4 * Math.ceil((base64String.length / 3)) - padding;
    };
    var toFile = function (context, fn) {
        instance.toBlob(fn);
    };
    var createSrc = function (context, frag, size) {
        var mi = context == "GeneratorPixel" ? "pixel, x, y, w, h,v" : "ctx,x,y,w,h";
        var source = "\n        " + context + "(" + size + "," + size + ",function(" + mi + ") {\n            " + frag + "\n        });";
        return source;
    };
    var editor = CodeMirror.fromTextArea(document.getElementById("texture-editor"), {
        mode: "text/javascript",
        theme: "neonsyntax",
        lineWrapping: true,
        lineNumbers: true,
        styleActiveLine: true,
        matchBrackets: true
    });
    var dt = performance.now() / 1000;
    var update = function () {
        showError("");
        var context = sel("select#sel-context").value;
        var size = sel("select#texture-size").value;
        var frag = editor.getValue();
        var source = createSrc(context, frag, size);
        instance = eval(source);
        var base64 = instance.toBase64();
        var el = sel("img.result");
        sel("#size").textContent = formatBytes(sizeOfBase64String(base64), 2);
        sel("#size-gen").textContent = formatBytes(source.length + 1280, 2);
        el.setAttribute("src", base64);
    };
    sel("#btn-export").addEventListener("click", function () {
        var context = sel("select#sel-context").value;
        var download = sel("#download");
        download.classList.remove("d-none");
        download.textContent = "Wait...";
        toFile(context, function (b) {
            var url = URL.createObjectURL(b);
            download.setAttribute("href", url);
            download.textContent = "result.png";
        });
    });
    editor.on("change", function (e) {
        var bounce = -(dt - (performance.now() / 1000));
        if (bounce > 0.5)
            update();
        dt = performance.now() / 1000;
    });
    window.onerror = function (ex) {
        showError(ex.toString());
    };
    update();
});
