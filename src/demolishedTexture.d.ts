declare class ShaderBase {
    fade(t: number): number;
    lerp(t: number, a: number, b: number): number;
    grad(hash: number, x: number, y: number, z: number): number;
    scale(n: number): number;
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
