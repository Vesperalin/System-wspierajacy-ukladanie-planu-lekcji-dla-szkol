import { useState } from 'react';

import SubjectForm from '../../../components/subject-form/SubjectForm';

const AddSubject = () => {
	const [subjectName, setSubjectName] = useState('');
	const [errorMessage, setErrorMessage] = useState(''); // tu będzie info o niepowodzeniach - też z backendu

	const onSubmit = () => {
		console.log('submit formularza dla przedmiotów');
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
