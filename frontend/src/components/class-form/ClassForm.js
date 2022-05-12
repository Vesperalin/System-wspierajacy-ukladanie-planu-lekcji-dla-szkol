import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import style from './ClassForm.module.scss';

const isPositive = value => value >= 0;
const isNotEmpty = value => value.trim() !== '';

const ClassForm = props => {
	const navigate = useNavigate();
	const [isClassValid, setIsClassValid] = useState(true);
	const [isYearValid, setIsYearValid] = useState(true);

	const onSubmitHandler = event => {
		event.preventDefault();
		const ifInputValid = isClassValid && isYearValid;

		if (!ifInputValid) {
			props.setErrorMessage(
				'The input is invalid. Year must be positive and class name not empty!',
			);
			return;
		} else {
			props.setErrorMessage('');
			props.onSubmit();
		}
	};

	const onClassHandler = event => {
		const className = event.target.value;

		if (isNotEmpty(className)) {
			setIsClassValid(true);
		} else {
			setIsClassValid(false);
		}

		props.setClassName(className);
	};

	const onYearHandler = event => {
		const year = event.target.value;

		if (isPositive(year)) {
			setIsYearValid(true);
		} else {
			setIsYearValid(false);
		}

		props.setYear(year);
	};

	const classStyleClasses = `${isClassValid ? '' : style.invalid}`;
	const yearStyleClasses = `${isYearValid ? '' : style.invalid}`;

	return (
		<div className={style.content} onSubmit={onSubmitHandler}>
			<h1>{props.formTitle}</h1>
			<form>
				<label htmlFor='class-name'>Class name</label>
				<input
					id='class-name'
					type='text'
					value={props.className}
					onChange={onClassHandler}
					className={classStyleClasses}
					required
				/>
				<label htmlFor='year'>Year</label>
				<input
					id='year'
					type='number'
					value={props.year}
					onChange={onYearHandler}
					className={yearStyleClasses}
					required
					min='1900'
					max='3099'
					step='1'
				/>
				<div className={style['action-button-wrapper']}>
					<button className={style.button}>{props.actionText}</button>
				</div>
			</form>
			{props.errorMessage !== '' && (
				<p className={style.error}>{props.errorMessage}</p>
			)}
			<button onClick={() => navigate('/classes')} className={style.button}>
				&larr; Back
			</button>
		</div>
	);
};

export default ClassForm;
