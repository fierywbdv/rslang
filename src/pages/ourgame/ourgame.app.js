import './scss/ourgame.styles.scss';
import Toastify from 'toastify-js';
import { store } from '../../redux/store';
import { learnWordsAPIService } from '../../services/learnWordsAPIService';
import {
  setGameNumber,
  setQuestions,
  togglePlay,
  setQuestionNumber,
  setStatistic,
  setListenAnswer,
  setKindOfGame,
  setRandomGameNumber,
  setRoundAndLevel,
} from './ourgame-redux/ourgame-actions';
import helper from './common/ourgame.helper';
import gameScreenComponent from './components/game-screen';
import startScreenOurGameComponent from './components/start-screen';
import statisticScreenComponent from './components/statistic-screen';
import { COUNT_WORDS_PER_GAMES } from './common/ourgame.constants';

class Ourgame {
  constructor() {
    this.words = null;
    this.userWords = [];
    this.timeOut = null;
    this.page = null;
    this.group = null;
    this.isLast = false;
    this.isFirstGame = null;
    this.removeWord = null;
    this.questionsGame = null;
    this.info = null;
    this.correct = new Audio('./assets/audio/correct.mp3');
    this.mistake = new Audio('./assets/audio/error.mp3');
    this.failure = new Audio('./assets/audio/failure.mp3');
    this.win = new Audio('./assets/audio/success.mp3');
    this.baseUrl = 'https://raw.githubusercontent.com/irinainina/rslang-data/master/';
  }

  startGame() {
    const startButton = document.getElementById('start-play');
    const root = document.getElementById('root');
    const level = document.getElementById('level');
    const group = document.getElementById('group');
    const customStart = document.getElementById('custom-start');
    const body = document.querySelector('body');
    body.className = 'our-game-body';
    root.className = 'our-game-root';
    helper.rangeSlider();

    if (startButton) {
      startButton.addEventListener('click', async () => {
        if (!startButton.classList.contains('disable')) {
          store.dispatch(setKindOfGame('withUserWords'));
          await this.setWords(this.group, this.page, 'withUserWords');
          store.dispatch(togglePlay());
        }
      });
    }

    if (customStart) {
      customStart.addEventListener('click', async () => {
        if (!customStart.classList.contains('disable')) {
          this.page = level.value;
          this.group = group.value;
          store.dispatch(setKindOfGame('withRandomWords'));
          await this.setWords(this.group, this.page, 'withRandomWords');
          store.dispatch(togglePlay());
          store.dispatch(setRoundAndLevel({ level: this.page, roundGame: this.group }));
        }
      });
    }
  }

  playGame() {
    helper.render('#root', gameScreenComponent(), 'append', '.screen');
    const questions = document.querySelectorAll('.inner-left .name');
    questions.forEach((item) => {
      item.addEventListener('click', (e) => {
        this.askQuestion(e.target);
      });
    });

    const state = store.getState();
    const { kind } = state.ourGameReducer;
    if (kind === 'withUserWords') {
      this.removeWordFromDictionary();
    } else {
      this.addWordToDictionary();
    }
    this.listenAnswer();
    this.setRestart();
  }

  listenAnswer() {
    const answers = document.querySelectorAll('.inner-right .name');
    answers.forEach((item) => {
      item.addEventListener('click', (e) => {
        const state = store.getState();
        const { isListenAnswer } = state.ourGameReducer;
        if (isListenAnswer.nextQuestion) {
          this.checkAnswerNew(e.target);
        }
      });
    });
  }

  askQuestion(elem) {
    const questions = document.querySelectorAll('.inner-left .name');
    const infoWord = document.getElementById('info-word');
    store.dispatch(setListenAnswer({ isListen: true, nextQuestion: true, answered: true }));
    questions.forEach((item) => {
      if (item.classList.contains('checked')) {
        item.classList.remove('checked');
      }
    });
    elem.classList.toggle('checked');
    const transcription = elem.getAttribute('data-transcription');
    const audio = elem.getAttribute('data-audio');
    infoWord.innerText = transcription;
    this.sayWord(audio);
  }

