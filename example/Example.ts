import { CanvasTextureGen,TextureGen } from "..";






 class Example{
        constructor(){
            var text = CanvasTextureGen.createTexture(512, 512, (ctx,x,y,w, h) => {
                
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
                    ctx.font = "bold 120px 'Arial'";
                    ctx.fillText("HANNA", 40, 370, w);
                ctx.restore();
        
                return ctx;
        
            });
        
            document.querySelector("#textel").setAttribute("src", text.toBase64());
        
            var kaliset = TextureGen.createTexture(512, 512, function (pixel, x, y, w, h,v) {
                var t = this; var m = Math;
                var a = function(a,b){
                    return m.abs((a * b) * 255);
                }            
                var s = function (p) {
                
                    var e = 0, l = e;
                    for (var i = 0; i < 13; i++) {
                        var pl = l;
                        l = t.length(p);
                        var dot = t.dot(p, p);
                        p = t.func(p, function (v) {
                            return m.abs(v) / dot - .5;
                        });
                        e += m.exp(-1 / m.abs(l - pl));
                    }
                    return e;
                };
                var k = s(v) * .18;
                return [a(k , 1.1), a(k * k,  1.3), a(k * k * k,1.)];
        
            });

            document.querySelector("#kaliset").setAttribute("src", kaliset.toBase64());
        
            var noise = TextureGen.createTexture(512, 512, function (pixel, x, y, w, h) {
                var s,n,r,g,b,n;
                x /= w; y /= h;
                s = 20; n = this.noise(s * x, s * y, .8);
                r = g = b = Math.round(255 * n);
                return [r, g, b]
            });
        
            document.querySelector("#noise").setAttribute("src", noise.toBase64());
        
        
            var grass = TextureGen.createTexture(512, 512, function (pixel, x, y, w, h) {
                var sx,sy,r,g,b,n;
                x /= w; y /= h; sx = 3; sy = 44;
                n = this.noise(sx * x, sy * y, .1);
        
                x = (.2 + Math.sin(3.14 * x)) / 2;
                y = (1 + Math.sin(n * 4 * y)) / 2;
                b = n * y * x * 255; r = y * b;
                g = y * 255;
                return [r, g, b]
        
            });
        
            document.querySelector("#grass").setAttribute("src", grass.toBase64());
        
        }
}




var demo;
document.addEventListener("DOMContentLoaded", () => {
    demo = new Example();
});