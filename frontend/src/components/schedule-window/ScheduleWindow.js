import React from 'react';
import { useDispatch } from 'react-redux';
import { useDrop } from 'react-dnd';

import style from './ScheduleWindow.module.scss';
import LessonCard from '../lesson-card/LessonCard';
import { scheduleSliceActions } from '../../store/schedule-slice';

const ScheduleWindow = props => {
	const dispatch = useDispatch();

	const [{ isOver }, dropRef] = useDrop(() => ({
		accept: 'lesson',
		drop: item => onDropHandler(item.id),
		collect: monitor => ({
			isOver: !!monitor.isOver(),
		}),
	}));

	const onDropHandler = id => {
		dispatch(
			scheduleSliceActions.addLessonToSchedule({ id: id, column: props.column, row: props.row }),
		);
	};

	return (
		<div className={style.window} ref={dropRef}>
			{Object.keys(props.lesson).length !== 0 && (
				<LessonCard
					lesson={props.lesson}
					onOpenEditClassModalHandler={props.onOpenEditClassModalHandler}
					onDeleteLessonHandler={props.onDeleteLessonHandler}
				/>
			)}
		</div>
	);
};

export default ScheduleWindow;
