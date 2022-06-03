import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

import ClassForm from '../../../components/class-form/ClassForm';

const EditClass = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const [className, setClassName] = useState(location.state.school_class.Class_no);
	const [year, setYear] = useState(location.state.school_class.Year);
	const [errorMessage, setErrorMessage] = useState('');

	const onSubmit = () => {
		axios
			.put(`http://127.0.0.1:8000/api/classes/${location.state.school_class.ID_Class}/`, {
				Class_no: className,
				Year: year,
			})
			.then(response => navigate('/classes'))
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
