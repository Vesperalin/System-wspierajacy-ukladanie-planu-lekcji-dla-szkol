import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import style from './SubjectForm.module.scss';

const isNotEmpty = value => value.trim() !== '';

const SubjectForm = props => {
	const navigate = useNavigate();
	const [isSubjectValid, setIsSubjectValid] = useState(true);

	const onSubmitHandler = event => {
		event.preventDefault();

		if (!isSubjectValid) {
			props.setErrorMessage(
				'The input is invalid. Year must be positive and class name not empty!',
			);
			return;
		} else {
			props.setErrorMessage('');
			props.onSubmit();
			navigate('/subjects');
		}
	};

	const onSubjectHandler = event => {
		const subject = event.target.value;

		if (isNotEmpty(subject)) {
			setIsSubjectValid(true);
		} else {
			setIsSubjectValid(false);
		}

		props.setSubjectName(subject);
	};

	const subjectStyleClasses = `${isSubjectValid ? '' : style.invalid}`;

	return (
		<div className={style.content} onSubmit={onSubmitHandler}>
			<h1>{props.formTitle}</h1>
			<form>
				<label htmlFor='subject-name'>Subject name</label>
				<input
					id='subject-name'
					type='text'
					value={props.subjectName}
					onChange={onSubjectHandler}
					className={subjectStyleClasses}
					required
				/>
				<div className={style['action-button-wrapper']}>
					<button className={style.button}>{props.actionText}</button>
				</div>
			</form>
			{props.errorMessage !== '' && (
				<p className={style.error}>{props.errorMessage}</p>
			)}
			<button onClick={() => navigate('/subjects')} className={style.button}>
				&larr; Back
			</button>
		</div>
	);
};

export default SubjectForm;
