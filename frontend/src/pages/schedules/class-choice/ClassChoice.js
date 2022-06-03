import React from 'react';
import Select from 'react-select';
import { useState, useEffect } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import axios from 'axios';

import style from './ClassChoice.module.scss';

const ClassChoice = () => {
	const [classes, setClasses] = useState([]);
	const [selectionError, setSelectionError] = useState('');
	const [errorMessage, setErrorMessage] = useState('');
	const [selectedClass, setSelectedClass] = useState({});
	const navigate = useNavigate();

	useEffect(() => {
		axios
			.get('http://127.0.0.1:8000/api/classes_no_lesson/')
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
	}, []);

	const onAccept = () => {
		if (Object.keys(selectedClass).length === 0) {
			setSelectionError("Can't accept empty fields");
		} else {
			setSelectionError('');
			navigate('/add-schedule', { state: { school_class: selectedClass } });
		}
	};

	const classesOptions = classes.map(school_class => ({
		value: school_class,
		label: `${school_class.Class_no} ${school_class.Year}`,
	}));

	return (
		<div className={style.content}>
			{classes.length > 0 ? (
				<>
					<h1>Choose class</h1>
					<div className={style.form}>
						<p>Class</p>
						<Select value={selectedClass} onChange={setSelectedClass} options={classesOptions} />
						<div className={style['action-button-wrapper']}>
							<button className={style.button} onClick={onAccept}>
								Accept
							</button>
						</div>
						<div className={style['button-wrapper']}>
							<button onClick={() => navigate('/schedules')} className={style.button}>
								&larr; Back
							</button>
						</div>
						{errorMessage !== '' && <p className={style.error}>{errorMessage}</p>}
						{selectionError !== '' && <p className={style.error}>{selectionError}</p>}
					</div>
				</>
			) : (
				<div className={style['spinner-wrapper']}>
					<p>No classes defined.</p>
					<NavLink className={style.navlink} to='/add-class'>
						Add classes
					</NavLink>
					<button onClick={() => navigate('/schedules')} className={style.button}>
						&larr; Back
					</button>
				</div>
			)}
		</div>
	);
};

export default ClassChoice;
