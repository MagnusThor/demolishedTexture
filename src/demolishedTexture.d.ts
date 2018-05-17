export declare class TextureBase {
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
export declare class DemolishedTextureGen {
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
export declare class DemolishedCanvasTextureGen extends DemolishedTextureGen {
    constructor(w: number, h: number);
    draw(fn: Function): Array<number>;
    static createTexture(width: number, height: number, fn: Function): string;
}
