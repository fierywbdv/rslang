import { combineReducers } from 'redux';
import { audioCallReducer } from '../pages/audiocall/audiocall-redux/audiocall-reducer';
import { ourGameReducer } from '../pages/ourgame/ourgame-redux/ourgame-reducer';

export const rootReducer = combineReducers({
  audioCallReducer,
  ourGameReducer,
});
