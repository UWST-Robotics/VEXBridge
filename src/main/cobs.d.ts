declare module "cobs" {
    import {Duplex} from "stream";

    export function encode(data: Buffer, zeroFrame: boolean): Buffer;

    export function decode(data: Buffer): Buffer;

    export function encodeStream(): Duplex;

    export function decodeStream(): Duplex;
}