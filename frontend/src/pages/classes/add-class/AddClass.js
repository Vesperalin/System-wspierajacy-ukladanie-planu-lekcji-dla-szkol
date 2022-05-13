import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import ClassForm from '../../../components/class-form/ClassForm';

const AddClass = () => {
	const navigate = useNavigate();
	const [className, setClassName] = useState('');
	const [year, setYear] = useState(2022);
	const [errorMessage, setErrorMessage] = useState('');

	const onSubmit = () => {
		axios
			.post('http://127.0.0.1:8000/api/classes/', {
				Class_no: className,
				Year: year,
			})
			.then(response => navigate('/classes'))
			.catch(error => {
				if (error.response.status === 400) {
					setErrorMessage(error.response.data.message);
				} else if (error.response.status === 404) {
					setErrorMessage(error.response.data.detail);
				} else {
					setErrorMessage('Unknown error occurred');
				}
			});
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
