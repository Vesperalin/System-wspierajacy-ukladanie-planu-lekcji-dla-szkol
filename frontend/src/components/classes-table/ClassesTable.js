import style from './ClassesTable.module.scss';
import Button from '../button/Button';

const ClassesTable = props => {
	return (
		<div>
			<div className={style['table-wrapper']}>
				<h1>{props.title}</h1>
				<div className={style.wrapper}>
					<table>
						<thead>
							<tr>
								<th>Class</th>
								<th>Year</th>
								<th>Actions</th>
							</tr>
						</thead>
						<tbody>
							{props.elements.map(element => {
								return (
									<tr key={element.ID_Class}>
										<td>{element.Class_no}</td>
										<td>{element.Year}</td>
										<td>
											<Button
												onClick={() => props.actions[0][1](element)}
												text={props.actions[0][0]}
											/>
											<Button
												onClick={() => props.actions[1][1](element)}
												text={props.actions[1][0]}
											/>
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

export default ClassesTable;
