/**
 * Get the checksum of a buffer
 * @param buffer - The buffer to checksum
 * @param length - The length to read
 * @returns The checksum
 */
export default function getChecksum(buffer: Buffer, length: number) {
    const actualLength = Math.min(buffer.length, length);
    let checksum = 0;
    for (let i = 0; i < actualLength; i++)
        checksum += buffer.readUInt8(i);
    return checksum;
}