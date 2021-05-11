import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
/* eslint-disable import/no-cycle */
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import createRootReducer from './slices/rootReducer';

const rootReducer = createRootReducer();
const persistConfig = {
  key: 'root',
  storage,
};

// see https://github.com/rt2zz/redux-persist/issues/1140
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
