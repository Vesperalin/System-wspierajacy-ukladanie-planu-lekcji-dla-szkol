import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import SubjectForm from '../../../components/subject-form/SubjectForm';

const AddSubject = () => {
	const navigate = useNavigate();
	const [subjectName, setSubjectName] = useState('');
	const [errorMessage, setErrorMessage] = useState(''); // tu będzie info o niepowodzeniach - też z backendu

	const onSubmit = () => {
		console.log('submit formularza dla przedmiotów');
		navigate('/subjects');
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
