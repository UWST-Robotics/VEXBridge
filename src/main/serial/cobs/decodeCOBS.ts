/**
 * Decodes a buffer using consistent overhead byte stuffing (COBS).
 * @param input - The buffer to decode
 * @return The decoded buffer
 */
export default function decodeCOBS(input: Buffer) {
    // Create a new buffer for the output
    const output = Buffer.alloc(input.length - 1);

    // Copy the input buffer to the output buffer
    for (let i = 1; i < input.length; i++)
        output[i - 1] = input[i];

    // Iterate over the input buffer
    let codeOffset = 0;
    while (codeOffset < input.length) {
        // Get the code byte
        const code = input[codeOffset];

        // Check for zero byte
        if (code === 0x00)
            return output.subarray(0, codeOffset);

        // Jump to the next code byte
        codeOffset += code;

        // Check for max offset
        if (codeOffset == 0xFF)
            continue;

        // Add null byte to output
        output[codeOffset - 1] = 0x00;
    }

    return output;
}