import { learnWordsAPIService } from '../../../services/learnWordsAPIService';

export const settings = async () => {
  const userSettings = await learnWordsAPIService.getUserSettings(localStorage.getItem('userId'), localStorage.getItem('token'));
  console.log(userSettings)
  localStorage.setItem('wordsPerDay', userSettings.wordsPerDay);
  localStorage.setItem('userCardsCount', userSettings.optional.userCardsCount);
  localStorage.setItem('userLevel', userSettings.optional.userLevel);
  localStorage.setItem('userSetExample', userSettings.optional.userSetExample);
  localStorage.setItem('userSetExplanation', userSettings.optional.userSetExplanation);
  localStorage.setItem('userSetImage', userSettings.optional.userSetImage);
  localStorage.setItem('userSetTranscription', userSettings.optional.userSetTranscription);
  localStorage.setItem('userSetTranslate', userSettings.optional.userSetTranslate);
};
