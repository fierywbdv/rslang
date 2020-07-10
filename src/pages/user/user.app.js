import { renderUserScreen } from './components/user.card';
import {
  getUserWordsCount,
  getUserLevel,
  getUserCardsCount,
  saveSettingsHandler,
  deleteProfileHandler,
  clearRoot,
} from './common/user.utils';
import './scss/user.styles.scss';
import { settings } from './common/user.helper';

settings();

class UserPage {
  constructor() {
    this.renderUserScreen = renderUserScreen;
    this.getUserWordsCount = getUserWordsCount;
    this.getUserLevel = getUserLevel;
    this.getUserCardsCount = getUserCardsCount;
    this.saveSettingsHandler = saveSettingsHandler;
    this.deleteProfileHandler = deleteProfileHandler;
    this.clearRoot = clearRoot;
  }

  init() {
    this.clearRoot();
    this.renderUserScreen();
    this.getUserWordsCount();
    this.getUserLevel();
    this.getUserCardsCount();
    this.saveSettingsHandler();
    this.deleteProfileHandler();
  }
}

export default new UserPage();
