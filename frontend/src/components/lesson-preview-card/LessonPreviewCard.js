import React from 'react';

import style from './LessonPreviewCard.module.scss';

const LessonPreviewCard = props => {
	return (
		<div className={style['card']} style={{ background: props.color }}>
			<div className={style['upper']}>
				<p>{props.lesson.subject.Subject_name}</p>
			</div>
			<div className={style['lower']}>
				<p>{`${props.lesson.teacher.Name} ${props.lesson.teacher.Surname}`}</p>
				<p>s. {props.lesson.classroom.Classroom_no}</p>
			</div>
		</div>
	);
};

export default LessonPreviewCard;
