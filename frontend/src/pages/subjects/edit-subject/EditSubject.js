import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

import SubjectForm from '../../../components/subject-form/SubjectForm';

const EditSubject = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const [subjectName, setSubjectName] = useState(
		location.state.subject.Subject_name,
	);
	const [errorMessage, setErrorMessage] = useState('');

	const onSubmit = () => {
		axios
			.put(
				`http://127.0.0.1:8000/api/subjects/${location.state.subject.ID_Subject}/`,
				{
					Subject_name: subjectName,
				},
			)
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
			formTitle='Edit subject'
			subjectName={subjectName}
			setSubjectName={setSubjectName}
			actionText='Edit'
			errorMessage={errorMessage}
			setErrorMessage={setErrorMessage}
		/>
	);
};

export default EditSubject;
