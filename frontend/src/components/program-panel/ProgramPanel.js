import React from 'react';

import style from './ProgramPanel.module.scss';

const ProgramPanel = ({ program }) => {
	return (
		<div className={style.wrapper}>
			<h3>Program for the class</h3>
			<div>
				{Object.keys(program).map(key => {
					return (
						<p key={key}>
							<span>{key}</span>
							<span>{':  ' + program[key]}</span>
						</p>
					);
				})}
			</div>
		</div>
	);
};

export default ProgramPanel;
