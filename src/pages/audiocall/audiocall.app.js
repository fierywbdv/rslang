import Toastify from 'toastify-js';
import { store } from '../../redux/store';
import {
  togglePlayAudioCall,
  setKindOfGameAudioCall,
  setRoundAndLevelAudioCall,
  setGameNumberAudioCall,
  setQuestionNumberAudioCall,
  setRandomGameNumberAudioCall,
  setQuestionsAudioCall,
  setStatistic,
} from './audiocall-redux/audiocall-actions';
import './scss/audiocall.styles.scss';
import helper from './common/audiocall.helper';
import gameScreenComponent from './components/game-screen';
import startScreenComponent from './components/start-screen';
import statisticScreenComponent from './components/statistic-screen';
import { COUNT_WORDS_PER_GAMES } from './common/audiocall.constants';
import { learnWordsAPIService } from '../../services/learnWordsAPIService';

class Audiocall {
  constructor() {
    this.userWords = [];
    this.words = [];
    this.isLast = false;
    this.keyCode = null;
    this.element = null;
    this.answerNumber = null;
    this.statisticInfo = null;
    this.correct = new Audio('./assets/audio/correct.mp3');
    this.mistake = new Audio('./assets/audio/error.mp3');
    this.failure = new Audio('./assets/audio/failure.mp3');
    this.win = new Audio('./assets/audio/success.mp3');
    this.baseUrl = 'https://raw.githubusercontent.com/irinainina/rslang-data/master/';
  }

  startGame() {
    const startButton = document.getElementById('start-play');
    const level = document.getElementById('level');
    const group = document.getElementById('group');
    const customStart = document.getElementById('custom-start');
    const root = document.getElementById('root');
    const body = document.querySelector('body');
    root.className = 'audio-call-root';
    body.className = 'audio-call-body';

    helper.rangeSlider();

    if (startButton) {
      startButton.addEventListener('click', async () => {
        if (!startButton.classList.contains('disable')) {
          store.dispatch(setKindOfGameAudioCall('withUserWords'));
          await this.setWords(this.group, this.page, 'withUserWords');
          store.dispatch(togglePlayAudioCall());
        }
      });
    }

    if (customStart) {
      customStart.addEventListener('click', async () => {
        if (!customStart.classList.contains('disable')) {
          this.page = level.value;
          this.group = group.value;
          store.dispatch(setKindOfGameAudioCall('withRandomWords'));
          await this.setWords(this.group, this.page, 'withRandomWords');
          store.dispatch(togglePlayAudioCall());
          store.dispatch(setRoundAndLevelAudioCall({ level: this.page, roundGame: this.group }));
        }
      });
    }
  }

  async setWords(page, group, kind) {
    const startButton = document.getElementById('start-play');
    const customStart = document.getElementById('custom-start');
    customStart.classList.add('disable')
    startButton.classList.add('disable')
    const state = store.getState();
    const { gameNumber, randomGameNumber } = state.audioCallReducer;
    if (kind === 'withRandomWords') {
      this.words = await learnWordsAPIService.getWordsByPageAndGroup(page, group);
      if (randomGameNumber === 0 || randomGameNumber % 2 === 0) {
        store.dispatch(setQuestionsAudioCall(this.words.slice(0, COUNT_WORDS_PER_GAMES)));
      } else {
        store.dispatch(setQuestionsAudioCall(this.words
          .slice(COUNT_WORDS_PER_GAMES, this.words.length)));
      }
      customStart.classList.remove('disable');
      startButton.classList.remove('disable');
      this.playGameQuestion();
    } else {
      const { id, token } = helper.getUserData();
      this.userWords = await learnWordsAPIService.getAllUserWords(id, token);
      if (this.userWords.length) {
        const newWords = this.userWords.map((item) => ({ ...item.optional }));
        const firstNum = gameNumber * 10;
        const wordsForGame = newWords.slice(firstNum, firstNum + COUNT_WORDS_PER_GAMES);
        store.dispatch(setQuestionsAudioCall(wordsForGame));
        const callBackFinish = () => {
          store.dispatch(togglePlayAudioCall());
          const restartWords = this.userWords.map((item) => ({ ...item.optional }));
          const restartWordsForGame = restartWords.slice(0, COUNT_WORDS_PER_GAMES);
          store.dispatch(setQuestionsAudioCall(restartWordsForGame));
          customStart.classList.remove('disable')
          startButton.classList.remove('disable')
          this.playGameQuestion();
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
          customStart.classList.remove('disable')
          startButton.classList.remove('disable')
          this.playGameQuestion();
        }
      }
    }
  }

