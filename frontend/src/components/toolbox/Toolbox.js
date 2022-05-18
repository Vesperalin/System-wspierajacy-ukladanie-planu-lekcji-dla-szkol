import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { useDrop } from 'react-dnd';

import Button from '../button/Button';
import AddClassModal from '../class-modal/AddClassModal';
import EditClassModal from '../class-modal/EditClassModal';
import style from './Toolbox.module.scss';
import { scheduleSliceActions } from '../../store/schedule-slice';
import LessonCard from '../lesson-card/LessonCard';

const Toolbox = props => {
	const createdLessons = useSelector(state => state.schedule.createdLessons);
	const [errorMessage, setErrorMessage] = useState('');
	const [showAddClassModal, setShowAddClassModal] = useState(false);
	const dispatch = useDispatch();

	const [{ isOver }, dropRef] = useDrop(() => ({
		accept: 'lesson',
		drop: item => onDropHandler(item.id),
		collect: monitor => ({
			isOver: !!monitor.isOver(),
		}),
	}));

	const onDropHandler = id => {
		dispatch(scheduleSliceActions.revertLessonFromSchedule({ id: id }));
	};

	const onOpenAddClassModalHandler = () => {
		setShowAddClassModal(true);
	};

	const onOpenEditClassModalHandler = lesson => {
		props.setChosenClassForEdit(lesson);
		props.setShowEditClassModal(true);
	};

	const onDeleteLessonHandler = lesson => {
		dispatch(scheduleSliceActions.deleteLesson(lesson));
	};

	return (
		<div className={style['toolbox-wrapper']}>
			{showAddClassModal && (
				<AddClassModal
					errorMessage={errorMessage}
					setErrorMessage={setErrorMessage}
					setShowAddClassModal={setShowAddClassModal}
				/>
			)}
			{props.showEditClassModal && (
				<EditClassModal
					errorMessage={errorMessage}
					setErrorMessage={setErrorMessage}
					setShowEditClassModal={props.setShowEditClassModal}
					chosenClassForEdit={props.chosenClassForEdit}
				/>
			)}
			<Button text='+ Add' onClick={onOpenAddClassModalHandler} />
			<div className={style['card-wrapper']} ref={dropRef}>
				{createdLessons.map(lesson => {
					return (
						<LessonCard
							key={lesson.id}
							lesson={lesson}
							onOpenEditClassModalHandler={onOpenEditClassModalHandler}
							onDeleteLessonHandler={onDeleteLessonHandler}
						/>
					);
				})}
			</div>
			<div>{errorMessage !== '' && <p>{errorMessage}</p>}</div>
		</div>
	);
};

export default Toolbox;
