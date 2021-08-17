import AsyncStorage from '@react-native-async-storage/async-storage';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import React from 'react';
import { Provider } from 'react-redux';
import logger from 'redux-logger';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import reducer from './reducers';

const reduxPersist = {
  key: 'root',
  storage: AsyncStorage,
  version: 1,
  whitelist: ['app'],
  blacklist: ['nav'],
};

const middleware = [
  ...getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
];
if (process.env.NODE_ENV !== 'production') {
  middleware.push(logger);
}

const persistedReducer = persistReducer(reduxPersist, reducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware,
  devTools: process.env.NODE_ENV !== 'production',
});

const persistor = persistStore(store);

export const withReduxProvider = (C) => (props) => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <C {...props} />
    </PersistGate>
  </Provider>
);
