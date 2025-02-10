import ServerSettings from "./ServerSettings.ts";
import ClientSettings from "./ClientSettings.ts";

export default interface Settings {
    server: ServerSettings;
    client: ClientSettings;
}