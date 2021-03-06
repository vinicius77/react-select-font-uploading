import React from 'react';

const OptionsList = ({ options, onClick }) => {
	return (
		<React.Fragment>
			{options.map((option) => (
				<p
					key={option.value}
					style={{ fontFamily: option.value, color: option.color, fontSize: '25px' }}
					onClick={() => onClick(option)}
				>
					{option.value}
				</p>
			))}
		</React.Fragment>
	);
};

export default OptionsList;
