export default interface SerialPortInfo {
    path: string;
    manufacturer: string | undefined;
    serialNumber: string | undefined;
    pnpId: string | undefined;
    locationId: string | undefined;
    productId: string | undefined;
    vendorId: string | undefined;
}