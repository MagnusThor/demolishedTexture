# demolishedTexture


## install

    npm i demolishedTexture

## Example ( Javascript )

    var base64 = DemolishedTextureGen.createTexture(512, 512, function (pixel, x, y, w, h) {
        var n = this.noise(x / 45, y / 120, .89);
        n = Math.cos(n * 15);
            r = Math.round(n * 255);
            b = 255 - r;
           g = r - 255;
       return [r, g, b];
    });

## Example ( Typescript)


