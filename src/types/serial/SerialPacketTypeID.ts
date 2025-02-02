enum SerialPacketTypeID {
    // Requests
    RESET = 0x01,
    UPDATE_LABEL = 0x02,
    UPDATE_VALUE = 0x03,

    // Responses
    GENERIC_ACK = 0x51,
}

export default SerialPacketTypeID;