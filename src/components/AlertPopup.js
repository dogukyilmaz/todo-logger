import React from 'react';
import Alert from 'react-bootstrap/Alert';

const AlertPopup = ({ alert }) => {
	if (alert.show) {
		return (
			<Alert
				className='fixed-top w-25 ml-auto text-center'
				style={{ top: 12, right: 30 }}
				variant={alert.variant}
			>
				{alert.message}
			</Alert>
		);
	}
	return null;
};

export default AlertPopup;
