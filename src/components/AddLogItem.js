import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

const AddLogItem = () => {
	const [todo, setTodo] = useState('');
	const [user, setUser] = useState('');
	const [priority, setPriority] = useState('low');

	return (
		<Card className='mt-4 mb-3'>
			<Card.Body>
				<Form>
					<Row className='my-3'>
						<Col>
							<Form.Control
								placeholder='Log'
								value={todo}
								onChange={(e) => setTodo(e.target.value)}
							/>
						</Col>
					</Row>

					<Row className='my-3'>
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
								<option value='0'>Select Priority</option>
								<option value='1'>Low</option>
								<option value='2'>Moderate</option>
								<option value='3'>High</option>
							</Form.Control>
						</Col>
						<Col>
							<Button type='submit' variant='primary' block>
								Save
							</Button>
						</Col>
					</Row>
				</Form>
			</Card.Body>
		</Card>
	);
};

export default AddLogItem;
