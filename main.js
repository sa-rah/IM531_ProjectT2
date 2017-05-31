const { app, BrowserWindow, globalShortcut, shell, Menu } = require('electron');
const path = require('path');
const url = require('url');

const showDevTools = true;

let win;

function createWindow() {
  win = new BrowserWindow({
    title: 'GameFAM',
    frame: 'false',
    width: showDevTools ? 1200 : 600,
    height: 800,
  });

  win.loadURL(url.format({
    pathname: path.join(__dirname, 'public', 'index.html'),
    protocol: 'file:',
    slashes: true,
  }));

  if (showDevTools) {
    win.webContents.openDevTools();
  }

  win.on('closed', () => {
    win = null;
  });
}


app.on('ready', () => {
  createWindow();
  globalShortcut.register('CommandOrControl+X', () => {
    console.log('CommandOrControl+X is pressed');
  });

  const template = [
    {
      label: 'Edit',
      submenu: [
                { role: 'undo' },
                { role: 'redo' },
                { type: 'separator' },
                { role: 'cut' },
                { role: 'copy' },
                { role: 'paste' },
                { role: 'pasteandmatchstyle' },
                { role: 'delete' },
                { role: 'selectall' },
      ],
    },
    {
      label: 'View',
      submenu: [
                { role: 'reload' },
                { role: 'forcereload' },
                { role: 'toggledevtools' },
                { type: 'separator' },
                { role: 'resetzoom' },
                { role: 'zoomin' },
                { role: 'zoomout' },
                { type: 'separator' },
                { role: 'togglefullscreen' },
      ],
    },
    {
      role: 'window',
      submenu: [
                { role: 'minimize' },
                { role: 'close' },
      ],
    },
    {
      role: 'help',
      submenu: [
        {
          label: 'Learn More',
          click() { shell.openExternal('https://electron.atom.io'); },
        },
      ],
    },
  ];

  if (process.platform === 'darwin') {
    template.unshift({
      label: app.getName(),
      submenu: [
                { role: 'about' },
                { type: 'separator' },
                { role: 'services', submenu: [] },
                { type: 'separator' },
                { role: 'hide' },
                { role: 'hideothers' },
                { role: 'unhide' },
                { type: 'separator' },
                { role: 'quit' },
      ],
    });

        // Edit menu
    template[2].submenu.push(
            { type: 'separator' },
      {
        label: 'Speech',
        submenu: [
                    { role: 'startspeaking' },
                    { role: 'stopspeaking' },
        ],
      });

        // Window menu
    template[3].submenu = [
            { role: 'close' },
            { role: 'minimize' },
            { role: 'zoom' },
            { type: 'separator' },
            { role: 'front' },
    ];
  }

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});

app.on('will-quit', () => {
  globalShortcut.unregisterAll();
});
