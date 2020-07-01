import { combineReducers } from 'redux';
import { SHOW_GAME_SCREEN, SHOW_STATISTICS_SCREEN } from './sprint-types';

function screenReducer(state = 'start-screen', action) {
  if (action.type === SHOW_GAME_SCREEN) {
    return 'game-screen';
  }
  if (action.type === SHOW_STATISTICS_SCREEN) {
    return 'statistics-screen';
  }
  return state;
}

export const sprintReducer = combineReducers({
  screen: screenReducer,
});
