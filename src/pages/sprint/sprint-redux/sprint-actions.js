import { SHOW_GAME_SCREEN, SHOW_STATISTICS_SCREEN } from './sprint-types';

export function showGameScreen() {
  return {
    type: SHOW_GAME_SCREEN,
  };
}

export function showStatisticsScreen() {
  return {
    type: SHOW_STATISTICS_SCREEN,
  };
}
