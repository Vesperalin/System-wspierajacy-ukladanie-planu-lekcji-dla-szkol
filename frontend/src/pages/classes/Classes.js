import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import ElementsTable from '../../components/elements-table/ElementsTable';
import style from './Classes.module.scss';
import Button from '../../components/button/Button';
import LoadingSpinner from '../../components/loading-spinner/LoadingSpinner';

const Classes = () => {
	const [classes, setClasses] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		axios
			.get('http://127.0.0.1:8000/api/classes/')
			.then(response => {
				setClasses(response.data);
			})
			.catch(error => {
				// TODO - handle errors
			});
	}, []);

	const onDelete = school_class => {
		axios
			.delete(`http://127.0.0.1:8000/api/classes/${school_class.ID_Class}/`)
			.then(response => {
				setClasses(prevClasses => {
					return prevClasses.filter(c => c.ID_Class !== school_class.ID_Class);
				});
			})
			.catch(error => {
				// TODO - handle errors
			});
	};

	const onEdit = school_class => {
		navigate('/edit-class', { state: { school_class: school_class } });
	};

	const onAdd = () => {
		navigate('/add-class');
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
