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

function setStatisticReducer(state = [], action) {
  if (action.type === SET_STATISTIC_GAME) {
    if (state.some((item) => item.id === action.statistic.id)) {
      const stat = {};
      const newState = [];
      state.forEach((item, i) => {
        if (item.id === action.statistic.id) {
          stat.type = item.type;
          stat.id = item.id;
          stat.mistakes = action.statistic.error ? item.mistakes += 1 : item.mistakes += 0;
          stat.correct = !action.statistic.error ? item.correct += 1 : item.correct += 0;
          newState.push(...state.splice(0, i));
          newState.push(...state.splice(i, state.length));
        }
      });
      return [...newState, stat];
    }
    const stat = {
      type: action.statistic.type,
      id: action.statistic.id,
      mistakes: action.statistic.error ? 1 : 0,
      correct: !action.statistic.error ? 1 : 0,
    };
    return [...state, stat];
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
});
