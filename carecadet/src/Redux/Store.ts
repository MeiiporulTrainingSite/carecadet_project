import { configureStore } from '@reduxjs/toolkit'

import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import { persistReducer,FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER, } from 'redux-persist';

import loginSlice from './LoginSlice'
import {facilityReducer} from './facilitySlice';
import  editSlice  from './orgSlice';

const reducers = combineReducers({
  auth: loginSlice,
  edit:editSlice,
  editFacility: facilityReducer
});

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);
// ...

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [   PERSIST, REGISTER],
      },
    }),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch