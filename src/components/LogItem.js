import React from 'react';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';

const LogItem = ({ log }) => {
	const setPriority = () => {
		switch (log.priority) {
			case 'low':
				return 'success';
			case 'moderate':
				return 'warning';
			case 'high':
				return 'danger';
			default:
				return 'info';
		}
	};

	return (
		<tr>
			<td>
				<Badge variant={setPriority()}>{setUpperCase(log.priority)}</Badge>
			</td>
			<td>{log.todo}</td>
			<td>{log.user}</td>
			<td>{log.createdAt}</td>
			<td className='d-inline-flex justify-content-around'>
				<Button className='mr-2' variant='outline-success'>
					✔
				</Button>
				<Button variant='danger'>x</Button>
			</td>
		</tr>
	);
};

const setUpperCase = (text) => {
	return `${text.charAt(0).toUpperCase()}${text.slice(1)}`;
};

export default LogItem;
