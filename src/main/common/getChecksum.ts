/**
 * Get the 16-bit checksum of a buffer using the sum of all bytes
 * @param buffer - The buffer to checksum
 * @returns A 16-bit checksum
 */
export default function getChecksum(buffer: Buffer) {
    let checksum = 0;
    for (let i = 0; i < buffer.length; i++)
        checksum += buffer.readUInt8(i);
    return checksum % 0xFFFF; // 16-bit checksum
}