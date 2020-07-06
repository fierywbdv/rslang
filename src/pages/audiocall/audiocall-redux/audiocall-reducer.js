import { combineReducers } from 'redux';
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

function togglePlayAudioCallReducer(state = false, action) {
  if (action.type === TOGGLE_PLAY_AUDIO_CALL) {
    return !state;
  }
  return state;
}

function setKindOfGameAudioCallReducer(state = 'withUserWords', action) {
  if (action.type === SET_KIND_OF_GAME_AUDIO_CALL) {
    return action.payload;
  }
  return state;
}

function setRoundAndLevelAudioCallReducer(state = {
  flag: true,
  level: 1,
  roundGame: 1,
},
action) {
  if (action.type === SET_ROUND_AND_LEVEL_GAME_AUDIO_CALL) {
    return {
      flag: action.payload.level !== undefined ? action.payload.level : !state.flag,
      level: action.payload.level,
      roundGame: action.payload.roundGame,
    };
  }
  return state;
}

function setGameNumberAudioCallReducer(state = 0, action) {
  if (action.type === SET_GAME_NUMBER_AUDIO_CALL) {
    return action.payload !== undefined ? action.payload : state + 1;
  }
  return state;
}
function setRandomGameNumberAudioCallReducer(state = 0, action) {
  if (action.type === SET_RANDOM_GAME_NUMBER_AUDIO_CALL) {
    return action.payload !== undefined ? action.payload : state + 1;
  }
  return state;
}

function setQuestionNumberAudioCallReducer(state = 0, action) {
  if (action.type === SET_QUESTION_NUMBER_AUDIO_CALL) {
    return action.payload !== undefined ? action.payload : state + 1;
  }
  return state;
}

function setQuestionsAudioCallReducer(state = [], action) {
  if (action.type === SET_QUESTIONS_AUDIO_CALL) {
    return [...action.questions];
  }
  return state;
}

function setStatisticAudioCallReducer(state = { mistake: [], correct: [] }, action) {
  if (action.type === SET_STATISTIC_AUDIO_CALL) {
    const {
      wordQues, mistake, game, quesNum, kind,
    } = action.statistic;
    console.log('wordQues, mistake, game, quesNum, kind', wordQues, mistake, game, quesNum, kind);
    if (mistake) {
      return {
        ...state,
        mistake: [...state.mistake, {
          ...wordQues, gameNum: game, ques: quesNum, kind,
        }],
      };
    }
    return {
      ...state,
      correct: [...state.correct, {
        ...wordQues, gameNum: game, ques: quesNum, kind,
      }],
    };
  }
  return state;
}

export const audioCallReducer = combineReducers({
  togglePlay: togglePlayAudioCallReducer,
  kind: setKindOfGameAudioCallReducer,
  roundAndLevel: setRoundAndLevelAudioCallReducer,
  gameNumber: setGameNumberAudioCallReducer,
  randomGameNumber: setRandomGameNumberAudioCallReducer,
  questionNumber: setQuestionNumberAudioCallReducer,
  questionsGame: setQuestionsAudioCallReducer,
  stat: setStatisticAudioCallReducer,
});
