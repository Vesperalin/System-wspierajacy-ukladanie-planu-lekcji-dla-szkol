import { useState } from 'react';

import ElementsTable from '../../components/elements-table/ElementsTable';
import style from './Subjects.module.scss';
import Button from '../../components/button/Button';
import LoadingSpinner from '../../components/loading-spinner/LoadingSpinner';

const mockedSubjects = [
	{ ID_Subject: 2, Subject_name: 'Biology' },
	{ ID_Subject: 3, Subject_name: 'Chemistry' },
	{ ID_Subject: 5, Subject_name: 'English' },
	{ ID_Subject: 1, Subject_name: 'Geography' },
];

const Subjects = () => {
	const [subjects, setSubjects] = useState(mockedSubjects);

	const onDelete = subject => {
		// tu będzie obsługa dla delete
		console.log(subject);
	};

	const onEdit = subject => {
		// tu będzie obsługa dla edit
		console.log(subject);
	};

	const onAdd = () => {
		// tu będzie obsługa dla add
		console.log('add');
	};

	if (subjects.length > 0) {
		const elementHeaders = ['Subject number', 'Subject'];
		return (
			<div className={style['table-wrapper']}>
				<ElementsTable
					elements={subjects}
					title='Subjects'
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

export default Subjects;
