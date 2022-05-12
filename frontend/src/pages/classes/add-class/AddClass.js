import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import ClassForm from '../../../components/class-form/ClassForm';

const AddClass = () => {
	const navigate = useNavigate();
	const [className, setClassName] = useState('');
	const [year, setYear] = useState(2022);
	const [errorMessage, setErrorMessage] = useState(''); // tu będzie info o niepowodzeniach - też z backendu

	const onSubmit = () => {
		console.log('submit formularza dla klas');
		navigate('/classes');
	};

	return (
		<ClassForm
			onSubmit={onSubmit}
			formTitle='Add class'
			className={className}
			setClassName={setClassName}
			year={year}
			setYear={setYear}
			actionText='Add'
			errorMessage={errorMessage}
			setErrorMessage={setErrorMessage}
		/>
	);
};

export default AddClass;
