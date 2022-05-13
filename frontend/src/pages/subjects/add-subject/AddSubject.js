import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import SubjectForm from '../../../components/subject-form/SubjectForm';

const AddSubject = () => {
	const navigate = useNavigate();
	const [subjectName, setSubjectName] = useState('');
	const [errorMessage, setErrorMessage] = useState('');
	const onSubmit = () => {
		axios
			.post('http://127.0.0.1:8000/api/subjects/', {
				Subject_name: subjectName,
			})
			.then(response => navigate('/subjects'))
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
