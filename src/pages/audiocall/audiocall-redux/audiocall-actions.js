import {
  TOGGLE_PLAY_GAME,
  ASK_QUESTION,
  SET_STATISTIC_GAME,
  SET_QUESTIONS_GAME,
  SET_GAME_NUMBER,
} from './audiocall-types';

export function togglePlay() {
  return {
    type: TOGGLE_PLAY_GAME,
  };
}

export function setQuestions(questions = []) {
  return {
    type: SET_QUESTIONS_GAME,
    questions,
  };
}

export function askQuestion(questionInfo = {}) {
  return {
    type: ASK_QUESTION,
    questionInfo,
  };
}

export function setStatistic(statistic) {
  return {
    type: SET_STATISTIC_GAME,
    statistic,
  };
}

export function setGameNumber() {
  return {
    type: SET_GAME_NUMBER,
  };
}
