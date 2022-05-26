import { configureStore } from '@reduxjs/toolkit';

import scheduleSlice from './schedule-slice';
import userSlice from './user-slice';

const store = configureStore({
	reducer: {
		schedule: scheduleSlice.reducer,
		user: userSlice.reducer,
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
});

export default store;
