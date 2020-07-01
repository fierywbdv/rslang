import { combineReducers } from 'redux';
import {
  TOGGLE_PLAY_OURGAME,
  SET_QUESTIONS_OURGAME,
  SET_GAME_NUMBER_OURGAME,
  SET_QUESTION_NUMBER_OURGAME,
  SET_STATISTIC_OURGAME,
  SET_LISTEN_ANSWER_OURGAME,
} from './ourgame-types';

function togglePlayReducer(state = false, action) {
  if (action.type === TOGGLE_PLAY_OURGAME) {
    return !state;
  }
  return state;
}

function setListenAnswerReducer(state = { isListen: true, nextQuestion: true, answered: false }, action) {
  if (action.type === SET_LISTEN_ANSWER_OURGAME) {
    return { ...action.settings };
  }
  return state;
}

function setQuestionsReducer(state = [], action) {
  if (action.type === SET_QUESTIONS_OURGAME) {
    return [...action.questions];
  }
  return state;
}

function setGameNumberReducer(state = 0, action) {
  if (action.type === SET_GAME_NUMBER_OURGAME) {
    return state + 1;
  }
  return state;
}

function setQuestionNumberReducer(state = 0, action) {
  if (action.type === SET_QUESTION_NUMBER_OURGAME) {
    return (state === 19) ? 0 : state + 1;
  }
  return state;
}

function setStatisticReducer(state = { mistake: [], correct: [] }, action) {
  if (action.type === SET_STATISTIC_OURGAME) {
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

export const ourGameReducer = combineReducers({
  togglePlay: togglePlayReducer,
  setQuestionsGame: setQuestionsReducer,
  setGameNum: setGameNumberReducer,
  setQuestionNum: setQuestionNumberReducer,
  setStatistic: setStatisticReducer,
  isListenAnswer: setListenAnswerReducer,
});
