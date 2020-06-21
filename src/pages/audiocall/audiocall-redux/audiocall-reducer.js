import { combineReducers } from 'redux';
import {
  TOGGLE_PLAY_GAME, ASK_QUESTION, ANSWER_GAME, SET_STATISTIC_GAME, SET_QUESTIONS_GAME,
} from './audiocall-types';

function togglePlayReducer(state = false, action) {
  if (action.type === TOGGLE_PLAY_GAME) {
    return !state;
  }
  return state;
}

function askQuestionReducer(state = {}, action) {
  if (action.type === ASK_QUESTION) {
    return {
      ...action.questionInfo,
    };
  }
  return state;
}

function setQuestionsReducer(state = [], action) {
  if (action.type === SET_QUESTIONS_GAME) {
    return [...action.questions];
  }
  return state;
}

function setStatisticReducer(state = {}, action) {
  if (action.type === SET_STATISTIC_GAME) {
    return [action.statistic];
  }
  return state;
}

function answerReducer(state = {}, action) {
  if (action.type === ANSWER_GAME) {
    return { ...action.statistic };
  }
  return state;
}

export const audioCallReducer = combineReducers({
  togglePlay: togglePlayReducer,
  askInfo: askQuestionReducer,
  setQuestionsGame: setQuestionsReducer,
  setStatistic: setStatisticReducer,
  answer: answerReducer,
});
