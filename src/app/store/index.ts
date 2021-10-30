import { configureStore, DeepPartial } from '@reduxjs/toolkit';
import AuthReducer from './reducers/auth';

const STATE_NAME = 'state';

const getOldState = () => JSON.parse(localStorage.getItem(STATE_NAME) as string);

const store = configureStore({
  preloadedState: (getOldState() as DeepPartial<never>) || undefined,
  reducer: {
    auth: AuthReducer,
  },
});

store.subscribe(() => {
  const state = JSON.stringify(store.getState());
  localStorage.setItem(STATE_NAME, state);
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
