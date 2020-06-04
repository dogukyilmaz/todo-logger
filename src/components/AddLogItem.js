import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

const AddLogItem = ({
	addItem,
	displayAlert,
	showChecked,
	showAll,
	filter,
}) => {
	const [todo, setTodo] = useState('');
	const [user, setUser] = useState('');
	const [date, setDate] = useState('');
	const [deadLine, setDeadLine] = useState('');
	const [priority, setPriority] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();

		// Check inputs if empty
		if (checkInputs()) {
			addItem({
				todo: todo.trim(),
				user: user.trim(),
				priority,
				date,
				deadLine,
				done: false,
			});

			clearState();
		} else {
			displayAlert('Missing credientals...', 'warning');
		}
	};

	const checkInputs = () => {
		return todo.trim() && user.trim() && priority && deadLine ? true : false;
	};

	const clearState = () => {
		setTodo('');
		setUser('');
		setPriority('low');
	};

	return (
		<Card className='mt-1 mb-3'>
			<Card.Body>
				<Form onSubmit={handleSubmit}>
					<Row>
						<Col>
							<Form.Control
								placeholder='Log'
								value={todo}
								onChange={(e) => setTodo(e.target.value)}
							/>
						</Col>
					</Row>

					<Row className='mt-2'>
						<Col>
							<Form.Control
								placeholder='User'
								value={user}
								onChange={(e) => setUser(e.target.value)}
							/>
						</Col>
						<Col>
							<Form.Control
								as='select'
								value={priority}
								onChange={(e) => setPriority(e.target.value)}
							>
								<option value='null'>Select Priority</option>
								<option value='low'>Low</option>
								<option value='moderate'>Moderate</option>
								<option value='high'>High</option>
							</Form.Control>
						</Col>
						<Col>
							<Form.Control
								placeholder='Deadline'
								type='date'
								value={deadLine}
								onChange={(e) => setDeadLine(e.target.value)}
							/>
						</Col>
					</Row>

					<Row className='mt-3 d-flex justify-content-between'>
						<Col xs={2}>
							<Button
								onClick={() => showChecked()}
								variant={filter.checked ? 'success' : 'info'}
								block
							>
								{filter.checked ? 'Done ✔' : 'Undone ✖'}
							</Button>
						</Col>
						<Col xs={2} className='mr-auto'>
							<Button onClick={() => showAll()} variant='secondary' block>
								Show All
							</Button>
						</Col>
						<Col xs={3}>
							<Button type='submit' variant='secondary' block>
								SAVE LOG
							</Button>
						</Col>
					</Row>
				</Form>
			</Card.Body>
		</Card>
	);
};

export default AddLogItem;
