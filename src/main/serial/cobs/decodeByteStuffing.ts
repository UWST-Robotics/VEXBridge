import {END_FLAG, ESCAPE_FLAG, START_FLAG} from "../../../types/serial/SerialFlags.ts";

/**
 * Decodes a byte-stuffed buffer
 * @param input - The buffer to decode
 * @return The decoded buffer
 */
export default function decodeByteStuffing(input: Buffer) {
    let inputIndex = 0;
    let output: number[] = [];

    while (inputIndex < length) {
        // If the current byte is the start flag, reset and continue
        if (input[inputIndex] == START_FLAG) {
            output = [];
            inputIndex++;
            continue;
        }
        // If the current byte is the end flag, break out of the loop
        if (input[inputIndex] == END_FLAG) {
            break;
        }
        // If the current byte is the escape flag, add the next byte to the output buffer
        if (input[inputIndex] == ESCAPE_FLAG) {
            output.push(input[++inputIndex]);
        }
        // Otherwise, add the current byte to the output buffer
        else {
            output.push(input[inputIndex]);
        }

        inputIndex++;
    }

    return Buffer.from(output);
}