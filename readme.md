# demolishedTexture

Generate procedural textures in GLSL-Shader way or use plain vanilla Canvas API's to create your textures.

## Install using NPM

    npm install demolishedtexture

## Documentation
    
Brief documentation of demolishedTexture. More to come thou.

## Create a texture using TextureBase

Like in a "shader" the generator calles the "callback" function (fn) provided to the generator by createTexture(w,h,fn) or render(fn) for each pixel (x,y) of your texture. The callback *fn* must have the following signature (pixel, x, y, w, h) where the arguments are as follows, it must return an Array of RGB(a)

    fn(pixel:Array, x:number, y:numer, w:number, h:number):Array<number> 

**pixel** is red, green and blue channel for the current pixel (x,y)
**x,y** is the current coordinate of the pixel.
**w,h** is the with and hight of the texture. 
 
 The function (fn) is inherited (bound) the the TextureBase descibed above, there you can find functions such as PerlinNoise ( noise)  
 
### Example ( Javascript )
****
    var base64 = DemolishedTextureGen.createTexture(512, 512, function (pixel, x, y, w, h) {
        
        var n = this.noise(x / 45, y / 120, .89);
        n = Math.cos(n * 15);
        r = Math.round(n * 255);
        b = 255 - r;
        g = r - 255;

        return [r, g, b];
        
    });


## Create a texture using Canvas API's

In addition to the procedual textures you can use the HTML5 Canvas JavaScript API's to render textures / images. 

    fn(ctx,w,h):Array<number>


**ctx** is the CanvasRenderingContext2D to use for drawinig operations.
**w** is the width of the texture.
**h** is the width of the texture. 

    var text = DemolishedCanvasTextureGen.createTexture(512, 512, (ctx, w, h) => {
                ctx.save();
                ctx.fillStyle = "#fff";
                let dx = w / 2;
                let dy = h / 2;
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
        

## Get the rendered texture

    toBase64():string


## Dump of ts.d file


    declare class TextureBase {
        perm: Array<number>;
        constructor();
        normalize(a: Array<number>): Array<number>;
        abs(a: Array<number>): Array<number>;
        func(a: Array<number>, exp: Function): any[];
        toScale(v: any, w: any): number;
        dot(a: Array<number>, b: Array<number>): number;
        length(a: Array<number>): number;
        fade(t: number): number;
        lerp(t: number, a: number, b: number): number;
        grad(hash: number, x: number, y: number, z: number): number;
        scale(n: number): number;
        seed(n: number): Array<number>;
        noise(x: number, y: number, z: number): number;
    }
    
    declare class DemolishedTextureGen {
        width: number;
        height: number;
        ctx: CanvasRenderingContext2D;
        buffer: ImageData;
        helpers: TextureBase;
        constructor(width: number, height: number);
        static createTexture(width: number, height: number, fn: Function): string;
        private coord;
        private render(fn);
        toBase64(): string;
    }
    
    declare class DemolishedCanvasTextureGen extends DemolishedTextureGen {
        constructor(w: number, h: number);
        draw(fn: Function): Array<number>;
        static createTexture(width: number, height: number, fn: Function): string;
    }



# Links

https://magnusthor.github.io/demolishedTexture/example/index.html 
