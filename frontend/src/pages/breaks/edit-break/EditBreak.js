import { useLocation } from 'react-router-dom';
import { useState } from 'react';

import BreakForm from '../../../components/break-form/BreakForm';

const EditBreak = () => {
	const location = useLocation();
	const [startHour, setStartHour] = useState(location.state.breakk.Start_hour);
	const [startMinute, setStartMinute] = useState(
		location.state.breakk.Start_minute,
	);
	const [endHour, setEndHour] = useState(location.state.breakk.End_hour);
	const [endMinute, setEndMinute] = useState(location.state.breakk.End_minute);
	const [errorMessage, setErrorMessage] = useState(''); // tu będzie info o niepowodzeniach - też z backendu

	const onSubmit = () => {
		console.log('submit formularza dla przwerw');
	};

	return (
		<BreakForm
			onSubmit={onSubmit}
			formTitle='Edit break'
			startHour={startHour}
			setStartHour={setStartHour}
			startMinute={startMinute}
			setStartMinute={setStartMinute}
			endHour={endHour}
			setEndHour={setEndHour}
			endMinute={endMinute}
			setEndMinute={setEndMinute}
			actionText='Edit'
			errorMessage={errorMessage}
			setErrorMessage={setErrorMessage}
		/>
	);
};

export default EditBreak;
