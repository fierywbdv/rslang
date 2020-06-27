import {
  TOGGLE_PLAY_OURGAME,
  SET_QUESTIONS_OURGAME,
  SET_GAME_NUMBER_OURGAME,
  SET_QUESTION_NUMBER_OURGAME,
  SET_STATISTIC_OURGAME,
} from './ourgame-types';

export function togglePlay() {
  return {
    type: TOGGLE_PLAY_OURGAME,
  };
}

export function setQuestions(questions = []) {
  return {
    type: SET_QUESTIONS_OURGAME,
    questions,
  };
}

export function setGameNumber() {
  return {
    type: SET_GAME_NUMBER_OURGAME,
  };
}
export function setQuestionNumber() {
  return {
    type: SET_QUESTION_NUMBER_OURGAME,
  };
}

export function setStatistic(statistic) {
  return {
    type: SET_STATISTIC_OURGAME,
    statistic,
  };
}
