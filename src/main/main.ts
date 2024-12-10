import {app, BrowserWindow, ipcMain} from "electron";
import * as Path from "path";
import assignEvents from "./electron/eventHandler.ts";
import icon from "../../assets/icon.png";
import createMenu from "./electron/menuHandler.ts";
import BlueBox from "./BlueBox.ts";

const isMac = process.platform === "darwin";

export let mainWindow: BrowserWindow | undefined;

function createWindow() {
    // Create the browser window
    mainWindow = new BrowserWindow({
        width: 1100,
        height: 600,
        useContentSize: true,
        autoHideMenuBar: true,
        icon: icon,
        webPreferences: {
            sandbox: false,
            preload: Path.join(__dirname, "../preload/preload.js"),
            devTools: !app.isPackaged
        }
    });

    // Create the menu
    createMenu(mainWindow);

    // Load Renderer
    if (!app.isPackaged && process.env["ELECTRON_RENDERER_URL"]) {
        // Developer Mode
        mainWindow
            .loadURL(process.env["ELECTRON_RENDERER_URL"])
            .catch(console.error);
        mainWindow.webContents.openDevTools();
    } else {
        // Production Mode
        mainWindow
            .loadFile(Path.join(__dirname, "../renderer/index.html"))
            .catch(console.error);
        mainWindow.webContents.openDevTools();
    }

    // Emitted when the window is closed
    mainWindow.on("closed", () => {
        mainWindow = undefined;
    });

    // Listen BlueBox events
    BlueBox.listen();
}

app.whenReady().then(() => {
    // Set the App User Model ID to prevent Windows from grouping the app with other Electron apps
    app.setAppUserModelId("org.devilbots.BlueBox");

    // Register the handlers for the dialog events
    assignEvents(ipcMain);

    // Create the main window
    createWindow();
});

app.on("window-all-closed", () => {
    // MacOS apps stay open until the user explicitly quits
    if (!isMac)
        app.quit();
});

app.on("activate", () => {
    // If there are no windows open, create one
    if (!mainWindow)
        createWindow();
});