  checkAnswerNew(target) {
    const id = target.getAttribute('data-id');
    const currentQuestion = Ourgame.getCurrentQuestion();
    const audio = target.getAttribute('data-audio');
    const state = store.getState();
    const {
      setQuestionNum, setGameNum, setQuestionsGame, kind,
    } = state.ourGameReducer;
    window.clearTimeout(this.timeOut);
    if (id === currentQuestion.getAttribute('data-id')) {
      this.correctAnswer(
        currentQuestion,
        target,
        audio,
        setQuestionNum,
        setGameNum,
        setQuestionsGame,
        kind,
      );
    } else {
      this.mistakeAnswer(target, setGameNum, setQuestionsGame, currentQuestion);
    }
  }

  correctAnswer(currentQuestion,
    target,
    audio,
    setQuestionNum,
    setGameNum,
    setQuestionsGame,
    kind) {
    const infoWord = document.getElementById('info-word');
    store.dispatch(setListenAnswer({ isListen: true, nextQuestion: false, answered: true }));
    this.correct.play();
    currentQuestion.classList.add('hide');
    target.classList.add('hide');
    helper.setOpacity(setQuestionNum);
    infoWord.innerText = `${currentQuestion.innerText} = ${target.innerText}`;
    this.timeOut = setTimeout(() => {
      this.sayWord(audio);
    }, 100);
    this.setGameStatistic({
      game: setGameNum,
      quesNum: setQuestionsGame,
      mistake: false,
      wordQues: this.getQuestion(currentQuestion.getAttribute('data-id')),
    });
    store.dispatch(setQuestionNumber());
    if (this.isLastQuestion(setQuestionNum)) {
      helper.render('#root', statisticScreenComponent(kind), 'append', '.screen');
      store.dispatch(togglePlay());
      this.isFirstGame = false;
      this.isLast = false;
      this.setRestart();
      this.setRepeat();
      store.dispatch(setQuestionNumber(0));
    }
  }

  mistakeAnswer(target, setGameNum, setQuestionsGame, currentQuestion) {
    store.dispatch(setListenAnswer({ isListen: true, nextQuestion: true, answered: true }));
    this.mistake.play();
    target.classList.toggle('answered');
    this.setGameStatistic({
      game: setGameNum,
      quesNum: setQuestionsGame,
      mistake: true,
      wordQues: this.getQuestion(currentQuestion.getAttribute('data-id')),
    });
  }

  isLastQuestion(setQuestionNum) {
    const state = store.getState();
    const { kind, setQuestionsGame } = state.ourGameReducer;
    if (kind === 'withUserWords' && setQuestionsGame.length - 1 === setQuestionNum) {
      this.isLast = true;
      store.dispatch(setGameNumber());
    }

    if (kind === 'withRandomWords' && setQuestionsGame.length - 1 === setQuestionNum) {
      this.isLast = true;
      store.dispatch(setRandomGameNumber());
    }

    return this.isLast;
  }

  sayWord(audio) {
    const audioQuestion = new Audio(`${this.baseUrl}${audio}`);
    audioQuestion.play();
  }

  static getCurrentQuestion() {
    const questions = document.querySelectorAll('.inner-left .name');
    let currentQuestions = null;
    questions.forEach((elem) => {
      if (elem.classList.contains('checked')) {
        currentQuestions = elem;
      }
    });
    return currentQuestions;
  }

  stopGame() {
    helper.render('#root', startScreenOurGameComponent(), 'append', '.container');
    const state = store.getState();
    const { kind, roundAndLevel } = state.ourGameReducer;
    if (kind === 'withRandomWords') {
      helper.setRangeSlider(roundAndLevel);
    }

    this.startGame();
  }

  setGameStatistic(info = {}) {
    const state = store.getState();
    const { kind, setRandomGameNum, setGameNum } = state.ourGameReducer;
    this.info = {
      ...info,
      game: kind === 'withRandomWords' ? setRandomGameNum : setGameNum,
      kind,
    };
    store.dispatch(setStatistic(this.info));
  }

  getQuestion(id) {
    const state = store.getState();
    const { setQuestionsGame } = state.ourGameReducer;
    this.questionsGame = setQuestionsGame.filter((item) => item.id === id);
    return this.questionsGame[0];
  }

