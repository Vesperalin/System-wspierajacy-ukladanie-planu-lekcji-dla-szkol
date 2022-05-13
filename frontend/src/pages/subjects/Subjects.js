import { useState, useEffect } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import axios from 'axios';

import ElementsTable from '../../components/elements-table/ElementsTable';
import style from './Subjects.module.scss';
import Button from '../../components/button/Button';
import LoadingSpinner from '../../components/loading-spinner/LoadingSpinner';

const Subjects = () => {
	const [subjects, setSubjects] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const navigate = useNavigate();

	useEffect(() => {
		setIsLoading(true);
		axios
			.get('http://127.0.0.1:8000/api/subjects/')
			.then(response => {
				setSubjects(response.data);
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

	const onDelete = subject => {
		axios
			.delete(`http://127.0.0.1:8000/api/subjects/${subject.ID_Subject}/`)
			.then(response => {
				setSubjects(prevSubjects => {
					return prevSubjects.filter(s => s.ID_Subject !== subject.ID_Subject);
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

	const onEdit = subject => {
		navigate('/edit-subject', { state: { subject: subject } });
	};

	const onAdd = () => {
		navigate('/add-subject');
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
				<p>No subjects defined.</p>
				<NavLink className={style.navlink} to='/add-subject'>
					Add subjects
				</NavLink>
			</div>
		);
	}
};

export default Subjects;
