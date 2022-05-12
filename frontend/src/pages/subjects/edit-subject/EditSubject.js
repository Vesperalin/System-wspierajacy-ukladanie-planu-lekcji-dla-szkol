import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';

import SubjectForm from '../../../components/subject-form/SubjectForm';

const EditSubject = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const [subjectName, setSubjectName] = useState(
		location.state.subject.Subject_name,
	);
	const [errorMessage, setErrorMessage] = useState(''); // tu będzie info o niepowodzeniach - też z backendu

	const onSubmit = () => {
		console.log('submit formularza dla przedmiotów');
		navigate('/subjects');
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