  async setWords(page, group, kind) {
    const state = store.getState();
    const { setGameNum, setRandomGameNum } = state.ourGameReducer;
    const startButton = document.getElementById('start-play');
    const customStart = document.getElementById('custom-start');
    customStart.classList.add('disable');
    startButton.classList.add('disable');
    if (kind === 'withRandomWords') {
      this.words = await learnWordsAPIService.getWordsByPageAndGroup(page, group);
      if (setRandomGameNum === 0 || setRandomGameNum % 2 === 0) {
        store.dispatch(setQuestions(this.words.slice(0, COUNT_WORDS_PER_GAMES)));
      } else {
        store.dispatch(setQuestions(this.words.slice(COUNT_WORDS_PER_GAMES, this.words.length)));
      }
      customStart.classList.remove('disable');
      startButton.classList.remove('disable');
      this.playGame();
    } else {
      const { id, token } = helper.getUserData();
      this.userWords = await learnWordsAPIService.getAllUserWords(id, token);
      if (this.userWords.length) {
        const newWords = this.userWords.map((item) => ({ ...item.optional }));
        const firstNum = setGameNum * 10;
        const wordsForGame = newWords.slice(firstNum, firstNum + COUNT_WORDS_PER_GAMES);
        store.dispatch(setQuestions(wordsForGame));
        const callBackFinish = () => {
          store.dispatch(togglePlay());
          const restartWords = this.userWords.map((item) => ({ ...item.optional }));
          const restartWordsForGame = restartWords.slice(0, COUNT_WORDS_PER_GAMES);
          store.dispatch(setQuestions(restartWordsForGame));
          customStart.classList.remove('disable');
          startButton.classList.remove('disable');
          this.playGame();
        };
        if (!wordsForGame.length) {
          Toastify({
            text: 'Words finished. You will start from begin',
            duration: 3000,
            close: true,
            gravity: 'top',
            position: 'left',
            backgroundColor: 'linear-gradient(to right, #00b09b, #96c93d)',
            stopOnFocus: true, // Prevents dismissing of toast on hover
            callback: callBackFinish,
          }).showToast();
        } else {
          customStart.classList.remove('disable');
          startButton.classList.remove('disable');
          this.playGame();
        }
      }
    }
  }

  setRestart() {
    const restart = document.querySelector('.restart');
    restart.addEventListener('click', () => {
      store.dispatch(togglePlay());
      this.stopGame();
      helper.showStartButton(this.userWords.length);
    });
  }

  setRepeat() {
    const repeat = document.querySelectorAll('.name');
    repeat.forEach((item) => {
      item.addEventListener('click', (event) => {
        const audio = event.target;
        this.sayWord(audio.getAttribute('data-audio'));
      });
    });
  }

  addWordToDictionary() {
    const addButtons = document.querySelectorAll('.add');
    if (addButtons && addButtons.length) {
      addButtons.forEach((item) => {
        item.addEventListener('click', async (e) => {
          e.stopPropagation();
          const elem = e.target;
          const wordId = elem.getAttribute('data-id');
          const word = this.getQuestion(elem.getAttribute('data-id'));
          const { id, token } = helper.getUserData();
          await learnWordsAPIService.createUserWord(id, wordId, token, 'weak', word);
        });
      });
    }
  }

  removeWordFromDictionary() {
    const removeButtons = document.querySelectorAll('.remove-word');
    if (removeButtons && removeButtons.length) {
      removeButtons.forEach((item) => {
        item.addEventListener('click', async (e) => {
          e.stopPropagation();
          this.removeWord = e.target;
          const wordId = this.removeWord.getAttribute('data-id');
          const { id, token } = helper.getUserData();
          await learnWordsAPIService.deleteUserWord(id, wordId, token);
        });
      });
    }
  }

  init() {
    this.startGame();
    // baban666@tut.by  asdf_Ghjk1
    const { id, token } = helper.getUserData();
    (async () => {
      const newWords = await learnWordsAPIService.getAllUserWords(id, token);
      if (newWords.length) {
        this.userWords = newWords.map((item) => ({ ...item.optional }));
        await helper.showStartButton(newWords);
      } else {
        await helper.showStartButton();
      }
    })();
  }
}

export default new Ourgame();
