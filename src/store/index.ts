import {
	combineReducers,
	configureStore,
} from '@reduxjs/toolkit';
import { postApi } from './slices/post';
// ...
const rootReducer = combineReducers({
	[postApi.reducerPath]: postApi.reducer,
});
export const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(postApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
