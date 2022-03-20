import { configureStore } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage' 
import { persistReducer } from 'redux-persist'
import thunk from 'redux-thunk'
import pageReducer from './Slices/pageSlice';

const persistConfig = {
  key: 'root',
  storage,
 
};

const persistedReducer = persistReducer(persistConfig, pageReducer);

export const store = configureStore({
  reducer: pageReducer

})



