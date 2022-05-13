import { useState, useEffect } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import axios from 'axios';

import ElementsTable from '../../components/elements-table/ElementsTable';
import style from './Teachers.module.scss';
import Button from '../../components/button/Button';
import LoadingSpinner from '../../components/loading-spinner/LoadingSpinner';

const Teachers = () => {
	const [teachers, setTeachers] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const navigate = useNavigate();

	useEffect(() => {
		setIsLoading(true);
		axios
			.get('http://127.0.0.1:8000/api/teachers/')
			.then(response => {
				setTeachers(response.data);
			})
			.catch(error => {
				if (error.response.status === 400) {
					setErrorMessage(error.response.data.message);
				} else if (error.response.status === 404) {
					setErrorMessage(error.response.data.detail);
				} else {
					setErrorMessage('Unknown error occurred');
				}
			});
		setIsLoading(false);
	}, []);

	const onDelete = teacher => {
		axios
			.delete(`http://127.0.0.1:8000/api/teachers/${teacher.ID_Teacher}/`)
			.then(response => {
				setTeachers(prevTeachers => {
					return prevTeachers.filter(t => t.ID_Teacher !== teacher.ID_Teacher);
				});
			})
			.catch(error => {
				if (error.response.status === 400) {
					setErrorMessage(error.response.data.message);
				} else if (error.response.status === 404) {
					setErrorMessage(error.response.data.detail);
				} else {
					setErrorMessage('Unknown error occurred');
				}
			});
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
				{errorMessage !== '' && <p className={style.error}>{errorMessage}</p>}
				<Button onClick={onAdd} text='Add' />
			</div>
		);
	} else if (isLoading) {
		return (
			<div className={style['spinner-wrapper']}>
				<LoadingSpinner />
				<p>Loading ...</p>
			</div>
		);
	} else {
		return (
			<div className={style['spinner-wrapper']}>
				<p>No classes defined.</p>
				<NavLink className={style.navlink} to='/add-class'>
					Add teachers
				</NavLink>
			</div>
		);
	}
};

export default Teachers;
