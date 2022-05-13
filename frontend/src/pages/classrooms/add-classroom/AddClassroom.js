import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import ClassroomForm from '../../../components/classroom-form/ClassroomForm';

const AddClassroom = () => {
	const navigate = useNavigate();
	const [classroomNumber, setClassroomNumber] = useState(0);
	const [errorMessage, setErrorMessage] = useState(''); // tu będzie info o niepowodzeniach - też z backendu

	const onSubmit = () => {
		axios
			.post('http://127.0.0.1:8000/api/classrooms/', {
				Classroom_no: classroomNumber,
			})
			.then(response => navigate('/classrooms'))
			.catch(error => {
				// TODO error handling
				console.log(error);
			});
	};

	return (
		<ClassroomForm
			onSubmit={onSubmit}
			formTitle='Add classroom'
			classroomNumber={classroomNumber}
			setClassroomNumber={setClassroomNumber}
			actionText='Add'
			errorMessage={errorMessage}
			setErrorMessage={setErrorMessage}
		/>
	);
};

export default AddClassroom;
