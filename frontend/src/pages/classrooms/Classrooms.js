import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ElementsTable from '../../components/elements-table/ElementsTable';
import style from './Classroms.module.scss';
import Button from '../../components/button/Button';
import LoadingSpinner from '../../components/loading-spinner/LoadingSpinner';

const mockedClassrooms = [
	{ Classroom_no: 23 },
	{ Classroom_no: 43 },
	{ Classroom_no: 45 },
	{ Classroom_no: 21 },
];

const Classrooms = () => {
	const [classrooms, setClassrooms] = useState(mockedClassrooms);
	const navigate = useNavigate();

	const onDelete = classroom => {
		// tu będzie obsługa dla delete
		console.log(classroom);
	};

	const onEdit = classroom => {
		navigate('/edit-classroom', { state: { classroom: classroom } });
	};

	const onAdd = () => {
		navigate('/add-classroom');
	};

	if (classrooms.length > 0) {
		const elementHeaders = ['Classroom number'];
		return (
			<div className={style['table-wrapper']}>
				<ElementsTable
					elements={classrooms}
					title='Classrooms'
					headers={elementHeaders}
					actions={[
						['Delete', onDelete],
						['Edit', onEdit],
					]}
				/>
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

export default Classrooms;
