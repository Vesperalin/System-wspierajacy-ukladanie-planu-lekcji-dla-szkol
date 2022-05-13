import { useState, useEffect } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import axios from 'axios';

import ElementsTable from '../../components/elements-table/ElementsTable';
import style from './Classrooms.module.scss';
import Button from '../../components/button/Button';
import LoadingSpinner from '../../components/loading-spinner/LoadingSpinner';

const Classrooms = () => {
	const [classrooms, setClassrooms] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		setIsLoading(true);
		axios
			.get('http://127.0.0.1:8000/api/classrooms/')
			.then(response => {
				setClassrooms(response.data);
			})
			.catch(error => {
				// TODO - handle errors
			});
		setIsLoading(false);
	}, []);

	const onDelete = classroom => {
		axios
			.delete(`http://127.0.0.1:8000/api/classrooms/${classroom.Classroom_no}/`)
			.then(response => {
				setClassrooms(prevClassrooms => {
					return prevClassrooms.filter(
						c => c.Classroom_no !== classroom.Classroom_no,
					);
				});
			})
			.catch(error => {
				console.log(error);
				// TODO - handle errors
			});
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
					Add classrooms
				</NavLink>
			</div>
		);
	}
};

export default Classrooms;
