import { createSlice } from '@reduxjs/toolkit';

// TODO - change chosenSchedule - should be based on breaks - from backend
const scheduleSlice = createSlice({
	name: 'schedule',
	initialState: {
		chosenSchedule: [
			[{}, {}, {}, {}],
			[{}, {}, {}, {}],
			[{}, {}, {}, {}],
			[{}, {}, {}, {}],
			[{}, {}, {}, {}],
		],
		createdLessons: [],
		nextLessonIndex: 1,
	},
	reducers: {
		clearSchedule(state) {
			// TODO - change chosenSchedule - should be based on breaks - from backend
			state.chosenSchedule = [];
			state.createdLessons = [];
		},
		addLesson(state, action) {
			const teacher = action.payload.teacher;
			const subject = action.payload.subject;
			const classroom = action.payload.classroom;

			state.createdLessons.push({ teacher, subject, classroom, id: state.nextLessonIndex });

			state.nextLessonIndex += 1;
		},
		deleteLesson(state, action) {
			const lessonToDelete = action.payload;
			state.createdLessons = state.createdLessons.filter(lesson => lesson.id !== lessonToDelete.id);
		},
		editLesson(state, action) {
			const lessonEditData = action.payload;

			const foundLessonIndex = state.createdLessons.findIndex(
				lesson =>
					lesson.classroom.Classroom_no === lessonEditData.prevClassroom.Classroom_no &&
					lesson.subject.ID_Subject === lessonEditData.prevSubject.ID_Subject &&
					lesson.teacher.ID_Teacher === lessonEditData.prevTeacher.ID_Teacher,
			);

			state.createdLessons[foundLessonIndex] = {
				id: state.createdLessons[foundLessonIndex].id,
				teacher: lessonEditData.teacher,
				subject: lessonEditData.subject,
				classroom: lessonEditData.classroom,
			};
		},
		addLessonToSchedule(state, action) {
			// TODO - przefiltrować chosenSchedule i usunąć ten kurs z innnego miejsca, bo moze ktos go przesunął z innego pola, a nie toolboxa
			// TODO - state.chosenSchedule[0].push(lesson[0]); zmienić te 0 - podawać przez action sobie index
			// const lesson = state.createdLessons.filter(l => l.id === action.payload);
			// state.chosenSchedule[0].push(lesson[0]);
			// state.createdLessons = state.createdLessons.filter(l => l.id !== lesson[0].id);
			console.log(action.payload);
			console.log(JSON.stringify(state.createdLessons));
			const id = action.payload.id;
			const column = action.payload.column;
			const row = action.payload.row;
			console.log(column);

			const lesson = state.createdLessons.filter(l => l.id === id);
			console.log(lesson);
			state.chosenSchedule[column][row] = lesson[0];
			state.createdLessons = state.createdLessons.filter(l => l.id !== lesson[0].id);
		},
	},
});

export const scheduleSliceActions = scheduleSlice.actions;

export default scheduleSlice;
