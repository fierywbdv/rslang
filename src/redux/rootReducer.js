import { combineReducers } from 'redux';
import { sprintReducer } from '../pages/sprint/sprint-redux/sprint-reducer';
import { audioCallReducer } from "../pages/audiocall/audiocall-redux/audiocall-reducer";
import { promoReducer } from '../pages/promo/promo-redux/promo-reducer'

export const rootReducer = combineReducers({
  sprintReducer,
  audioCallReducer,
  promoReducer
});
