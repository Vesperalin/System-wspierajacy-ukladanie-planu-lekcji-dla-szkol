import { useState } from 'react';

import BreakForm from '../../../components/break-form/BreakForm';

const AddBreak = () => {
	const [startHour, setStartHour] = useState(0);
	const [startMinute, setStartMinute] = useState(0);
	const [endHour, setEndHour] = useState(0);
	const [endMinute, setEndMinute] = useState(0);
	const [errorMessage, setErrorMessage] = useState(''); // tu będzie info o niepowodzeniach - też z backendu

	const onSubmit = () => {
		console.log('submit formularza dla przwerw');
	};

	return (
		<BreakForm
			onSubmit={onSubmit}
			formTitle='Add break'
			startHour={startHour}
			setStartHour={setStartHour}
			startMinute={startMinute}
			setStartMinute={setStartMinute}
			endHour={endHour}
			setEndHour={setEndHour}
			endMinute={endMinute}
			setEndMinute={setEndMinute}
			actionText='Add'
			errorMessage={errorMessage}
			setErrorMessage={setErrorMessage}
		/>
	);
};

export default AddBreak;
