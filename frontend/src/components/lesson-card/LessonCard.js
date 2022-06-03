import React from 'react';
import { useDrag } from 'react-dnd';

import style from './LessonCard.module.scss';
import editImage from '../../assets/edit.png';
import deleteImage from '../../assets/delete.png';

const LessonCard = props => {
	const [{ isDragging }, dragRef] = useDrag(() => ({
		type: 'lesson',
		item: { lesson: props.lesson },
		collect: monitor => ({
			isDragging: !!monitor.isDragging(),
		}),
	}));

	return (
		<div
			className={style['card']}
			ref={dragRef}
			style={props.color !== undefined && { background: props.color }}
		>
			<div className={style['upper']}>
				<p>{props.lesson.subject.Subject_name}</p>
				<div>
					<img
						src={editImage}
						onClick={() => {
							props.onOpenEditClassModalHandler(props.lesson);
						}}
						alt='edit'
					/>
					<img
						src={deleteImage}
						onClick={() => {
							props.onDeleteLessonHandler(props.lesson);
						}}
						alt='edit'
					/>
				</div>
			</div>
			<div className={style['lower']}>
				<p>{`${props.lesson.teacher.Name} ${props.lesson.teacher.Surname}`}</p>
				<p>s. {props.lesson.classroom.Classroom_no}</p>
			</div>
		</div>
	);
};

export default LessonCard;
