import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import SubjectForm from '../../../components/subject-form/SubjectForm';

const AddSubject = () => {
	const navigate = useNavigate();
	const [subjectName, setSubjectName] = useState('');
	const [errorMessage, setErrorMessage] = useState(''); // tu będzie info o niepowodzeniach - też z backendu

	const onSubmit = () => {
		axios
			.post('http://127.0.0.1:8000/api/subjects/', {
				Subject_name: subjectName,
			})
			.then(response => navigate('/subjects'))
			.catch(error => {
				// TODO - handle errors
			});
	};

	return (
		<SubjectForm
			onSubmit={onSubmit}
			formTitle='Add subject'
			subjectName={subjectName}
			setSubjectName={setSubjectName}
			actionText='Add'
			errorMessage={errorMessage}
			setErrorMessage={setErrorMessage}
		/>
	);
};

export default AddSubject;
