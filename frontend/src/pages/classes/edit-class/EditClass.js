import { useLocation } from 'react-router-dom';
import { useState } from 'react';

import ClassForm from '../../../components/class-form/ClassForm';

const EditClass = () => {
	const location = useLocation();
	const [className, setClassName] = useState(
		location.state.school_class.ID_Class,
	);
	const [year, setYear] = useState(location.state.school_class.Year);
	const [errorMessage, setErrorMessage] = useState(''); // tu będzie info o niepowodzeniach - też z backendu

	const onSubmit = () => {
		console.log('submit formularza dla klas');
	};

	return (
		<ClassForm
			onSubmit={onSubmit}
			formTitle='Edit class'
			className={className}
			setClassName={setClassName}
			year={year}
			setYear={setYear}
			actionText='Edit'
			errorMessage={errorMessage}
			setErrorMessage={setErrorMessage}
		/>
	);
};

export default EditClass;
