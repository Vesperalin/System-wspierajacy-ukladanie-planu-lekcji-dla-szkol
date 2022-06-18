import { useState, useEffect } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import axios from 'axios';

import ClassesTable from '../../components/classes-table/ClassesTable';
import style from './Classes.module.scss';
import Button from '../../components/button/Button';
import LoadingSpinner from '../../components/loading-spinner/LoadingSpinner';

const Classes = () => {
	const [classes, setClasses] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const navigate = useNavigate();

	useEffect(() => {
		setIsLoading(true);
		axios
			.get('http://127.0.0.1:8000/api/classes/')
			.then(response => {
				setClasses(response.data);
			})
			.catch(error => {
				if (error.response.status === 400) {
					if (error.response.data.message === undefined) {
						setErrorMessage(error.response.data);
					} else {
						setErrorMessage(error.response.data.message);
					}
				} else if (error.response.status === 404) {
					setErrorMessage(error.response.data.detail);
				} else {
					setErrorMessage('Unknown error occurred');
				}
			});
		setIsLoading(false);
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
				if (error.response.status === 400) {
					if (error.response.data.message === undefined) {
						setErrorMessage(error.response.data);
					} else {
						setErrorMessage(error.response.data.message);
					}
				} else if (error.response.status === 404) {
					setErrorMessage(error.response.data.detail);
				} else {
					setErrorMessage('Unknown error occurred');
				}
			});
	};

	const onEdit = school_class => {
		navigate('/edit-class', { state: { school_class: school_class } });
	};

	const onAdd = () => {
		navigate('/add-class');
	};

	if (classes.length > 0) {
		return (
			<div className={style['table-wrapper']}>
				<ClassesTable
					elements={classes}
					title='Classes'
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
					Add classes
				</NavLink>
			</div>
		);
	}
};

export default Classes;
