import { renderUserScreen } from './components/user.card';
import {
  getUserWordsCount,
  getUserCardsCount,
  saveSettingsHandler,
  deleteProfileHandler,
  clearRoot,
  setSidebarHeight,
} from './common/user.utils';
import './scss/user.styles.scss';

class UserPage {
  constructor() {
    this.renderUserScreen = renderUserScreen;
    this.getUserWordsCount = getUserWordsCount;
    this.getUserCardsCount = getUserCardsCount;
    this.saveSettingsHandler = saveSettingsHandler;
    this.deleteProfileHandler = deleteProfileHandler;
    this.clearRoot = clearRoot;
    this.setSidebarHeight = setSidebarHeight;
  }

  init() {
    this.clearRoot();
    this.renderUserScreen();
    this.getUserWordsCount();
    this.getUserCardsCount();
    this.saveSettingsHandler();
    this.deleteProfileHandler();
  }
}

export default new UserPage();
