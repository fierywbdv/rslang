import { combineReducers } from 'redux';
import { TOGGLE_PLAY_GAME, GET_DATA_GAME } from './audiocall-types';
import { WordsAPIService } from '../common/wordsAPIService';

function togglePlayGameReducer(state = false, action) {
  if (action.type === TOGGLE_PLAY_GAME) {
    return !state;
  }

  return state;
}

function getDataPlayGameReducer(state = false, action) {
  if (action.type === GET_DATA_GAME) {
    return { ...state };
  }
  return state;
}

async function asuncData() {
  return function (dispatch) {
    const data = await WordsAPIService.getWords(1, 2);
    dispatch()
  }

}

export const audioCallReducer = combineReducers({
  togglePlayGame: togglePlayGameReducer,
  dataPlayGame: getDataPlayGameReducer,
});
