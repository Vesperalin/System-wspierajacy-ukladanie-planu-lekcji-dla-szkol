import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

import TeacherForm from '../../../components/teacher-form/TeacherForm';

const EditTeacher = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const [name, setName] = useState(location.state.teacher.Name);
	const [surname, setSurname] = useState(location.state.teacher.Surname);
	const [errorMessage, setErrorMessage] = useState(''); // tu będzie info o niepowodzeniach - też z backendu

	const onSubmit = () => {
		axios
			.put(
				`http://127.0.0.1:8000/api/teachers/${location.state.teacher.ID_Teacher}/`,
				{
					Name: name,
					Surname: surname,
				},
			)
			.then(response => navigate('/teachers'))
			.catch(error => {
				// TODO - handle errors
			});
	};

	return (
		<TeacherForm
			onSubmit={onSubmit}
			formTitle='Edit teacher'
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
