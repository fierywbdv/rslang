import { combineReducers } from 'redux';
import { sprintReducer } from '../pages/sprint/sprint-redux/sprint-reducer';

export const rootReducer = combineReducers({
  sprintReducer,
});
