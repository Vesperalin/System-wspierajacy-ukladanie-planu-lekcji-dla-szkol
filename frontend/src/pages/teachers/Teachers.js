import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import ElementsTable from '../../components/elements-table/ElementsTable';
import style from './Teachers.module.scss';
import Button from '../../components/button/Button';
import LoadingSpinner from '../../components/loading-spinner/LoadingSpinner';

const Teachers = () => {
	const [teachers, setTeachers] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		axios
			.get('http://127.0.0.1:8000/api/teachers/')
			.then(response => {
				setTeachers(response.data);
			})
			.catch(error => {
				// TODO - handle errors
			});
	}, []);

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
