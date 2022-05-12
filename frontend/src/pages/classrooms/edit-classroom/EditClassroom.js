import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';

import ClassroomForm from '../../../components/classroom-form/ClassroomForm';

const EditClassroom = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const [classroomNumber, setClassroomNumber] = useState(
		location.state.classroom.Classroom_no,
	);
	const [errorMessage, setErrorMessage] = useState(''); // tu będzie info o niepowodzeniach - też z backendu

	const onSubmit = () => {
		console.log('submit formularza dla sal szkolnych');
		navigate('/classrooms');
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
