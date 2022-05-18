import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getLessonsHours = createAsyncThunk('add-schedule', async () => {
	return axios.get('http://127.0.0.1:8000/api/lesson_hours/').then(data => {
		return data;
	});
});

const scheduleSlice = createSlice({
	name: 'schedule',
	initialState: {
		chosenSchedule: [[], [], [], [], []],
		createdLessons: [],
		nextLessonIndex: 1,
		lessonsHours: [],
	},
	reducers: {
		clearSchedule(state) {
			state.createdLessons = [];
			state.chosenSchedule = [[], [], [], [], []];

			for (let i = 0; i < state.lessonsHours.length; i++) {
				for (let j = 0; j < 5; j++) {
					state.chosenSchedule[j].push({});
				}
			}
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
		editLessonInToolboxAndSchedule(state, action) {
			const lessonEditData = action.payload;

			const foundLessonIndex = state.createdLessons.findIndex(
				lesson => lesson.id === lessonEditData.id,
			);

			// element in toolbox
			if (foundLessonIndex !== -1) {
				state.createdLessons[foundLessonIndex] = {
					id: lessonEditData.id,
					teacher: lessonEditData.teacher,
					subject: lessonEditData.subject,
					classroom: lessonEditData.classroom,
				};
			} else {
				// element on schedule
				for (let i = 0; i < state.chosenSchedule.length; i++) {
					for (let j = 0; j < state.chosenSchedule[i].length; j++) {
						if (Object.keys(state.chosenSchedule[i][j]).length !== 0) {
							if (state.chosenSchedule[i][j].id === lessonEditData.id) {
								state.chosenSchedule[i][j] = {
									id: lessonEditData.id,
									teacher: lessonEditData.teacher,
									subject: lessonEditData.subject,
									classroom: lessonEditData.classroom,
								};
							}
						}
					}
				}
			}
		},
		revertLessonFromSchedule(state, action) {
			const id = action.payload.id;

			let lessonToMove = undefined;

			for (let i = 0; i < state.chosenSchedule.length; i++) {
				for (let j = 0; j < state.chosenSchedule[i].length; j++) {
					if (Object.keys(state.chosenSchedule[i][j]).length !== 0) {
						if (state.chosenSchedule[i][j].id === id) {
							lessonToMove = state.chosenSchedule[i][j];
							state.chosenSchedule[i][j] = {};
						}
					}
				}
			}
			if (lessonToMove !== undefined) {
				state.createdLessons.push(lessonToMove);
			}
		},
		addLessonToSchedule(state, action) {
			// TODO - nie działa na razie podmienianie - póki co jest zabranianie podmieniania
			const id = action.payload.id;
			const column = action.payload.column;
			const row = action.payload.row;

			if (Object.keys(state.chosenSchedule[column][row]).length === 0) {
				const lesson = state.createdLessons.filter(l => l.id === id);

				// if element in toolbox
				if (lesson[0] !== undefined) {
					state.chosenSchedule[column][row] = lesson[0];
					state.createdLessons = state.createdLessons.filter(l => l.id !== lesson[0].id);
				} else {
					// if element in schedule
					let lessonToMove = undefined;

					for (let i = 0; i < state.chosenSchedule.length; i++) {
						for (let j = 0; j < state.chosenSchedule[i].length; j++) {
							if (Object.keys(state.chosenSchedule[i][j]).length !== 0) {
								if (state.chosenSchedule[i][j].id === id) {
									lessonToMove = state.chosenSchedule[i][j];
									state.chosenSchedule[i][j] = {};
								}
							}
						}
					}

					state.chosenSchedule[column][row] = lessonToMove;
				}
			}

			// ! To nie działa - podmienianie
			/*const id = action.payload.id;
			const column = action.payload.column;
			const row = action.payload.row;

			const lessonOnBoard = state.chosenSchedule[column][row];

			if (lessonOnBoard !== undefined && Object.keys(lessonOnBoard).length !== 0) {
				state.createdLessons.push({
					teacher: lessonOnBoard.teacher,
					subject: lessonOnBoard.subject,
					classroom: lessonOnBoard.classroom,
					id: lessonOnBoard.id,
				});
				state.chosenSchedule[column][row] = {};
			}

			const lesson = state.createdLessons.filter(l => l.id === id);

			// if element in toolbox
			if (lesson[0] !== undefined) {
				state.chosenSchedule[column][row] = lesson[0];
				state.createdLessons = state.createdLessons.filter(l => l.id !== lesson[0].id);
			} else {
				// if element in schedule
				let lessonInSchedule = undefined;

				for (let i = 0; i < state.chosenSchedule.length; i++) {
					for (let j = 0; j < state.chosenSchedule[i].length; j++) {
						if (
							state.chosenSchedule[i][j] !== undefined &&
							Object.keys(state.chosenSchedule[i][j]).length !== 0
						) {
							if (state.chosenSchedule[i][j].id === id) {
								lessonInSchedule = state.chosenSchedule[i][j];
								state.chosenSchedule[i][j] = {};
							}
						}
					}
				}
				console.log(JSON.stringify(lessonInSchedule), row, column);
				state.chosenSchedule[column][row] = lessonInSchedule;
			}

			//console.log(JSON.stringify(state.chosenSchedule));
			*/
		},
		deleteLessonFromSchedule(state, action) {
			const column = action.payload.column;
			const row = action.payload.row;
			state.chosenSchedule[column][row] = {};
		},
	},
	extraReducers: {
		[getLessonsHours.pending]: state => {
			console.log('pending');
		},
		[getLessonsHours.fulfilled]: (state, { payload }) => {
			state.lessonsHours = payload.data;
			state.chosenSchedule = [[], [], [], [], []];

			for (let i = 0; i < payload.data.length; i++) {
				for (let j = 0; j < 5; j++) {
					state.chosenSchedule[j].push({});
				}
			}
		},
		[getLessonsHours.rejected]: state => {
			console.log('rejected');
		},
	},
});

export const scheduleSliceActions = scheduleSlice.actions;

export default scheduleSlice;
