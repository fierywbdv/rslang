import { combineReducers } from 'redux';
import {
  TOGGLE_PLAY_GAME,
  ASK_QUESTION,
  ANSWER_GAME,
  SET_STATISTIC_GAME,
  SET_QUESTIONS_GAME,
  SET_GAME_NUMBER,
} from './audiocall-types';

function togglePlayReducer(state = false, action) {
  if (action.type === TOGGLE_PLAY_GAME) {
    return !state;
  }
  return state;
}
function setGameNumberReducer(state = 0, action) {
  if (action.type === SET_GAME_NUMBER) {
    return state + 1;
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

function setStatisticReducer(state = { mistake: [], correct: [] }, action) {
  if (action.type === SET_STATISTIC_GAME) {
    const {
      wordQues, mistake, game, quesNum,
    } = action.statistic;
    if (mistake) {
      return {
        ...state,
        mistake: [...state.mistake, { ...wordQues, gameNum: game, ques: quesNum }],
      };
    }
    return {
      ...state,
      correct: [...state.correct, { ...wordQues, gameNum: game, ques: quesNum }],
    };
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
  stat: setStatisticReducer,
  answer: answerReducer,
  gameNumber: setGameNumberReducer,
});
