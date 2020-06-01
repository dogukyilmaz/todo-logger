import React from 'react';

const Header = ({ filter }) => {
	return (
		<h3
			className={
				'my-1 text-center ' +
				(filter.showAll
					? 'text-dark'
					: filter.checked
					? 'text-success'
					: 'text-info')
			}
		>
			{filter.showAll ? 'All' : filter.checked ? 'Done' : 'Undone'}
		</h3>
	);
};

export default Header;
