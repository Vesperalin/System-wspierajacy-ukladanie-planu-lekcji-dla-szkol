import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import TeacherForm from '../../../components/teacher-form/TeacherForm';

const AddTeacher = () => {
	const navigate = useNavigate();
	const [cardNumber, setCardNumber] = useState(0);
	const [name, setName] = useState('');
	const [surname, setSurname] = useState('');
	const [errorMessage, setErrorMessage] = useState(''); // tu będzie info o niepowodzeniach - też z backendu

	const onSubmit = () => {
		console.log('submit formularza dla nauczycieli');
		navigate('/teachers');
	};

	return (
		<TeacherForm
			onSubmit={onSubmit}
			formTitle='Add teacher'
			cardNumber={cardNumber}
			setCardNumber={setCardNumber}
			name={name}
			setName={setName}
			surname={surname}
			setSurname={setSurname}
			actionText='Add'
			errorMessage={errorMessage}
			setErrorMessage={setErrorMessage}
		/>
	);
};

export default AddTeacher;
