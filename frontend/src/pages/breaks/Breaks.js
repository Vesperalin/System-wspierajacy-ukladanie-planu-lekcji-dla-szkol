import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import style from './Breaks.module.scss';
import Button from '../../components/button/Button';
import LoadingSpinner from '../../components/loading-spinner/LoadingSpinner';

const mockedBreaks = [
	{
		ID_Break: 1,
		Break_no: 1,
		Start_hour: 8,
		Start_minute: 45,
		End_hour: 8,
		End_minute: 50,
	},
	{
		ID_Break: 2,
		Break_no: 2,
		Start_hour: 9,
		Start_minute: 40,
		End_hour: 9,
		End_minute: 50,
	},
	{
		ID_Break: 3,
		Break_no: 3,
		Start_hour: 10,
		Start_minute: 35,
		End_hour: 10,
		End_minute: 50,
	},
	{
		ID_Break: 4,
		Break_no: 4,
		Start_hour: 11,
		Start_minute: 35,
		End_hour: 11,
		End_minute: 40,
	},
];

const Breaks = () => {
	const [breaks, setBreaks] = useState(mockedBreaks);
	const navigate = useNavigate();

	const onDelete = breakk => {
		// tu będzie obsługa dla delete
		console.log(breakk);
	};

	const onEdit = breakk => {
		navigate('/edit-break', { state: { breakk: breakk } });
	};

	const onAdd = () => {
		navigate('/add-break');
	};

	if (breaks.length > 0) {
		return (
			<div className={style['main-wrapper']}>
				<div>
					<div className={style['table-wrapper']}>
						<h1>Breaks</h1>
						<div className={style.wrapper}>
							<table>
								<thead>
									<tr>
										<th>Break number</th>
										<th>Beginning</th>
										<th>Ending</th>
										<th>Actions</th>
									</tr>
								</thead>
								<tbody>
									{breaks.map(breakk => {
										return (
											<tr key={breakk.ID_Break}>
												<td>{breakk.Break_no}</td>
												<td>
													{('0' + breakk.Start_hour).slice(-2)}:
													{('0' + breakk.Start_minute).slice(-2)}
												</td>
												<td>
													{('0' + breakk.End_hour).slice(-2)}:
													{('0' + breakk.End_minute).slice(-2)}
												</td>
												<td>
													<Button
														onClick={() => onDelete(breakk)}
														text='Delete'
													/>
													<Button onClick={() => onEdit(breakk)} text='Edit' />
												</td>
											</tr>
										);
									})}
								</tbody>
							</table>
						</div>
					</div>
				</div>
				<Button onClick={onAdd} text='Add' />
			</div>
		);
	} else {
		return (
			<div className={style['spinner-wrapper']}>
				<LoadingSpinner />
				<p>Loading ...</p>
			</div>
		);
	}
};

export default Breaks;
