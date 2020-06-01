import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';

import LogItem from './LogItem';
import AddLogItem from './AddLogItem';

const LOGS = [
	{
		id: 1,
		todo: 'Learn React-Native.',
		priority: 'low',
		user: 'Dou',
		createdAt: '06.01.2020 15:15',
	},
	{
		id: 2,
		todo: 'Something absurd.',
		priority: 'moderate',
		user: 'Kaan',
		createdAt: '06.01.2020 17:23',
	},
	{
		id: 3,
		todo: 'Haters gonna hate.',
		priority: 'high',
		user: 'douscriptist',
		createdAt: new Date().toString(),
	},
	{
		id: 4,
		todo: 'Momentjs trying.',
		priority: 'low',
		user: 'douscriptist',
		createdAt: '05.8.2020',
	},
	{
		id: 5,
		todo: 'Momentjs trying.',
		priority: 'high',
		user: 'douscriptist',
		createdAt: '01.2.2020',
	},
];

const App = () => {
	const [logs, setLogs] = useState([...LOGS]);

	return (
		<Container className='app'>
			<AddLogItem />
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
					{logs.map((log) => (
						<LogItem key={log.id} log={log} />
					))}
				</tbody>
			</Table>
		</Container>
	);
};

export default App;
