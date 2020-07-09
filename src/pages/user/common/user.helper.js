import { learnWordsAPIService } from "../../../services/learnWordsAPIService";

export const settings = async () => {
    const settings = await learnWordsAPIService.getUserSettings(localStorage.getItem('userId'), localStorage.getItem('token'));
    console.log(settings);
    localStorage.setItem('wordsPerDay', settings.wordsPerDay);
    localStorage.setItem('userCardsCount', settings.optional.userCardsCount);
    localStorage.setItem('userSetExample', settings.optional.userSetExample);
    localStorage.setItem('userSetExplanation', settings.optional.userSetExplanation);
    localStorage.setItem('userSetImage', settings.optional.userSetImage);
    localStorage.setItem('userSetTranscription', settings.optional.userSetTranscription);
    localStorage.setItem('userSetTranslate', settings.optional.userSetTranslate);
}