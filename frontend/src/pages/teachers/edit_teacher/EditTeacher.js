import { useLocation } from 'react-router-dom';
import { useState } from 'react';

import TeacherForm from '../../../components/teacher-form/TeacherForm';

const EditTeacher = () => {
	const location = useLocation();
	const [cardNumber, setCardNumber] = useState(
		location.state.teacher.ID_Teacher,
	);
	const [name, setName] = useState(location.state.teacher.Name);
	const [surname, setSurname] = useState(location.state.teacher.Surname);
	const [errorMessage, setErrorMessage] = useState(''); // tu będzie info o niepowodzeniach - też z backendu

	const onSubmit = () => {
		console.log('submit formularza dla nauczycieli');
	};

	return (
		<TeacherForm
			onSubmit={onSubmit}
			formTitle='Edit teacher'
			cardNumber={cardNumber}
			setCardNumber={setCardNumber}
			name={name}
			setName={setName}
			surname={surname}
			setSurname={setSurname}
			actionText='Edit'
			errorMessage={errorMessage}
			setErrorMessage={setErrorMessage}
		/>
	);
};

export default EditTeacher;
