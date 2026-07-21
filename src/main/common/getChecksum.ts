/**
 * Get the 8-bit checksum of a buffer using the sum of all bytes
 * @param buffer - The buffer to checksum
 * @param length - The length of the buffer to checksum
 * @returns A 8-bit checksum
 */
export default function getChecksum(buffer: Buffer, length: number) {
    let checksum = 0;
    const actualLength = Math.min(buffer.length, length);
    for (let i = 0; i < actualLength; i++)
        checksum = (checksum + buffer.readUInt8(i)) & 0xFF;
    return checksum;
}