export class LearnWordsAPIService {
  static async getWordsByPageAndGroup(page, group) {
    const response = await fetch(`https://afternoon-falls-25894.herokuapp.com/words?page=${page}&group=${group}`);
    const words = await response.json();

    return words;
  }

  static async getWordById(id) {
    const response = await fetch(`https://afternoon-falls-25894.herokuapp.com/words/${id}`);
    const word = await response.json();

    return word;
  }

  static async createUser(email, password) {
    const response = await fetch(`https://afternoon-falls-25894.herokuapp.com/users`, {
      method: "POST",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "email": `${email}`,
        "password": `${password}`
      })
      })
    const userInfo = await response.json();

    return userInfo;
  }

  static async getUser(id, token) {
    const response = await fetch(`https://afternoon-falls-25894.herokuapp.com/users/${id}`, {headers: {Authorization: `Bearer ${token}`}})
    const user = await response.json();

    return user;
  }

  static async updateUser(id, token, email, password) {
    const response = await fetch(`https://afternoon-falls-25894.herokuapp.com/users/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "email": `${email}`,
        "password": `${password}`
      })
    })
    const user = await response.json();

    return user;
  }

  static async deleteUser(id, token) {
    const response = await fetch(`https://afternoon-falls-25894.herokuapp.com/users/${id}`, {
      method: "DELETE",
      headers: {
        Accept: '*/*',
        Authorization: `Bearer ${token}`
      }
    })
    const user = await response.json();

    return user;
  }

  static async getAllUserWords(id, token) {
    const response = await fetch(`https://afternoon-falls-25894.herokuapp.com/users/${id}/words`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json'
      },
    })
    const allUserWords = await response.json();

    return allUserWords;
  }

  static async getUserWordById(userId, wordId, token) {
    const response = await fetch(`https://afternoon-falls-25894.herokuapp.com/users/${userId}/words/${wordId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json'
      }
    })
    const userWord = await response.json();

    return userWord;
  }

  static async updateUserWord(userId, wordId, token, wordDifficulty, optionalObject) {
    const response = await fetch(`https://afternoon-falls-25894.herokuapp.com/users/${userId}/words/${wordId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "difficulty": wordDifficulty,
        "optional": optionalObject
      })
    })
    const updateWord = await response.json();
    
    return updateWord;
  }

  static async createUserWord(userId, wordId, token, wordDifficulty, optional) {
    const response = await fetch(`https://afternoon-falls-25894.herokuapp.com/users/${userId}/words/${wordId}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "difficulty": wordDifficulty,
        "optional": optional
      })
    })
    const addWord = await response.json();
    
    return addWord;
  }

  static async deleteUserWord(userId, wordId, token){
    const response = await fetch(`https://afternoon-falls-25894.herokuapp.com/users/${userId}/words/${wordId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: '*/*'
      },
    })
  }

  static async getUserSettings(id, token) {
    const response = await fetch(`https://afternoon-falls-25894.herokuapp.com/users/${id}/settings`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json'
      }
    })
    const userSettings = await response.json();

    return userSettings;
  }

  static async setUserSettings(id, token, wordsPerDay, optional) {
    const response = await fetch(`https://afternoon-falls-25894.herokuapp.com/users/${id}/settings`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "wordsPerDay": wordsPerDay,
        "optional": optional
      })
    })
  }

  static async getUserStatistic(id, token) {
    const response = await fetch(`https://afternoon-falls-25894.herokuapp.com/users/${id}/statistics`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json'
      }
    })
    const userStatistic = await response.json();

    return userStatistic;
  }

  static async setUserStatistic(id, token, learnedWords, optional){
    const response = await fetch(`https://afternoon-falls-25894.herokuapp.com/users/${id}/statistics`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "learnedWords": learnedWords,
        "optional": optional
      })
    })
  }

  static async signIn(email, password) {
    const response = await fetch(`https://afternoon-falls-25894.herokuapp.com/signin`, {
      method: "POST",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "email": `${email}`,
        "password": `${password}`
      })
    })
    const user = await response.json();

    return user;
  }

}
