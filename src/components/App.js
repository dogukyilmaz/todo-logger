import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';

import { ipcRenderer } from 'electron';

import AddLogItem from './AddLogItem';
import Header from './Header';
import AlertPopup from './AlertPopup';
import LogContent from './LogContent';

// LATER:
// FIX: add or remove in the undone & done lists

const App = () => {
	const [logs, setLogs] = useState([]);
	const [filteredLogs, setFilteredLogs] = useState([]);
	const [filter, setFilter] = useState({
		showAll: true,
		checked: true,
	});
	const [alert, setAlert] = useState({
		show: false,
		message: '',
		variant: '',
	});

	useEffect(() => {
		ipcRenderer.send('logs:load');

		ipcRenderer.on('logs:get', (e, logs) => {
			setLogs(JSON.parse(logs));
		});

		ipcRenderer.on('logs:updated:todo', (e, todo) => {
			displayAlert(`${todo} is checked!`, 'info', 3000);
		});

		ipcRenderer.on('logs:deleteAll:apply', () => {
			// displayAlert('All logs removed!', 'danger', 5000, true);
			const isApplied = confirm(
				'DO YOU WANT TO REMOVE ALL LOGS?\nARE YOU SURE!'
			);
			if (isApplied) {
				ipcRenderer.send('logs:deleteAll:applied');
				setLogs([]);
				displayAlert('All logs removed!', 'danger', 5000);
			}
		});
	}, []);

	useEffect(() => {
		if (filter.checked) {
			setFilteredLogs(logs.filter((log) => log.done === filter.checked));
		} else {
			setFilteredLogs(logs.filter((log) => log.done === false));
		}
	}, [logs]);

	const handleCheckButton = () => {
		if (filter.showAll) {
			setFilter({ ...filter, showAll: false });
			setFilteredLogs(logs.filter((log) => log.done === filter.checked));
		} else {
			setFilteredLogs(logs.filter((log) => log.done === !filter.checked));
			setFilter({
				...filter,
				checked: !filter.checked,
			});
		}
	};

	const handleShowAllButton = () => {
		setFilter({
			showAll: true,
			checked: true,
		});
	};

	const handleAddItem = (item) => {
		// Comes from DB

		item.createdAt = new Date();
		// setLogs([item, ...logs]);
		// setFilteredLogs(logs.filter((log) => log.done === filter.checked));

		ipcRenderer.send('logs:add', item);

		displayAlert('Log added successfully!', 'success');
	};

	const handleDeleteItem = (id) => {
		// setLogs(logs.filter((log) => log._id !== id));
		ipcRenderer.send('logs:delete', id);

		displayAlert('Log removed successfully!', 'danger');
	};

	const handleDoneItem = (id) => {
		// If want to do on ui instead another db get request and send
		// Uncomment and remove sendLogs() from ipc.check event

		// const newLogs = logs.map((log) => {
		// 	if (log._id === id) {
		// 		log.done = true;
		// 	}
		// 	return log;
		// });
		// setLogs(newLogs);

		ipcRenderer.send('logs:check', id);

		const filteredLogs = logs.filter((log) => log.done === filter.checked);
		setFilteredLogs(filteredLogs);
		// displayAlert('Log checked done!', 'info');
	};

	const displayAlert = (msg, variant = 'success', secs = 3000) => {
		setAlert({
			show: true,
			message: msg,
			variant,
		});

		setTimeout(() => {
			setAlert({
				show: false,
				message: '',
			});
		}, secs);
	};

	return (
		<Container className='app'>
			<AddLogItem
				addItem={handleAddItem}
				displayAlert={displayAlert}
				showChecked={handleCheckButton}
				showAll={handleShowAllButton}
				filter={filter}
			/>

			<AlertPopup alert={alert} />

			<Header filter={filter} />

			<LogContent
				filter={filter}
				logs={logs}
				filteredLogs={filteredLogs}
				handleDeleteItem={handleDeleteItem}
				handleDoneItem={handleDoneItem}
			/>
		</Container>
	);
};

export default App;
