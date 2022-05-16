import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDrop } from 'react-dnd';

import Toolbox from '../../../components/toolbox/Toolbox';
import style from './Creator.module.scss';
import LessonCard from '../../../components/lesson-card/LessonCard';
import { scheduleSliceActions } from '../../../store/schedule-slice';

const ScheduleCreator = () => {
	const [board, setBoard] = useState([]);
	const createdLessons = useSelector(state => state.schedule.createdLessons);
	const [showEditClassModal, setShowEditClassModal] = useState(false);
	const [chosenClassForEdit, setChosenClassForEdit] = useState({});
	const dispatch = useDispatch();

	const [{ isOver }, dropRef] = useDrop(() => ({
		accept: 'lesson',
		drop: item => onDropHandler(item.id),
		collect: monitor => ({
			isOver: !!monitor.isOver(),
		}),
	}));

	const onDropHandler = id => {
		// id jest poprawne
		console.log(id);
		// Tu nie działa - createdLessons nie jest widziane
		console.log(createdLessons);
		const a = createdLessons.find(lesson => lesson.id === id);
		// to tez nie jest widziane
		console.log(a);
		// logika dodawania
		const lessons = createdLessons.filter(l => id === l.id);
		setBoard(board => [...board, lessons[0]]);
	};

	const onOpenEditClassModalHandler = lesson => {
		setChosenClassForEdit(lesson);
		setShowEditClassModal(true);
	};

	const onDeleteLessonHandler = lesson => {
		dispatch(scheduleSliceActions.deleteLesson(lesson));
	};

	return (
		<div className={style['wrapper']}>
			<div className={style['toolbox-wrapper']}>
				<Toolbox
					showEditClassModal={showEditClassModal}
					setShowEditClassModal={setShowEditClassModal}
					chosenClassForEdit={chosenClassForEdit}
					setChosenClassForEdit={setChosenClassForEdit}
				/>
			</div>
			<div className={style['panel-wrapper']} ref={dropRef}>
				{board.length > 0 &&
					board.map(lesson => {
						return (
							<LessonCard
								key={lesson.id}
								lesson={lesson}
								onOpenEditClassModalHandler={onOpenEditClassModalHandler}
								onDeleteLessonHandler={onDeleteLessonHandler}
							/>
						);
					})}
				{
					// To normalnie działa - createdLessons widziane normalnie
					//console.log(createdLessons)
				}
				{
					// To normalnie działa - createdLessons widziane normalnie
					// createdLessons.map(lesson => {
					// 	return (
					// 		<LessonCard
					// 			key={lesson.id}
					// 			lesson={lesson}
					// 			onOpenEditClassModalHandler={onOpenEditClassModalHandler}
					// 			onDeleteLessonHandler={onDeleteLessonHandler}
					// 		/>
					// 	);
					// })
				}
			</div>
		</div>
	);
};

export default ScheduleCreator;