  playGameQuestion() {
    const state = store.getState();
    const { questionsGame, questionNumber } = state.audioCallReducer;
    const questions = Audiocall.getQuestionWithAnswers(questionsGame);
    helper.render('#root', questions[questionNumber], 'append', '.screen');
    const { audio } = questionsGame[questionNumber || 0];
    const repeatQuestion = document.querySelector('.play-audio');
    repeatQuestion.addEventListener('click', () => {
      this.sayQuestion(audio);
    });
    this.sayQuestion(audio);
    const words = document.querySelectorAll('.name');
    words.forEach((word) => {
      word.addEventListener('click', (event) => {
        event.stopPropagation();
        const el = event.target;
        if (!el.classList.contains('disable')) {
          this.checkAnswer(el.getAttribute('data-id'), questionNumber);
        }
      });
    });

    this.keyBoardListener(questionNumber);

    const forget = document.querySelector('.forget');
    forget.addEventListener('click', (event) => {
      event.stopPropagation();
      this.markForgetAnswer(questionNumber);
    });

    this.resetGame();
  }

  sayQuestion(audio) {
    const audioQuestion = new Audio(`${this.baseUrl}${audio}`);
    audioQuestion.play();
  }

  static getQuestionWithAnswers(questionsGame) {
    return helper.getAnswers(questionsGame).map((elem) => gameScreenComponent(elem));
  }

  setGameStatistic(info = {}) {
    const state = store.getState();
    const { gameNumber, randomGameNumber, kind } = state.audioCallReducer;
    this.statisticInfo = {
      ...info,
      game: kind === 'withRandomWords' ? randomGameNumber : gameNumber,
      kind,
    };
    store.dispatch(setStatistic(this.statisticInfo));
  }

  checkAnswer(id, questionNum) {
    const currentQuestion = document.querySelector('.result-word').getAttribute('data-word-id');
    if (id === currentQuestion) {
      this.markCorrectAnswer(currentQuestion, questionNum);
    } else {
      this.markWrongAnswer(id, questionNum);
    }
  }

  stopGame() {
    helper.render('#root', startScreenComponent(), 'append', '.container');

    const state = store.getState();
    const { kind, roundAndLevel } = state.audioCallReducer;
    if (kind === 'withRandomWords') {
      helper.setRangeSlider(roundAndLevel);
    }

    this.startGame();
  }

  setRestart() {
    const restart = document.querySelector('.restart');
    restart.addEventListener('click', () => {
      store.dispatch(togglePlayAudioCall());
      this.stopGame();
      helper.showStartButton(this.userWords.length);
    });
  }

  resetGame() {
    const restart = document.querySelector('.reset');
    restart.addEventListener('click', () => {
      store.dispatch(togglePlayAudioCall());
      this.stopGame();
      helper.showStartButton(this.userWords.length);
      store.dispatch(setRoundAndLevelAudioCall({
        flag: true,
        level: this.page,
        roundGame: this.group,
      }));
    });
  }

  markCorrectAnswer(currentQuestion, questionNum) {
    const picture = document.querySelector('.prof-img');
    const playAudio = document.querySelector('.play-audio');
    const forget = document.querySelector('.forget');
    const next = document.querySelector('.next');
    const answersGroup = document.querySelector('.answers-group');
    const answers = document.querySelectorAll('.icon');
    const titles = document.querySelectorAll('.name');
    const state = store.getState();
    const { questionsGame, kind } = state.audioCallReducer;

    answers.forEach((item) => {
      const itemId = item.getAttribute('data-id');
      if (itemId === currentQuestion) {
        const elem = document.getElementById(itemId);
        elem.innerHTML = '<i class="fas fa-check-circle"></i>';
      }
    });
    titles.forEach((item) => {
      item.classList.add('disable');
    });
    picture.classList.add('show');
    playAudio.classList.add('hide');
    forget.classList.add('hide');
    next.classList.add('show');
    answersGroup.classList.add('show');
    this.correct.play();
    helper.setOpacity(questionNum);

    this.setGameStatistic({
      mistake: false,
      wordQues: questionsGame[questionNum],
    });

    this.nextQuestion(questionNum, kind);
  }

