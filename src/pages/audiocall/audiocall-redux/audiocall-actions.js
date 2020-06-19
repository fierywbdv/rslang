import { TOGGLE_PLAY_GAME, GET_DATA_GAME } from './audiocall-types';

export function togglePlay() {
  return {
    type: TOGGLE_PLAY_GAME,
  };
}

export function getDataPlay() {
  return {
    type: GET_DATA_GAME,
  };
}

