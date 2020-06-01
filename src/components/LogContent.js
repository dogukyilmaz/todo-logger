import React from 'react';
import Table from 'react-bootstrap/Table';

import LogItem from './LogItem';

const LogContent = ({
	filter,
	logs,
	filteredLogs,
	handleDeleteItem,
	handleDoneItem,
}) => {
	return (
		<Table>
			<thead>
				<tr
					className={
						filter.showAll
							? 'table-dark'
							: filter.checked
							? 'table-success'
							: 'table-info'
					}
				>
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
	);
};

export default LogContent;
