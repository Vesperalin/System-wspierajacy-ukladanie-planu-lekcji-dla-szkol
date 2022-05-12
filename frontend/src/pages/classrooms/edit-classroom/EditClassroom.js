import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

import ClassroomForm from '../../../components/classroom-form/ClassroomForm';

const EditClassroom = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const [classroomNumber, setClassroomNumber] = useState(
		location.state.classroom.Classroom_no,
	);
	const [errorMessage, setErrorMessage] = useState(''); // tu będzie info o niepowodzeniach - też z backendu

	const onSubmit = () => {
		axios
			.put(
				`http://127.0.0.1:8000/api/classrooms/${location.state.classroom.Classroom_no}/`,
				{
					Classroom_no: classroomNumber,
				},
			)
			.then(response => navigate('/classrooms'))
			.catch(error => {
				// TODO - handle errors
			});
	};

	return (
		<ClassroomForm
			onSubmit={onSubmit}
			formTitle='Edit classroom'
			classroomNumber={classroomNumber}
			setClassroomNumber={setClassroomNumber}
			actionText='Edit'
			errorMessage={errorMessage}
			setErrorMessage={setErrorMessage}
		/>
	);
};

export default EditClassroom;
