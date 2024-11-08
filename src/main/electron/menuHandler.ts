import {Menu} from "electron";

const isMac = process.platform === "darwin";

export default function createMenu(mainWindow: Electron.BrowserWindow | null): Electron.Menu {
    const menu = Menu.buildFromTemplate([
        {
            label: "File",
            submenu: [
                {
                    label: "Save",
                    accelerator: "CmdOrCtrl+S",
                    click: () => mainWindow?.webContents.send("onSave")
                },
                {
                    label: "Save As",
                    accelerator: "CmdOrCtrl+Shift+S",
                    click: () => mainWindow?.webContents.send("onSaveAs")
                },
                {
                    label: "Open",
                    accelerator: "CmdOrCtrl+O",
                    click: () => mainWindow?.webContents.send("onOpen")
                },
                {type: "separator"},
                isMac ? {
                    role: "close",
                    accelerator: "CmdOrCtrl+W"
                } : {
                    role: "quit",
                    accelerator: "CmdOrCtrl+Q"
                },
            ]
        },
        {
            label: "Edit",
            submenu: [
                {
                    label: "Rotate CW",
                    accelerator: "CmdOrCtrl+R",
                    click: () => mainWindow?.webContents.send("onRotateCW")
                },
                {
                    label: "Rotate CCW",
                    accelerator: "CmdOrCtrl+Shift+R",
                    click: () => mainWindow?.webContents.send("onRotateCCW")
                },
                {type: "separator"},
                {
                    label: "Mirror Horizontal",
                    accelerator: "CmdOrCtrl+H",
                    click: () => mainWindow?.webContents.send("onMirrorHorizontal")
                },
                {
                    label: "Mirror Vertical",
                    accelerator: "CmdOrCtrl+Shift+H",
                    click: () => mainWindow?.webContents.send("onMirrorVertical")
                },
                {type: "separator"},
                {
                    label: "Undo",
                    accelerator: "CmdOrCtrl+Z",
                    click: () => mainWindow?.webContents.send("onUndo")
                },
                {
                    label: "Redo",
                    accelerator: "CmdOrCtrl+Y",
                    click: () => mainWindow?.webContents.send("onRedo")
                }
            ]
        },
        {
            label: "View",
            submenu: [
                {
                    label: "Toggle Grid",
                    accelerator: "CmdOrCtrl+G",
                    click: () => mainWindow?.webContents.send("onToggleGrid")
                },
                {
                    label: "Toggle Snap Position",
                    accelerator: "CmdOrCtrl+Shift+G",
                    click: () => mainWindow?.webContents.send("onToggleSnap")
                },
                {
                    label: "Toggle Snap Rotation",
                    accelerator: "CmdOrCtrl+Alt+G",
                    click: () => mainWindow?.webContents.send("onToggleSnapRotation")
                },
                {type: "separator"},
                {
                    label: "Fullscreen",
                    accelerator: "F11",
                    click: () => {
                        if (mainWindow)
                            mainWindow.fullScreen = !mainWindow.fullScreen;
                    }
                }
            ]
        },
        {
            label: "Help",
            submenu: [
                {
                    label: "About",
                    click: () => {
                        mainWindow?.webContents.send("onAbout");
                    }
                }
            ]
        }
    ]);

    // Set the application menu
    Menu.setApplicationMenu(menu);
    return menu;
}