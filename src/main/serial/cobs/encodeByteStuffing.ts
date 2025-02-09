import {END_FLAG, ESCAPE_FLAG, START_FLAG} from "../../../types/serial/SerialFlags.ts";

/**
 * Encodes a buffer using byte stuffing
 * @param input - The buffer to encode
 * @return The encoded buffer
 */
export default function encodeByteStuffing(input: Buffer) {
    let outputIndex = 0;
    let inputIndex = 0;

    // Add the start flag to the output buffer
    const output: number[] = [START_FLAG];

    while (inputIndex < length) {
        // If the current byte is the end flag, add the escape flag and the end flag to the output buffer
        if (input[inputIndex] == END_FLAG) {
            output.push(ESCAPE_FLAG);
            output.push(END_FLAG);
        }
        // If the current byte is the start flag, add the escape flag and the start flag to the output buffer
        else if (input[inputIndex] == START_FLAG) {
            output.push(ESCAPE_FLAG);
            output.push(START_FLAG);
        }
        // If the current byte is the escape flag, add 2 escape flags to the output buffer
        else if (input[inputIndex] == ESCAPE_FLAG) {
            output.push(ESCAPE_FLAG);
            output.push(ESCAPE_FLAG);
        }
        // Otherwise, add the current byte to the output buffer
        else {
            output.push(input[inputIndex]);
        }

        inputIndex++;
    }

    // Add the end flag to the output buffer
    output[outputIndex++] = END_FLAG;

    return Buffer.from(output);
}