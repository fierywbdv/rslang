import {
  TOGGLE_PLAY_OURGAME,
  SET_QUESTIONS_OURGAME,
  SET_GAME_NUMBER_OURGAME,
  SET_QUESTION_NUMBER_OURGAME,
  SET_STATISTIC_OURGAME,
  SET_LISTEN_ANSWER_OURGAME,
  SET_KIND_OF_OURGAME,
  SET_RANDOM_GAME_NUMBER_OURGAME,
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
export function setRandomGameNumber() {
  return {
    type: SET_RANDOM_GAME_NUMBER_OURGAME,
  };
}
export function setQuestionNumber(payload) {
  return {
    type: SET_QUESTION_NUMBER_OURGAME,
    payload,
  };
}

export function setStatistic(statistic) {
  return {
    type: SET_STATISTIC_OURGAME,
    statistic,
  };
}

export function setListenAnswer(settings) {
  return {
    type: SET_LISTEN_ANSWER_OURGAME,
    settings,
  };
}

export function setKindOfGame(payload) {
  return {
    type: SET_KIND_OF_OURGAME,
    payload,
  };
}
