import { app, BrowserWindow } from "electron";
// import isDev from "electron-is-dev";
import path from "path";

let mainWindow;

app.on("ready", () => {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: false, // Disable Node.js integration for security
            contextIsolation: true, // Enable context isolation
        },
        // remove the default titlebar
        titleBarStyle: "hidden",
        // expose window controlls in Windows/Linux
        ...(process.platform !== "darwin"
            ? {
                  titleBarOverlay: {
                      color: "#0f172a",
                      symbolColor: "#ffffff",
                      height: 24,
                  },
              }
            : {}),
    });

    const appUrl = "http://localhost:3000";

    //   const appUrl = isDev
    //     ? "http://localhost:3000" // Development mode: Next.js dev server
    //     : `file://${path.join(__dirname, "out/index.html")}`; // Production mode: Static files

    mainWindow.loadURL(appUrl);
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});
