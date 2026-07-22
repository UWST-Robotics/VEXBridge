export default interface ClientSettings {
    enableFieldCursor: boolean;

    swapAxes: boolean;
    mirrorXAxis: boolean;
    mirrorYAxis: boolean;
    reverseCompass: boolean;
    compassHead: "N" | "E" | "S" | "W";

    fieldLayoutID: string;
};

export const DefaultClientSettings: ClientSettings = {
    enableFieldCursor: true,

    swapAxes: false,
    mirrorXAxis: false,
    mirrorYAxis: false,
    reverseCompass: false,
    compassHead: "N",

    fieldLayoutID: "Override_VEXU.png"
};