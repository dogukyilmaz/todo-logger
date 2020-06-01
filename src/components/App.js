import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';

import LogItem from './LogItem';

const LOGS = [
	{
		id: 1,
		todo: 'Learn React-Native.',
		priority: 'low',
		user: 'Dou',
		createdAt: new Date().toString(),
	},
	{
		id: 2,
		todo: 'Something absurd.',
		priority: 'moderate',
		user: 'Kaan',
		createdAt: new Date().toString(),
	},
	{
		id: 3,
		todo: 'Haters gonna hate.',
		priority: 'high',
		user: 'douscriptist',
		createdAt: new Date().toString(),
	},
];

const App = () => {
	const [logs, setLogs] = useState([...LOGS]);

	return (
		<Container className='app'>
			<Table>
				<thead>
					<tr>
						<th>Priority</th>
						<th>Log Todo</th>
						<th>User</th>
						<th>Created</th>
						<th>Actions</th>
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
