
class ShaderBase {
    fade(t: number): number {
        return t * t * t * (t * (t * 6 - 15) + 10);
    }
    exp2(value: number, max: number): number {
        var count = 1;
        do {
            count *= 2;
        } while (count < value);
        if (count > max)
            count = max;
        return count;
    }
    lerp(t: number, a: number, b: number): number { return a + t * (b - a); }
    grad(hash: number, x: number, y: number, z: number): number {
        var h = hash & 15;
        var u = h < 8 ? x : y,
            v = h < 4 ? y : h == 12 || h == 14 ? x : z;
        return ((h & 1) == 0 ? u : -u) + ((h & 2) == 0 ? v : -v);
    }
    scale(n: number): number { return (1 + n) / 2; }
    noise(x: number, y: number, z: number): number {
        let p = new Array<number>(512)
        let permutation = [151, 160, 137, 91, 90, 15,
            131, 13, 201, 95, 96, 53, 194, 233, 7, 225, 140, 36, 103, 30, 69, 142, 8, 99, 37, 240, 21, 10, 23,
            190, 6, 148, 247, 120, 234, 75, 0, 26, 197, 62, 94, 252, 219, 203, 117, 35, 11, 32, 57, 177, 33,
            88, 237, 149, 56, 87, 174, 20, 125, 136, 171, 168, 68, 175, 74, 165, 71, 134, 139, 48, 27, 166,
            77, 146, 158, 231, 83, 111, 229, 122, 60, 211, 133, 230, 220, 105, 92, 41, 55, 46, 245, 40, 244,
            102, 143, 54, 65, 25, 63, 161, 1, 216, 80, 73, 209, 76, 132, 187, 208, 89, 18, 169, 200, 196,
            135, 130, 116, 188, 159, 86, 164, 100, 109, 198, 173, 186, 3, 64, 52, 217, 226, 250, 124, 123,
            5, 202, 38, 147, 118, 126, 255, 82, 85, 212, 207, 206, 59, 227, 47, 16, 58, 17, 182, 189, 28, 42,
            223, 183, 170, 213, 119, 248, 152, 2, 44, 154, 163, 70, 221, 153, 101, 155, 167, 43, 172, 9,
            129, 22, 39, 253, 19, 98, 108, 110, 79, 113, 224, 232, 178, 185, 112, 104, 218, 246, 97, 228,
            251, 34, 242, 193, 238, 210, 144, 12, 191, 179, 162, 241, 81, 51, 145, 235, 249, 14, 239, 107,
            49, 192, 214, 31, 181, 199, 106, 157, 184, 84, 204, 176, 115, 121, 50, 45, 127, 4, 150, 254,
            138, 236, 205, 93, 222, 114, 67, 29, 24, 72, 243, 141, 128, 195, 78, 66, 215, 61, 156, 180
        ];
        for (var i = 0; i < 256; i++)
            p[256 + i] = p[i] = permutation[i];

        let X = Math.floor(x) & 255,
            Y = Math.floor(y) & 255,
            Z = Math.floor(z) & 255;
        x -= Math.floor(x);
        y -= Math.floor(y);
        z -= Math.floor(z);
        let u = this.fade(x),
            v = this.fade(y),
            w = this.fade(z);
        let A = p[X] + Y, AA = p[A] + Z, AB = p[A + 1] + Z,
            B = p[X + 1] + Y, BA = p[B] + Z, BB = p[B + 1] + Z;
        return this.scale(this.lerp(w, this.lerp(v, this.lerp(u, this.grad(p[AA], x, y, z),
            this.grad(p[BA], x - 1, y, z)),
            this.lerp(u, this.grad(p[AB], x, y - 1, z),
                this.grad(p[BB], x - 1, y - 1, z))),
            this.lerp(v, this.lerp(u, this.grad(p[AA + 1], x, y, z - 1),
                this.grad(p[BA + 1], x - 1, y, z - 1)),
                this.lerp(u, this.grad(p[AB + 1], x, y - 1, z - 1),
                    this.grad(p[BB + 1], x - 1, y - 1, z - 1)))));
    }
}

class DemolishedTextureGen {

    public ctx: CanvasRenderingContext2D
    private buffer: ImageData;
    private helpers: ShaderBase;

    constructor(public width: number, public height: number) {
        let c = document.createElement("canvas") as HTMLCanvasElement;
        c.width = width;
        c.height = height;
        this.ctx = c.getContext("2d");
        this.ctx.fillStyle = "#000000";
        this.ctx.fillRect(0, 0, this.width, this.height);
        this.buffer = this.ctx.getImageData(0, 0, this.width, this.height);
        this.helpers = new ShaderBase();
    }
    static createTexture(width: number, height: number, fn: Function): string {
        let instance = new DemolishedTextureGen(width, height);
        instance.render(fn);
        return instance.toBase64();
    }
    private coord = (pixel: Array<number>, x: number, y: number, w: number, h: number, fn: Function): Array<number> => {
        let r = pixel[0]; var g = pixel[1]; var b = pixel[2];
        var res = fn.apply(
            this.helpers,
            [[r, b, g], x, y, w, h]);
        return res;
    };

    private render(fn: Function) {
        let buffer = this.buffer;
        let w = this.width, h = this.height;
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
    }    
    toBase64(): string {
        return this.ctx.canvas.toDataURL("image/png");
    }
}