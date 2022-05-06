import style from './ElementsTable.module.scss';
import Button from '../button/Button';

const ElementsTable = props => {
	const headers = Object.keys(props.elements[0]);

	return (
		<div>
			<div className={style['table-wrapper']}>
				<h1>{props.title}</h1>
				<div className={style.wrapper}>
					<table>
						<thead>
							<tr>
								{props.headers.map(element => {
									return <th key={element}>{element}</th>;
								})}
								<th key='Actions'>Actions</th>
							</tr>
						</thead>
						<tbody>
							{props.elements.map(element => {
								return (
									<tr key={element[headers[0]]}>
										{headers.map(header => {
											return <td key={header}>{element[header]}</td>;
										})}
										<td>
											{props.actions.map(action => {
												return (
													<Button
														key={action[0]}
														onClick={() => action[1](element)}
														text={action[0]}
													/>
												);
											})}
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};

export default ElementsTable;
