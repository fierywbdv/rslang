import { combineReducers } from 'redux';
import { sprintReducer } from '../pages/sprint/sprint-redux/sprint-reducer';
import { audioCallReducer } from "../pages/audiocall/audiocall-redux/audiocall-reducer";

export const rootReducer = combineReducers({
  sprintReducer,
  audioCallReducer
});
