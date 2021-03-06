import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import style from './TeacherForm.module.scss';

const isNotEmpty = value => value.trim() !== '';

const TeacherForm = props => {
	const navigate = useNavigate();
	const [isNameValid, setIsNameValid] = useState(true);
	const [isSurnameValid, setIsSurnameValid] = useState(true);

	const onSubmitHandler = event => {
		event.preventDefault();
		const ifInputValid = isNameValid && isSurnameValid;

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

	const onNameHandler = event => {
		const name = event.target.value;

		if (isNotEmpty(name)) {
			setIsNameValid(true);
		} else {
			setIsNameValid(false);
		}

		props.setName(name);
	};

	const onSurnameHandler = event => {
		const surname = event.target.value;

		if (isNotEmpty(surname)) {
			setIsSurnameValid(true);
		} else {
			setIsSurnameValid(false);
		}

		props.setSurname(surname);
	};

	const nameStyleClasses = `${isNameValid ? '' : style.invalid}`;
	const surnameStyleClasses = `${isSurnameValid ? '' : style.invalid}`;

	return (
		<div className={style.content} onSubmit={onSubmitHandler}>
			<h1>{props.formTitle}</h1>
			<form>
				<label htmlFor='name'>Name</label>
				<input
					id='name'
					type='text'
					value={props.name}
					onChange={onNameHandler}
					className={nameStyleClasses}
					required
				/>
				<label htmlFor='surname'>Surname</label>
				<input
					id='surname'
					type='text'
					value={props.surname}
					onChange={onSurnameHandler}
					className={surnameStyleClasses}
					required
				/>
				<div className={style['action-button-wrapper']}>
					<button className={style.button}>{props.actionText}</button>
				</div>
			</form>
			{props.errorMessage !== '' && (
				<p className={style.error}>{props.errorMessage}</p>
			)}
			<button onClick={() => navigate('/teachers')} className={style.button}>
				&larr; Back
			</button>
		</div>
	);
};

export default TeacherForm;
