import { TextureGen, CanvasTextureGen } from '../src/demolishedTexture';

window["GeneratorPixel"] = TextureGen.createTexture;
window["Generator2D"] = CanvasTextureGen.createTexture;


declare var CodeMirror: any;

document.addEventListener("DOMContentLoaded", () => {

    let instance:any;

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
    const toFile = (context: string,fn: Function) => {   

        instance.toBlob(fn);

    }
    const createSrc = (context: string, frag: string,size): string => {
        let mi = context == "GeneratorPixel" ? "pixel, x, y, w, h,v" : "ctx,x,y,w,h"
        let source = `
        ${context}(${size},${size},function(${mi}) {
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
        let context = sel("select#sel-context").value;
        let size = sel("select#texture-size").value;

        const frag = editor.getValue();
        let source = createSrc(context, frag,size);
        instance = eval(source);


        let base64 = instance.toBase64();
        
        
        let el = sel("img.result");

        sel("#size").textContent = formatBytes(sizeOfBase64String(base64), 2);
        sel("#size-gen").textContent = formatBytes(source.length + 1280, 2)

        el.setAttribute("src", base64);
    }

    sel("#btn-export").addEventListener("click", () => {
        let context = sel("select#sel-context").value;
        let download = sel("#download");
        download.classList.remove("d-none");
        download.textContent = "Wait..."

        toFile(context,(b:any) => {
                let url = URL.createObjectURL(b);
                download.setAttribute("href",url);
                download.textContent = "result.png";
        });

    });

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
