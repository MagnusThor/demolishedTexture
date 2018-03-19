# demolishedTexture

Generate procedural textures in GLSL-Shader way. Use with demolished or standaone

## Install using NPM

    N/A 

## Example ( Javascript )

    var base64 = DemolishedTextureGen.createTexture(512, 512, function (pixel, x, y, w, h) {
        var n = this.noise(x / 45, y / 120, .89);
        n = Math.cos(n * 15);
            r = Math.round(n * 255);
            b = 255 - r;
           g = r - 255;
       return [r, g, b];
    });


See /example/index.html for a tiny example

## Example ( Typescript)

    N/A
