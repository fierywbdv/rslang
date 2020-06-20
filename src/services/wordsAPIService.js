export class WordsAPIService {
    static async getWords(page, group) {
      const response = await fetch(`https://afternoon-falls-25894.herokuapp.com/words?page=${page}&group=${group}`);
      const words = await response.json();
  
      return words;
    }
  }
