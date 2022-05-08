import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import style from './ClassroomForm.module.scss';

const isPositive = value => value >= 0;

const ClassroomForm = props => {
	const navigate = useNavigate();
	const [isClassroomValid, setIsClassroomValid] = useState(true);

	const onSubmitHandler = event => {
		event.preventDefault();

		if (!isClassroomValid) {
			props.setErrorMessage(
				'The input is invalid. Year must be positive and class name not empty!',
			);
			return;
		} else {
			props.setErrorMessage('');
			props.onSubmit();
			navigate('/classrooms');
		}
	};

	const onClassroomHandler = event => {
		const classroom = event.target.value;

		if (isPositive(classroom)) {
			setIsClassroomValid(true);
		} else {
			setIsClassroomValid(false);
		}

		props.setClassroomNumber(classroom);
	};

	const classroomStyleClasses = `${isClassroomValid ? '' : style.invalid}`;

	return (
		<div className={style.content} onSubmit={onSubmitHandler}>
			<h1>{props.formTitle}</h1>
			<form>
				<label htmlFor='classroom'>Classroom number</label>
				<input
					id='classroom'
					type='text'
					value={props.classroomNumber}
					onChange={onClassroomHandler}
					className={classroomStyleClasses}
					required
				/>
				<div className={style['action-button-wrapper']}>
					<button className={style.button}>{props.actionText}</button>
				</div>
			</form>
			{props.errorMessage !== '' && (
				<p className={style.error}>{props.errorMessage}</p>
			)}
			<button onClick={() => navigate('/classrooms')} className={style.button}>
				&larr; Back
			</button>
		</div>
	);
};

export default ClassroomForm;
