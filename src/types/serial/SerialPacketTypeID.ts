enum SerialPacketTypeID {
    RESET = 0x01,
    UPDATE_LABEL = 0x02,
    UPDATE_VALUE = 0x03,
    BATCH_VALUE = 0x04,
    LOG = 0x05,
    GENERIC_ACK = 0x11,
    PING = 0x12,
}

export default SerialPacketTypeID;