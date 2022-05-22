import { useState, useEffect } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import axios from 'axios';

import style from './Schedules.module.scss';
import SchedulesTable from '../../components/schedules-table/SchedulesTable';
import LoadingSpinner from '../../components/loading-spinner/LoadingSpinner';
import Button from '../../components/button/Button';

const Schedules = () => {
	const [classes, setClasses] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const navigate = useNavigate();

	useEffect(() => {
		setIsLoading(true);
		axios
			.get('http://127.0.0.1:8000/api/classes_lesson/')
			.then(response => {
				setClasses(response.data);
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

	const onEdit = school_class => {
		navigate('/edit-schedule', { state: { school_class: school_class } });
	};

	const onAdd = () => {
		navigate('/choose-class-for-schedule');
	};

	const onShow = school_class => {
		navigate('/preview-schedule', { state: { school_class: school_class } });
	};

	const onDelete = school_class => {
		axios
			.delete(`http://127.0.0.1:8000/api/lesson_plans/${school_class.ID_Class}/`)
			.then(response => {
				setClasses(prevClasses => {
					return prevClasses.filter(c => c.ID_Class !== school_class.ID_Class);
				});
			})
			.catch(error => {
				if (error.response.status === 400) {
					setErrorMessage(error.response.data);
				} else {
					setErrorMessage('Unknown error occurred');
				}
			});
	};

	if (classes.length > 0) {
		return (
			<div className={style['table-wrapper']}>
				<SchedulesTable
					elements={classes}
					title='Schedules for classes'
					actions={[
						['Edit', onEdit],
						['Show', onShow],
						['Delete', onDelete],
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
				<p>None of the class has plan</p>
				<NavLink className={style.navlink} to='/choose-class-for-schedule'>
					Add plan for class
				</NavLink>
			</div>
		);
	}
};

export default Schedules;
