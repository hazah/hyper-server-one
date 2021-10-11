/* jshint esversion: 6 */

const { app, BrowserWindow, protocol } = require("electron");
const path = require("path");

function createWindow() {
  protocol.interceptFileProtocol(
    "file",
    (req, callback) => {
      const parts = req.url.substr(7).split("/");
      let file = parts.pop();
      let subdir = "";

      if (file !== "index.html" && file !== "static_routes.js") {
        const sub2 = parts.pop();
        const sub1 = parts.pop();
        subdir = `${[sub1, sub2].join("/")}/`;
      }

      if (file === "" || file === "about") {
        file = `${file}/index.html`;
      }

      callback({
        path: path.normalize(`${__dirname}/build/public/${subdir}${file}`),
      });
    },
    (error) => {
      if (error) {
        console.error("Failed to register protocol");
      }
    }
  );

  const win = new BrowserWindow({
    width: 800,
    height: 600,
  });

  win.loadFile("build/public/index.html");
}

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});
