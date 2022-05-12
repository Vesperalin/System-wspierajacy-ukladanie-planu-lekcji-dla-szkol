import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ClassroomForm from '../../../components/classroom-form/ClassroomForm';

const AddClassroom = () => {
	const navigate = useNavigate();
	const [classroomNumber, setClassroomNumber] = useState(0);
	const [errorMessage, setErrorMessage] = useState(''); // tu będzie info o niepowodzeniach - też z backendu

	const onSubmit = () => {
		console.log('submit formularza dla sal szkolnych');
		navigate('/classrooms');
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
