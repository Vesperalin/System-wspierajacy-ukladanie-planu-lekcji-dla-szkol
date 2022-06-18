import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import ClassroomForm from '../../../components/classroom-form/ClassroomForm';

const AddClassroom = () => {
	const navigate = useNavigate();
	const [classroomNumber, setClassroomNumber] = useState(0);
	const [errorMessage, setErrorMessage] = useState('');

	const onSubmit = () => {
		axios
			.post('http://127.0.0.1:8000/api/classrooms/', {
				Classroom_no: classroomNumber,
			})
			.then(response => navigate('/classrooms'))
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
