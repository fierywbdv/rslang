import { learnWordsAPIService } from '../../../services/learnWordsAPIService';

export const settings = async () => {
  const userSettings = await learnWordsAPIService.getUserSettings(localStorage.getItem('userId'), localStorage.getItem('token'));
  localStorage.setItem('wordsPerDay', userSettings.wordsPerDay);
  localStorage.setItem('userCardsCount', userSettings.optional.userCardsCount);
  localStorage.setItem('userSetExample', userSettings.optional.userSetExample);
  localStorage.setItem('userSetExplanation', userSettings.optional.userSetExplanation);
  localStorage.setItem('userSetImage', userSettings.optional.userSetImage);
  localStorage.setItem('userSetTranscription', userSettings.optional.userSetTranscription);
  localStorage.setItem('userSetTranslate', userSettings.optional.userSetTranslate);
  localStorage.setItem('userLangLevel', 0);
};
