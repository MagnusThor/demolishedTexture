"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var demolishedTexture_1 = require("../src/demolishedTexture");
window["GeneratorPixel"] = demolishedTexture_1.TextureGen.createTexture;
window["Generator2D"] = demolishedTexture_1.CanvasTextureGen.createTexture;
document.addEventListener("DOMContentLoaded", function () {
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
    var createSrc = function (context, frag) {
        var source = "\n        " + context + "(512, 512, function(pixel, x, y, w, h) {\n                " + frag + "\n            });";
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
        var context = sel("select").value;
        var frag = editor.getValue();
        var source = createSrc(context, frag);
        var p = eval(source);
        var el = sel("img.result");
        sel("#size").textContent = formatBytes(sizeOfBase64String(p), 2);
        sel("#size-gen").textContent = formatBytes(source.length + 1280, 2);
        el.setAttribute("src", p);
    };
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
