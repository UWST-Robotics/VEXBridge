/**
 * Encode a buffer using consistent overhead byte stuffing (COBS).
 * This ensures the output buffer does not contain any zero bytes except for the final byte.
 * @param input - The buffer to encode
 * @return The encoded buffer
 */
export default function encodeCOBS(input: Buffer) {
    // Create a new buffer for the output
    const output = Buffer.alloc(input.length + 2);

    // Offset of the code byte
    let codeOffset = 0;

    // Iterate over the input buffer
    for (let i = 0; i < input.length; i++) {
        const distance = i - codeOffset;

        // Check for zero byte
        if (input[i] === 0x00) {
            // Write the code byte
            output[codeOffset] = distance + 1;
            codeOffset = i + 1;
        }

        // Check for max offset
        else if (distance === 0xFE) {
            // Write the code byte
            output[codeOffset] = 0xFF;
            codeOffset = i + 1;
        }

        // Default case
        else {
            output[i + 1] = input[i];
        }
    }

    // Write the final code byte
    output[codeOffset] = input.length - codeOffset + 1;

    // Write the final zero byte
    output[input.length + 1] = 0x00;

    return output;
}