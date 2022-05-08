import { useLocation } from 'react-router-dom';
import { useState } from 'react';

import BreakForm from '../../../components/break-form/BreakForm';

const EditBreak = () => {
	const location = useLocation();
	const [startTime, setStartTime] = useState(
		`${('0' + location.state.breakk.Start_hour).slice(-2)}:${(
			'0' + location.state.breakk.Start_minute
		).slice(-2)}`,
	);
	const [endTime, setEndTime] = useState(
		`${('0' + location.state.breakk.End_hour).slice(-2)}:${(
			'0' + location.state.breakk.End_minute
		).slice(-2)}`,
	);
	const [errorMessage, setErrorMessage] = useState(''); // tu będzie info o niepowodzeniach - też z backendu

	const onSubmit = () => {
		console.log('submit formularza dla przwerw');
	};

	return (
		<BreakForm
			onSubmit={onSubmit}
			formTitle='Edit break'
			startTime={startTime}
			setStartTime={setStartTime}
			endTime={endTime}
			setEndTime={setEndTime}
			actionText='Edit'
			errorMessage={errorMessage}
			setErrorMessage={setErrorMessage}
		/>
	);
};

export default EditBreak;
