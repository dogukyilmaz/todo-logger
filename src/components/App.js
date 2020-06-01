import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import Alert from 'react-bootstrap/Alert';

import LogItem from './LogItem';
import AddLogItem from './AddLogItem';

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

	useEffect(() => {}, [logs, filteredLogs]);

	const handleCheckButton = () => {
		if (filter.showAll) {
			setFilter({ ...filter, showAll: false });

			const filteredLogs = logs.filter((log) => log.done == filter.checked);
			setFilteredLogs(filteredLogs);
		} else {
			const filteredLogs = logs.filter((log) => log.done == !filter.checked);
			setFilteredLogs(filteredLogs);
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
		console.log(item);
		setLogs([item, ...logs]);
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
		setLogs([...newLogs]);
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
			{alert.show && (
				<Alert
					className='fixed-top w-25 ml-auto text-center'
					style={{ top: 12, right: 30 }}
					variant={alert.variant}
				>
					{alert.message}
				</Alert>
			)}
			<Table>
				<thead>
					<tr>
						<th>Priority</th>
						<th>Log Todo</th>
						<th>User</th>
						<th>Created</th>
						<th className='text-center'>Actions</th>
					</tr>
				</thead>
				<tbody>
					{logs.length > 0 ? (
						(filter.showAll ? logs : filteredLogs).map((log) => (
							<LogItem
								removeItem={handleDeleteItem}
								doneItem={handleDoneItem}
								key={log.id}
								log={log}
							/>
						))
					) : (
						<tr className='text-center'>
							<td colSpan={5}>No items.</td>
						</tr>
					)}
				</tbody>
			</Table>
		</Container>
	);
};

export default App;
