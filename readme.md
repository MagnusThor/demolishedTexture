# demolishedTexture

Generate procedural textures in GLSL-Shader way. Use with demolished or standaone

## Install using NPM

    N/A 

## Documentation

Dump of .ts.d files.


    declare class DemolishedTextureGen {
        width: number;
        height: number;
        ctx: CanvasRenderingContext2D;
        private buffer;
        private helpers;
        constructor(width: number, height: number);
        static createTexture(width: number, height: number, fn: Function): string;
        private coord;
        private render(fn);
        toBase64(): string;
}



    declare class ShaderBase {
        fade(t: number): number;
        lerp(t: number, a: number, b: number): number;
        grad(hash: number, x: number, y: number, z: number): number;
        scale(n: number): number;
        noise(x: number, y: number, z: number): number;
}

## Write a texture

Like in a "shader" the generator calles the "callback" function (fn) provided to the generator by createTexture(w,h,fn) or render(fn) for each pixel (x,y) of your texture. The callback *fn* must have the following signature (pixel, x, y, w, h) where the arguments are as follows, it must return an Array of RGB(a)

    fn(pixel:Array, x:number, y:numer, w:number, h:number):Array<number> 

**pixel** is red, green and blue channel for the current pixel (x,y)
**x,y** is the current coordinate of the pixel.
**w,h** is the with and hight of the texture. 
 
 The function (fn) is inherited (bound) the the ShaderBase descibed above, there you can find functions such as PerlinNoise ( noise)  
 

## Example ( Javascript )
****
    var base64 = DemolishedTextureGen.createTexture(512, 512, function (pixel, x, y, w, h) {
        var n = this.noise(x / 45, y / 120, .89);
        n = Math.cos(n * 15);
        r = Math.round(n * 255);
        b = 255 - r;
        g = r - 255;
       return [r, g, b];
    });


See /example/index.html for a tiny example
