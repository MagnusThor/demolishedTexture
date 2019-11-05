import { TextureGen, CanvasTextureGen } from '../src/demolishedTexture';

window["GeneratorPixel"] = TextureGen.createTexture;
window["Generator2D"] = CanvasTextureGen.createTexture;

declare var CodeMirror: any;

document.addEventListener("DOMContentLoaded", () => {
    let sel = document.querySelector.bind(document);

    const showError = (message) => {
        sel(".error pre").textContent = message;
    }
    const formatBytes = (bytes: number, decimals: number): string => {
        if (bytes == 0)
            return "0 Byte";
        var k = 1024;
        var sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB"];
        var i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(decimals)) + " " + sizes[i];
    }

    const sizeOfBase64String = (base64String: string): number => {
        if (!base64String) return 0;
        const padding = (base64String.match(/(=*)$/) || [])[1].length;
        return 4 * Math.ceil((base64String.length / 3)) - padding;
    }
    const createSrc = (context: string, frag: string): string => {
        let source = `
        ${context}(512, 512, function(pixel, x, y, w, h) {
                ${frag}
            });`;
        return source;
    };

    let editor = CodeMirror.fromTextArea(document.getElementById("texture-editor"),
        {
            mode: "text/javascript",
            theme: "neonsyntax",
            lineWrapping: true,
            lineNumbers: true,
            styleActiveLine: true,
            matchBrackets: true
        }
    );

    let dt = performance.now() / 1000;

    const update = () => {
        showError("");
        let context = sel("select").value;
        const frag = editor.getValue();
        let source = createSrc(context, frag);
        let p = eval(source);
        let el = sel("img.result");

        sel("#size").textContent = formatBytes(sizeOfBase64String(p), 2);
        sel("#size-gen").textContent = formatBytes(source.length + 1280, 2)

        el.setAttribute("src", p);
    }


    editor.on("change", function (e: any) {

        let bounce = -(dt - (performance.now() / 1000));

        if (bounce > 0.5) update();


        dt = performance.now() / 1000;

    });
    window.onerror = function (ex) {
        showError(ex.toString());
    }
    update();

});
