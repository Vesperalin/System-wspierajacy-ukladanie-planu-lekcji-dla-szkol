import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

import ClassForm from '../../../components/class-form/ClassForm';

const EditClass = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const [className, setClassName] = useState(
		location.state.school_class.ID_Class,
	);
	const [year, setYear] = useState(location.state.school_class.Year);
	const [errorMessage, setErrorMessage] = useState(''); // tu będzie info o niepowodzeniach - też z backendu

	const onSubmit = () => {
		axios
			.put(
				`http://127.0.0.1:8000/api/classes/${location.state.school_class.ID_Class}/`,
				{
					ID_Class: className,
					Year: year,
				},
			)
			.then(response => navigate('/classes'))
			.catch(error => {
				// TODO - handle errors
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
