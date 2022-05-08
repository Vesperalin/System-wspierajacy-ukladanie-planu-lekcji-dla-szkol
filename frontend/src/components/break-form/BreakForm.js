import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import style from './BreakForm.module.scss';

const isNotEmpty = value => value.trim() !== '';

const BreakForm = props => {
	const navigate = useNavigate();
	const [isStartTimeValid, setIsStartTimeValid] = useState(true);
	const [isEndTimeValid, setIsEndTimeValid] = useState(true);

	const onSubmitHandler = event => {
		event.preventDefault();
		const ifInputValid = isStartTimeValid && isEndTimeValid;

		if (!ifInputValid) {
			props.setErrorMessage('The input is invalid. Numbers must be positive!');
			return;
		} else {
			props.setErrorMessage('');
			props.onSubmit();
			navigate('/breaks');
		}
	};

	const onStartTimeHandler = event => {
		const startTime = event.target.value;

		if (isNotEmpty(startTime)) {
			setIsStartTimeValid(true);
		} else {
			setIsStartTimeValid(false);
		}

		props.setStartTime(startTime);
	};

	const onEndTimeHandler = event => {
		const endTime = event.target.value;

		if (isNotEmpty(endTime)) {
			setIsEndTimeValid(true);
		} else {
			setIsEndTimeValid(false);
		}

		props.setEndTime(endTime);
	};

	const startTimeStyleClasses = `${isStartTimeValid ? '' : style.invalid}`;
	const endTimeStyleClasses = `${isEndTimeValid ? '' : style.invalid}`;

	return (
		<div className={style.content} onSubmit={onSubmitHandler}>
			<h1>{props.formTitle}</h1>
			<form>
				<label htmlFor='start-time'>Start time</label>
				<input
					id='start-time'
					type='time'
					value={props.startTime}
					onChange={onStartTimeHandler}
					className={startTimeStyleClasses}
					required
				/>
				<label htmlFor='end-time'>End time</label>
				<input
					id='end-time'
					type='time'
					value={props.endTime}
					onChange={onEndTimeHandler}
					className={endTimeStyleClasses}
					required
				/>
				<div className={style['action-button-wrapper']}>
					<button className={style.button}>{props.actionText}</button>
				</div>
			</form>
			{props.errorMessage !== '' && (
				<p className={style.error}>{props.errorMessage}</p>
			)}
			<button onClick={() => navigate('/breaks')} className={style.button}>
				&larr; Back
			</button>
		</div>
	);
};

export default BreakForm;
