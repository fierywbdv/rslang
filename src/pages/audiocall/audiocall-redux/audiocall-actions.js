import {
  TOGGLE_PLAY_GAME, ANSWER_GAME, ASK_QUESTION, SET_STATISTIC_GAME, SET_QUESTIONS_GAME,
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
export function answerPlay(statistic) {
  return {
    type: ANSWER_GAME,
    statistic,
  };
}
