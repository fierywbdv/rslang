import {
  TOGGLE_PLAY_AUDIO_CALL,
  SET_KIND_OF_GAME_AUDIO_CALL,
  SET_ROUND_AND_LEVEL_GAME_AUDIO_CALL,
  SET_GAME_NUMBER_AUDIO_CALL,
  SET_RANDOM_GAME_NUMBER_AUDIO_CALL,
  SET_QUESTION_NUMBER_AUDIO_CALL,
  SET_QUESTIONS_AUDIO_CALL,
  SET_STATISTIC_AUDIO_CALL,
} from './audiocall-types';

export function togglePlayAudioCall() {
  return {
    type: TOGGLE_PLAY_AUDIO_CALL,
  };
}

export function setKindOfGameAudioCall(payload) {
  return {
    type: SET_KIND_OF_GAME_AUDIO_CALL,
    payload,
  };
}

export function setRoundAndLevelAudioCall(payload) {
  return {
    type: SET_ROUND_AND_LEVEL_GAME_AUDIO_CALL,
    payload,
  };
}

export function setGameNumberAudioCall(payload) {
  return {
    type: SET_GAME_NUMBER_AUDIO_CALL,
    payload,
  };
}
export function setRandomGameNumberAudioCall(payload) {
  return {
    type: SET_RANDOM_GAME_NUMBER_AUDIO_CALL,
    payload,
  };
}

export function setQuestionNumberAudioCall(payload) {
  return {
    type: SET_QUESTION_NUMBER_AUDIO_CALL,
    payload,
  };
}

export function setQuestionsAudioCall(questions = []) {
  return {
    type: SET_QUESTIONS_AUDIO_CALL,
    questions,
  };
}

export function setStatistic(statistic) {
  return {
    type: SET_STATISTIC_AUDIO_CALL,
    statistic,
  };
}