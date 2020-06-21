import {
  TOGGLE_PLAY_GAME, SET_DATA_GAME, NEW_QUESTION_GAME, SET_QUESTIONS_GAME, SET_STATISTIC_GAME,
} from './audiocall-types';

export function togglePlay() {
  return {
    type: TOGGLE_PLAY_GAME,
  };
}

export function setQuestionsPlay(questions = []) {
  return {
    type: SET_QUESTIONS_GAME,
    questions,
  };
}
export function setDataPlay(data = []) {
  return {
    type: SET_DATA_GAME,
    data,
  };
}
export function questionPlay() {
  return {
    type: NEW_QUESTION_GAME,
  };
}
export function setStatisticPlay(statistic) {
  return {
    type: SET_STATISTIC_GAME,
    statistic,
  };
}
