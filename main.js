const path = require('path');
const url = require('url');
const { app, BrowserWindow, ipcMain } = require('electron');

const LogModel = require('./models/Log');
const connectDB = require('./config/db');

// Connect to DB
connectDB();

let mainWindow;

let isDev = false;

if (
	process.env.NODE_ENV !== undefined &&
	process.env.NODE_ENV === 'development'
) {
	isDev = true;
}

function createMainWindow() {
	mainWindow = new BrowserWindow({
		title: 'TodoLogger',
		width: isDev ? 1400 : 1100,
		height: 800,
		show: false,
		backgroundColor: '#2e2c29',
		icon: `${__dirname}/assets/icon.png`,
		webPreferences: {
			nodeIntegration: true,
			// affinity: 'window',
		},
		opacity: 0.88,
	});

	let indexPath;

	if (isDev && process.argv.indexOf('--noDevServer') === -1) {
		indexPath = url.format({
			protocol: 'http:',
			host: 'localhost:8080',
			pathname: 'index.html',
			slashes: true,
		});
	} else {
		indexPath = url.format({
			protocol: 'file:',
			pathname: path.join(__dirname, 'dist', 'index.html'),
			slashes: true,
		});
	}

	mainWindow.loadURL(indexPath);

	// Don't show until we are ready and loaded
	mainWindow.once('ready-to-show', () => {
		mainWindow.show();

		// Open devtools if dev
		if (isDev) {
			// const {
			// 	default: installExtension,
			// 	REACT_DEVELOPER_TOOLS,
			// } = require('electron-devtools-installer');

			// installExtension(REACT_DEVELOPER_TOOLS).catch((err) =>
			// 	console.log('Error loading React DevTools: ', err)
			// );
			mainWindow.webContents.openDevTools();
		}
	});

	mainWindow.on('closed', () => (mainWindow = null));
}

app.on('ready', createMainWindow);

// Logs loaded
ipcMain.on('logs:load', sendLogs);

// Get logs from db then send ipcRenderer
async function sendLogs() {
	try {
		const logs = await LogModel.find().sort({ createdAt: -1 });
		mainWindow.webContents.send('logs:get', JSON.stringify(logs));
	} catch (error) {
		console.log(error);
	}
}

// Create Log
ipcMain.on('logs:add', async (e, item) => {
	try {
		await LogModel.create(item);
		sendLogs();
	} catch (error) {
		console.log(error);
	}
});

// Delete Log
ipcMain.on('logs:delete', async (e, id) => {
	try {
		await LogModel.findOneAndDelete({ _id: id });
		sendLogs();
	} catch (error) {
		console.log(error);
	}
});

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', () => {
	if (mainWindow === null) {
		createMainWindow();
	}
});

// Stop error
app.allowRendererProcessReuse = true;
