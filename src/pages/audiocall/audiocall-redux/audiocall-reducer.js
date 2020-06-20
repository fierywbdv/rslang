import { combineReducers } from 'redux';
import {
  TOGGLE_PLAY_GAME, GET_DATA_GAME, SET_DATA_GAME, NEW_QUESTION_GAME, SET_QUESTIONS_GAME, SET_STATISTIC_GAME,
} from './audiocall-types';

function togglePlayGameReducer(state = false, action) {
  if (action.type === TOGGLE_PLAY_GAME) {
    return !state;
  }

  return state;
}

function getDataPlayGameReducer(state = {}, action) {
  if (action.type === GET_DATA_GAME) {
    return state;
  }
  return state;
}
function questionPlayGameReducer(state = 0, action) {
  if (action.type === NEW_QUESTION_GAME) {
    return state + 1;
  }
  return state;
}

function setDataPlayGameReducer(state = [], action) {
  if (action.type === SET_DATA_GAME) {
    return [...action.data];
  }
  return state;
}
function setQuestionsPlayGameReducer(state = [], action) {
  if (action.type === SET_QUESTIONS_GAME) {
    return [...action.questions];
  }
  return state;
}
function setStatisticPlayGameReducer(state = {}, action) {
  if (action.type === SET_STATISTIC_GAME) {
    return [action.statistic];
  }
  return state;
}

export const audioCallReducer = combineReducers({
  togglePlayGame: togglePlayGameReducer,
  dataPlayGame: getDataPlayGameReducer,
  setDataPlayGame: setDataPlayGameReducer,
  questionGame: questionPlayGameReducer,
  question: setQuestionsPlayGameReducer,
  stats: setStatisticPlayGameReducer,
});
