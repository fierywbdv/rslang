import { combineReducers } from 'redux';
import { audioCallReducer } from "../pages/audiocall/audiocall-redux/audiocall-reducer";

export const rootReducer = combineReducers({
  audioCallReducer,
});
