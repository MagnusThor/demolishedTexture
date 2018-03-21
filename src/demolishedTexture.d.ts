declare class ShaderBase {
    perm: Array<number>;
    constructor();
    normalize(a: Array<number>): Array<number>;
    abs(a: Array<number>): Array<number>;
    calc(a: Array<number>, exp: Function): void;
    toScale(v: any, w: any): number;
    dot(a: Array<number>, b: Array<number>): number;
    gain(a: number, b: number): number;
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
    private buffer;
    private helpers;
    constructor(width: number, height: number);
    static createTexture(width: number, height: number, fn: Function): string;
    private coord;
    private render(fn);
    toBase64(): string;
}
