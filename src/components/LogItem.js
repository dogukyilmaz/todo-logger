import React from 'react';

const LogItem = ({ log }) => {
	return (
		<tr>
			<td>{log.priority}</td>
			<td>{log.todo}</td>
			<td>{log.user}</td>
			<td>{log.createdAt}</td>
			<td>D</td>
		</tr>
	);
};

export default LogItem;
