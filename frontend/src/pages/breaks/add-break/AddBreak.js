import { useState } from 'react';

import BreakForm from '../../../components/break-form/BreakForm';

const AddBreak = () => {
	const [startTime, setStartTime] = useState('00:00');
	const [endTime, setEndTime] = useState('00:00');
	const [errorMessage, setErrorMessage] = useState(''); // tu będzie info o niepowodzeniach - też z backendu

	const onSubmit = () => {
		console.log('submit formularza dla przwerw');
	};

	return (
		<BreakForm
			onSubmit={onSubmit}
			formTitle='Add break'
			startTime={startTime}
			setStartTime={setStartTime}
			endTime={endTime}
			setEndTime={setEndTime}
			actionText='Add'
			errorMessage={errorMessage}
			setErrorMessage={setErrorMessage}
		/>
	);
};

export default AddBreak;
