import { useState } from 'react';

import ElementsTable from '../../components/elements-table/ElementsTable';
import style from './Classes.module.scss';
import Button from '../../components/button/Button';
import LoadingSpinner from '../../components/loading-spinner/LoadingSpinner';

const mockedClasses = [
	{ ID_Class: 'IIa', Year: 2021 },
	{ ID_Class: 'Ib', Year: 2022 },
	{ ID_Class: 'IIIb', Year: 2019 },
	{ ID_Class: 'IIc', Year: 2021 },
];

const Classes = () => {
	const [classes, setClasses] = useState(mockedClasses);

	const onDelete = school_class => {
		// tu będzie obsługa dla delete
		console.log(school_class);
	};

	const onEdit = school_class => {
		// tu będzie obsługa dla edit
		console.log(school_class);
	};

	const onAdd = () => {
		// tu będzie obsługa dla add
		console.log('add');
	};

	if (classes.length > 0) {
		const elementHeaders = ['Class', 'Year'];
		return (
			<div className={style['table-wrapper']}>
				<ElementsTable
					elements={classes}
					title='Classes'
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

export default Classes;
