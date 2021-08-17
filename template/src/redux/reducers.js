import { combineReducers } from '@reduxjs/toolkit';
import { reducer as appReducer } from './AppRedux';
import { reducer as authReducer } from './AuthRedux';
import { reducer as navReducer } from './NavRedux';

const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
  nav: navReducer,
});

export default rootReducer;