  markWrongAnswer(currentQuestion, questionNum) {
    const answers = document.querySelectorAll('.name');
    const state = store.getState();
    const { questionsGame } = state.audioCallReducer;

    this.mistake.play();
    answers.forEach((item) => {
      if (item.getAttribute('data-id') === currentQuestion) {
        item.classList.add('disable');
        if (item.hasChildNodes()) {
          const children = item.firstChild;
          children.innerHTML = '<i class="fas fa-times-circle"></i>';
        }
      }
    });

    this.setGameStatistic({
      mistake: true,
      wordQues: questionsGame[questionNum],
    });
  }

  markForgetAnswer(questionNum) {
    const answers = document.querySelectorAll('.icon');
    const answersAll = document.querySelectorAll('.name');
    const next = document.querySelector('.next');
    const currentQuestion = document.querySelector('.result-word').getAttribute('data-word-id');
    const forget = document.querySelector('.forget');
    const state = store.getState();
    const { questionsGame, kind } = state.audioCallReducer;

    this.mistake.play();
    answers.forEach((item) => {
      item.classList.add('disable');
      const itemId = item.getAttribute('data-id');
      if (itemId === currentQuestion) {
        const elem = document.getElementById(itemId);
        elem.classList.add('disable');
        elem.innerHTML = '<i class="fas fa-check-circle"></i>';
      }
    });

    answersAll.forEach((item) => {
      item.classList.add('disable');
    });

    forget.classList.add('hide');
    next.classList.add('show');

    this.setGameStatistic({
      mistake: true,
      wordQues: questionsGame[questionNum],
    });

    helper.setOpacity(questionNum);

    this.nextQuestion(questionNum, kind);
  }

  nextQuestion(questionNum, kind) {
    const next = document.querySelector('.next');

    next.addEventListener('click', () => {
      store.dispatch(setQuestionNumberAudioCall());
      if (this.isLastQuestion(questionNum)) {
        helper.render('#root', statisticScreenComponent(kind), 'append', '.screen');
        store.dispatch(togglePlayAudioCall());
        this.setRestart();
        const repeat = document.querySelectorAll('.name');
        repeat.forEach((item) => {
          item.addEventListener('click', (event) => {
            const audio = event.target;
            this.sayQuestion(audio.getAttribute('data-audio'));
          });
        });
        this.isLast = false;
        store.dispatch(setQuestionNumberAudioCall(0));
      } else {
        this.playGameQuestion();
      }
    });
  }

  isLastQuestion(questionNumber) {
    const state = store.getState();
    const { kind, questionsGame } = state.audioCallReducer;
    if (kind === 'withUserWords' && questionsGame.length - 1 === questionNumber) {
      this.isLast = true;
      store.dispatch(setGameNumberAudioCall());
    }

    if (kind === 'withRandomWords' && questionsGame.length - 1 === questionNumber) {
      this.isLast = true;
      store.dispatch(setRandomGameNumberAudioCall());
    }

    return this.isLast;
  }

  keyBoardListener(questionNumber) {
    document.addEventListener('keydown', (e) => {
      this.keyCode = e.which || e.keyCode;
      switch (this.keyCode) {
        case 49:
          this.answerNumber = document.querySelector('.answer-number-1');
          this.element = this.answerNumber.closest('.name');
          if (!this.element.classList.contains('disable')) {
            this.checkAnswer(this.answerNumber.getAttribute('data-id'), questionNumber);
          }
          break;
        case 50:
          this.answerNumber = document.querySelector('.answer-number-2');
          this.element = this.answerNumber.closest('.name');
          if (!this.element.classList.contains('disable')) {
            this.checkAnswer(this.answerNumber.getAttribute('data-id'), questionNumber);
          }
          break;
        case 51:
          this.answerNumber = document.querySelector('.answer-number-3');
          this.element = this.answerNumber.closest('.name');
          if (!this.element.classList.contains('disable')) {
            this.checkAnswer(this.answerNumber.getAttribute('data-id'), questionNumber);
          }
          break;
        case 52:
          this.answerNumber = document.querySelector('.answer-number-4');
          this.element = this.answerNumber.closest('.name');
          if (!this.element.classList.contains('disable')) {
            this.checkAnswer(this.answerNumber.getAttribute('data-id'), questionNumber);
          }
          break;
        case 53:
          this.answerNumber = document.querySelector('.answer-number-5');
          this.element = this.answerNumber.closest('.name');
          if (!this.element.classList.contains('disable')) {
            this.checkAnswer(this.answerNumber.getAttribute('data-id'), questionNumber);
          }
          break;
        default:
          break;
      }
    });
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

export default new Audiocall();
