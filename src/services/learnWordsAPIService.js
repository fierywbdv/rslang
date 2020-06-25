import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';

export class LearnWordsAPIService {
  static errorHandler(error) {
    Toastify({
      text: error.message,
      backgroundColor: 'linear-gradient(to right, #CD5C5C, #F08080)',
      className: 'info',
      position: 'right',
      gravity: 'top',
    }).showToast();

    console.error(error);
  }

  static async getWordsByPageAndGroup(page, group) {
    try {
      const response = await fetch(`https://afternoon-falls-25894.herokuapp.com/words?page=${page}&group=${group}`);

      if (response.status !== 200) {
        throw new Error('Failed to get the word set!');
      }

      const words = await response.json();

      return words;
    } catch (error) {
      this.errorHandler(error);
    }
  }

  static async getWordById(id) {
    try {
      const response = await fetch(`https://afternoon-falls-25894.herokuapp.com/words/${id}`);

      if (response.status !== 200) {
        throw new Error('Failed to get the word!');
      }

      const word = await response.json();

      return word;
    } catch (error) {
      this.errorHandler(error);
    }
  }

  static async createUser(email, password) {
    try {
      const response = await fetch('https://afternoon-falls-25894.herokuapp.com/users', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: `${email}`,
          password: `${password}`,
        }),
      });

      if (response.status === 417) {
        throw new Error('User with this e-mail exists!');
      } else if (response.status === 422) {
        throw new Error('Incorrect e-mail or password!');
      } else if (response.status !== 200) {
        throw new Error('Some ERROR!');
      }

      const userInfo = await response.json();

      return userInfo;
    } catch (error) {
      this.errorHandler(error);
    }
  }

  static async getUser(id, token) {
    try {
      const response = await fetch(`https://afternoon-falls-25894.herokuapp.com/users/${id}`, { headers: { Authorization: `Bearer ${token}` } });

      if (response.status === 401) {
        throw new Error('Access token is missing or invalid!');
      } else if (response.status === 404) {
        throw new Error('User not found!');
      } else if (response.status !== 200) {
        throw new Error('Some ERROR!');
      }

      const user = await response.json();

      return user;
    } catch (error) {
      this.errorHandler(error);
    }
  }

  static async updateUser(id, token, email, password) {
    try {
      const response = await fetch(`https://afternoon-falls-25894.herokuapp.com/users/${id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: `${email}`,
          password: `${password}`,
        }),
      });

      if (response.status === 401) {
        throw new Error('Access token is missing or invalid!');
      } else if (response.status !== 200) {
        throw new Error('Some ERROR!');
      }

      const user = await response.json();

      return user;
    } catch (error) {
      this.errorHandler(error);
    }
  }

  static async deleteUser(id, token) {
    try {
      const response = await fetch(`https://afternoon-falls-25894.herokuapp.com/users/${id}`, {
        method: 'DELETE',
        headers: {
          Accept: '*/*',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 401) {
        throw new Error('Access token is missing or invalid!');
      } else if (response.status !== 204) {
        throw new Error('Some ERROR!');
      }
    } catch (error) {
      this.errorHandler(error);
    }
  }

  static async getAllUserWords(id, token) {
    try {
      const response = await fetch(`https://afternoon-falls-25894.herokuapp.com/users/${id}/words`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      });

      if (response.status === 401) {
        throw new Error('Access token is missing or invalid!');
      } else if (response.status !== 200) {
        throw new Error('Some ERROR!');
      }

      const allUserWords = await response.json();

      return allUserWords;
    } catch (error) {
      this.errorHandler(error);
    }
  }

  static async getUserWordById(userId, wordId, token) {
    try {
      const response = await fetch(`https://afternoon-falls-25894.herokuapp.com/users/${userId}/words/${wordId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      });

      if (response.status === 401) {
        throw new Error('Access token is missing or invalid!');
      } else if (response.status === 404) {
        throw new Error('User word not found!');
      } else if (response.status !== 200) {
        throw new Error('Some ERROR!');
      }

      const userWord = await response.json();

      return userWord;
    } catch (error) {
      this.errorHandler(error);
    }
  }

  static async updateUserWord(userId, wordId, token, wordDifficulty, optionalObject) {
    try {
      const response = await fetch(`https://afternoon-falls-25894.herokuapp.com/users/${userId}/words/${wordId}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          difficulty: wordDifficulty,
          optional: optionalObject,
        }),
      });

      if (response.status === 401) {
        throw new Error('Access token is missing or invalid!');
      } else if (response.status !== 200) {
        throw new Error('Some ERROR!');
      }

      const updateWord = await response.json();

      return updateWord;
    } catch (error) {
      this.errorHandler(error);
    }
  }

  static async createUserWord(userId, wordId, token, wordDifficulty, optional) {
    try {
      const response = await fetch(`https://afternoon-falls-25894.herokuapp.com/users/${userId}/words/${wordId}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          difficulty: wordDifficulty,
          optional,
        }),
      });

      if (response.status === 401) {
        throw new Error('Access token is missing or invalid!');
      } else if (response.status !== 200) {
        throw new Error('Some ERROR!');
      }

      const addWord = await response.json();

      return addWord;
    } catch (error) {
      this.errorHandler(error);
    }
  }

  static async deleteUserWord(userId, wordId, token) {
    try {
      const response = await fetch(`https://afternoon-falls-25894.herokuapp.com/users/${userId}/words/${wordId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: '*/*',
        },
      });

      if (response.status === 401) {
        throw new Error('Access token is missing or invalid!');
      } else if (response.status !== 204) {
        throw new Error('Some ERROR!');
      }
    } catch (error) {
      this.errorHandler(error);
    }
  }

  static async getUserSettings(id, token) {
    try {
      const response = await fetch(`https://afternoon-falls-25894.herokuapp.com/users/${id}/settings`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      });

      if (response.status === 401) {
        throw new Error('Access token is missing or invalid!');
      } else if (response.status === 404) {
        throw new Error('Settings not found!');
      } else if (response.status !== 200) {
        throw new Error('Some ERROR!');
      }

      const userSettings = await response.json();

      return userSettings;
    } catch (error) {
      this.errorHandler(error);
    }
  }

  static async setUserSettings(id, token, wordsPerDay, optional) {
    try {
      const response = await fetch(`https://afternoon-falls-25894.herokuapp.com/users/${id}/settings`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          wordsPerDay,
          optional,
        }),
      });

      if (response.status === 401) {
        throw new Error('Access token is missing or invalid!');
      } else if (response.status !== 200) {
        throw new Error('Some ERROR!');
      }
    } catch (error) {
      this.errorHandler(error);
    }
  }

  static async getUserStatistic(id, token) {
    try {
      const response = await fetch(`https://afternoon-falls-25894.herokuapp.com/users/${id}/statistics`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      });

      if (response.status === 401) {
        throw new Error('Access token is missing or invalid!');
      } else if (response.status === 404) {
        throw new Error('Statistics not found!');
      } else if (response.status !== 200) {
        throw new Error('Some ERROR!');
      }

      const userStatistic = await response.json();

      return userStatistic;
    } catch (error) {
      this.errorHandler(error);
    }
  }

  static async setUserStatistic(id, token, learnedWords, optional) {
    try {
      const response = await fetch(`https://afternoon-falls-25894.herokuapp.com/users/${id}/statistics`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          learnedWords,
          optional,
        }),
      });

      if (response.status === 401) {
        throw new Error('Access token is missing or invalid!');
      } else if (response.status !== 200) {
        throw new Error('Some ERROR!');
      }
    } catch (error) {
      this.errorHandler(error);
    }
  }

  static async signIn(email, password) {
    try {
      const response = await fetch('https://afternoon-falls-25894.herokuapp.com/signin', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: `${email}`,
          password: `${password}`,
        }),
      });

      if (response.status === 403) {
        throw new Error('Incorrect e-mail or password!');
      } else if (response.status !== 200) {
        throw new Error('Some ERROR!');
      }

      const user = await response.json();

      return user;
    } catch (error) {
      this.errorHandler(error);
    }
  }
}
