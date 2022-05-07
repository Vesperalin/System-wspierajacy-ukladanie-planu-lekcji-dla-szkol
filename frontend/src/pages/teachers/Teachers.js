import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ElementsTable from '../../components/elements-table/ElementsTable';
import style from './Teachers.module.scss';
import Button from '../../components/button/Button';
import LoadingSpinner from '../../components/loading-spinner/LoadingSpinner';

const mockedTeachers = [
	{ ID_Teacher: 1231421, Name: 'Anna', Surname: 'Kowalska' },
	{ ID_Teacher: 4324235, Name: 'Olga', Surname: 'Tokarczuk' },
	{ ID_Teacher: 2346243, Name: 'Halina', Surname: 'Siemińska' },
	{ ID_Teacher: 2645435, Name: 'Andrzej', Surname: 'Mazur' },
];

const Teachers = () => {
	const [teachers, setTeachers] = useState(mockedTeachers);
	const navigate = useNavigate();

	const onDelete = teacher => {
		// tu będzie obsługa dla delete
		console.log(teacher);
	};

	const onEdit = teacher => {
		navigate('/edit-teacher', { state: { teacher: teacher } });
	};

	const onAdd = () => {
		navigate('/add-teacher');
	};

	if (teachers.length > 0) {
		const elementHeaders = ['Card', 'Name', 'Surname'];
		return (
			<div className={style['table-wrapper']}>
				<ElementsTable
					elements={teachers}
					title='Teachers'
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

export default Teachers;
