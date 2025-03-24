export default interface ClientSettings {
    enableFieldCursor: boolean;
    fieldLayoutID: string;
};

export const DefaultClientSettings: ClientSettings = {
    enableFieldCursor: true,
    fieldLayoutID: ""
}