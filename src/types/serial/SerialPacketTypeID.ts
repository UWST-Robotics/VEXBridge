enum SerialPacketTypeID {
    UNKNOWN = 0x00,
    RESET = 0x01,
    UPDATE_LABEL = 0x02,
    UPDATE_VALUE = 0x03,
    BATCH_VALUE = 0x04,
    LOG = 0x05,
    FETCH_VALUES = 0x06,
    BATCH_LABEL = 0x07,
    GENERIC_ACK = 0x11,
    PING = 0x12,
}

export default SerialPacketTypeID;