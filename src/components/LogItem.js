import React from 'react';
import Moment from 'react-moment';
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
			<td>{formatDate(log.createdAt)}</td>
			<td className='d-inline-flex justify-content-around'>
				<Button className='mr-2' variant='outline-success'>
					✔
				</Button>
				<Button variant='danger'>✖</Button>
			</td>
		</tr>
	);
};

const setUpperCase = (text) => {
	return `${text.charAt(0).toUpperCase()}${text.slice(1)}`;
};

const formatDate = (date) => {
	// 1000 * 60 * 60 * 24 * 25
	const currentDate = new Date();
	const compareDate = new Date(date);
	compareDate.setDate(compareDate.getDate() + 25);

	return compareDate < currentDate ? (
		<Moment format='MMM D YYYY - HH:mm'>{new Date(date)}</Moment>
	) : (
		<Moment fromNow>{new Date(date)}</Moment>
	);
};

export default LogItem;
