import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import TeacherForm from '../../../components/teacher-form/TeacherForm';

const AddTeacher = () => {
	const navigate = useNavigate();
	const [name, setName] = useState('');
	const [surname, setSurname] = useState('');
	const [errorMessage, setErrorMessage] = useState('');

	const onSubmit = () => {
		axios
			.post('http://127.0.0.1:8000/api/teachers/', {
				Name: name,
				Surname: surname,
			})
			.then(response => navigate('/teachers'))
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
	};

	return (
		<TeacherForm
			onSubmit={onSubmit}
			formTitle='Add teacher'
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
