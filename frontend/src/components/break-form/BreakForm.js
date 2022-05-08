import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import style from './BreakForm.module.scss';

const isPositive = value => value >= 0;

const BreakForm = props => {
	const navigate = useNavigate();
	const [isStartHourValid, setIsStartHourValid] = useState(true);
	const [isStartMinuteValid, setIsStarMinuteValid] = useState(true);
	const [isEndHourValid, setIsEndHourValid] = useState(true);
	const [isEndMinuteValid, setIsEndMinuteValid] = useState(true);

	const onSubmitHandler = event => {
		event.preventDefault();
		const ifInputValid =
			isStartHourValid &&
			isStartMinuteValid &&
			isEndHourValid &&
			isEndMinuteValid;

		if (!ifInputValid) {
			props.setErrorMessage('The input is invalid. Numbers must be positive!');
			return;
		} else {
			props.setErrorMessage('');
			props.onSubmit();
			navigate('/breaks');
		}
	};

	const onStartHourHandler = event => {
		const startHour = event.target.value;

		if (isPositive(startHour)) {
			setIsStartHourValid(true);
		} else {
			setIsStartHourValid(false);
		}

		props.setStartHour(startHour);
	};

	const onStartMinuteHandler = event => {
		const startMinute = event.target.value;

		if (isPositive(startMinute)) {
			setIsStarMinuteValid(true);
		} else {
			setIsStarMinuteValid(false);
		}

		props.setStartMinute(startMinute);
	};

	const onEndHourHandler = event => {
		const endHour = event.target.value;

		if (isPositive(endHour)) {
			setIsEndHourValid(true);
		} else {
			setIsEndHourValid(false);
		}

		props.setEndHour(endHour);
	};

	const onEndMinuterHandler = event => {
		const endMinute = event.target.value;

		if (isPositive(endMinute)) {
			setIsEndMinuteValid(true);
		} else {
			setIsEndMinuteValid(false);
		}

		props.setEndMinute(endMinute);
	};

	const startHourStyleClasses = `${isStartHourValid ? '' : style.invalid}`;
	const startMinuteStyleClasses = `${isStartMinuteValid ? '' : style.invalid}`;
	const endHourStyleClasses = `${isEndHourValid ? '' : style.invalid}`;
	const endMinuteStyleClasses = `${isEndMinuteValid ? '' : style.invalid}`;

	return (
		<div className={style.content} onSubmit={onSubmitHandler}>
			<h1>{props.formTitle}</h1>
			<form>
				<label htmlFor='start-hour'>Start hour</label>
				<input
					id='start-hour'
					type='number'
					value={props.startHour}
					onChange={onStartHourHandler}
					className={startHourStyleClasses}
					required
				/>
				<label htmlFor='start-minute'>Start minute</label>
				<input
					id='start-minute'
					type='number'
					value={props.startMinute}
					onChange={onStartMinuteHandler}
					className={startMinuteStyleClasses}
					required
				/>
				<label htmlFor='end-hour'>End hour</label>
				<input
					id='end-hour'
					type='number'
					value={props.endHour}
					onChange={onEndHourHandler}
					className={endHourStyleClasses}
					required
				/>
				<label htmlFor='end-minute'>End minute</label>
				<input
					id='end-minute'
					type='number'
					value={props.endMinute}
					onChange={onEndMinuterHandler}
					className={endMinuteStyleClasses}
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
