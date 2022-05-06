import { useState } from 'react';

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

	const onDelete = teacher => {
		// tu będzie obsługa dla delete
		console.log(teacher);
	};

	const onEdit = teacher => {
		// tu będzie obsługa dla edit
		console.log(teacher);
	};

	const onAdd = () => {
		// tu będzie obsługa dla add
		console.log('add');
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
