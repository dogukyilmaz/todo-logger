import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';

import AddLogItem from './AddLogItem';
import Header from './Header';
import AlertPopup from './AlertPopup';
import LogContent from './LogContent';

const LOGS = [
	{
		id: 1,
		todo: 'Learn React-Native.',
		priority: 'low',
		user: 'Dou',
		createdAt: '06.01.2020 15:15',
		done: false,
	},
	{
		id: 2,
		todo: 'Something absurd.',
		priority: 'moderate',
		user: 'Kaan',
		createdAt: '06.01.2020 17:23',
		done: false,
	},
	{
		id: 3,
		todo: 'Haters gonna hate.',
		priority: 'high',
		user: 'douscriptist',
		createdAt: new Date().toString(),
		done: false,
	},
	{
		id: 4,
		todo: 'Momentjs trying.',
		priority: 'low',
		user: 'douscriptist',
		createdAt: '05.8.2020',
		done: false,
	},
	{
		id: 5,
		todo: 'Momentjs trying.',
		priority: 'high',
		user: 'douscriptist',
		createdAt: '01.2.2020',
		done: false,
	},
];

// LATER:
// FIX: add or remove in the undone & done lists

const App = () => {
	const [logs, setLogs] = useState([...LOGS]);
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
		item.id = Math.random().toString().slice(2, 7);
		item.createdAt = new Date();

		setLogs([item, ...logs]);
		setFilteredLogs(logs.filter((log) => log.done === filter.checked));
		displayAlert('Log added successfully!', 'success');
	};

	const handleDeleteItem = (id) => {
		const removedLogs = logs.filter((log) => log.id !== id);
		setLogs([...removedLogs]);
		displayAlert('Log removed successfully!', 'danger');
	};

	const handleDoneItem = (id) => {
		const newLogs = logs.map((log) => {
			if (log.id === id) {
				log.done = true;
			}
			return log;
		});
		setLogs(newLogs);
		const filteredLogs = logs.filter((log) => log.done === filter.checked);
		setFilteredLogs(filteredLogs);
		displayAlert('Log checked done!', 'info');
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
