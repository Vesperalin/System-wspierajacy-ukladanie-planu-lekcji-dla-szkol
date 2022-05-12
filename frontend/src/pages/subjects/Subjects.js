import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import ElementsTable from '../../components/elements-table/ElementsTable';
import style from './Subjects.module.scss';
import Button from '../../components/button/Button';
import LoadingSpinner from '../../components/loading-spinner/LoadingSpinner';

const Subjects = () => {
	const [subjects, setSubjects] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		axios
			.get('http://127.0.0.1:8000/api/subjects/')
			.then(response => {
				setSubjects(response.data);
			})
			.catch(error => {
				// TODO - handle errors
			});
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
				// TODO - handle errors
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
