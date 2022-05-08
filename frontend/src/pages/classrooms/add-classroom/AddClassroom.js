import { useState } from 'react';

import ClassroomForm from '../../../components/classroom-form/ClassroomForm';

const AddClassroom = () => {
	const [classroomNumber, setClassroomNumber] = useState(0);
	const [errorMessage, setErrorMessage] = useState(''); // tu będzie info o niepowodzeniach - też z backendu

	const onSubmit = () => {
		console.log('submit formularza dla sal szkolnych');
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
