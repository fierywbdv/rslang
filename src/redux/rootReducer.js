import { combineReducers } from 'redux';
import { audioCallReducer } from '../pages/audiocall/audiocall-redux/audiocall-reducer';
import { ourGameReducer } from '../pages/ourgame/ourgame-redux/ourgame-reducer';
import { sprintReducer } from '../pages/sprint/sprint-redux/sprint-reducer';

export const rootReducer = combineReducers({
  audioCallReducer,
  ourGameReducer,
  sprintReducer,
});
