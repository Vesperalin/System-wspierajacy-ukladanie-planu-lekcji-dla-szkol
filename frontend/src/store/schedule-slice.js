import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getLessonsHoursAndProgram = createAsyncThunk('add-schedule', async params => {
	return axios
		.all([
			axios.get('http://127.0.0.1:8000/api/lesson_hours/'),
			axios.post('http://127.0.0.1:8000/api/class_program/', params.school_class.value),
			axios.post('http://127.0.0.1:8000/api/random_plan/', params.school_class.value),
		])
		.then(
			axios.spread((...responses) => {
				return {
					lessonsHours: responses[0].data,
					program: responses[1].data,
					randomPlan: responses[2].data,
					isCreator: params.isCreator === 1 ? true : false,
				};
			}),
		)
		.catch(error => {
			return error;
		});
});

const scheduleSlice = createSlice({
	name: 'schedule',
	initialState: {
		chosenSchedule: [[], [], [], [], []],
		createdLessons: [],
		nextLessonIndex: 1,
		lessonsHours: [],
		programForClass: [],
		currentProgramForClass: {},
	},
	reducers: {
		calculateProgram(state) {
			const tempCurrProgramForClass = {};

			for (let i = 0; i < state.programForClass.length; i++) {
				tempCurrProgramForClass[state.programForClass[i].Subject] =
					state.programForClass[i].Hours_no;
			}

			for (let row = 0; row < state.chosenSchedule.length; row++) {
				for (let column = 0; column < state.chosenSchedule[row].length; column++) {
					if (state.chosenSchedule[row][column].subject !== undefined) {
						if (state.chosenSchedule[row][column].subject.Subject_name in tempCurrProgramForClass) {
							if (
								tempCurrProgramForClass[state.chosenSchedule[row][column].subject.Subject_name] > 0
							) {
								tempCurrProgramForClass[state.chosenSchedule[row][column].subject.Subject_name]--;
							}
						}
					}
				}
			}
			state.currentProgramForClass = tempCurrProgramForClass;
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
			const id = action.payload.item.lesson.id;

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
		},
		deleteLessonFromSchedule(state, action) {
			const column = action.payload.column;
			const row = action.payload.row;
			state.chosenSchedule[column][row] = {};
		},
		assignLessonsToPlan(state, action) {
			state.chosenSchedule = action.payload;
			state.nextLessonIndex = state.lessonsHours.length + 1;
		},
	},
	extraReducers: {
		[getLessonsHoursAndProgram.pending]: state => {
			console.log('pending lessons hours and program');
		},
		[getLessonsHoursAndProgram.fulfilled]: (state, { payload }) => {
			console.log(payload);

			state.lessonsHours = payload.lessonsHours;
			state.chosenSchedule = [[], [], [], [], []];

			for (let i = 0; i < payload.lessonsHours.length; i++) {
				for (let j = 0; j < 5; j++) {
					state.chosenSchedule[j].push({});
				}
			}

			state.programForClass = payload.program;

			for (let i = 0; i < payload.program.length; i++) {
				const index = payload.program[i].Subject;
				const value = payload.program[i].Hours_no;

				state.currentProgramForClass[index] = value;
			}

			if (payload.isCreator) {
				state.createdLessons = payload.randomPlan.map(elem => {
					const id = state.nextLessonIndex;
					state.nextLessonIndex += 1;
					return { ...elem, id: id };
				});
			} else {
				state.createdLessons = [];
			}
		},
		[getLessonsHoursAndProgram.rejected]: state => {
			console.log('rejected lessons hours and program');
		},
	},
});

export const scheduleSliceActions = scheduleSlice.actions;

export default scheduleSlice;
