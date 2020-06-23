import { store } from '../../redux/store';
import {
  setQuestions, togglePlay, askQuestion, setStatistic,
} from './audiocall-redux/audiocall-actions';
import './scss/audiocall.styles.scss';
import helper from './common/audiocall.helper';
import gameScreenComponent from './components/game-screen';
import startScreenComponent from './components/start-screen';
import statisticScreenComponent from './components/statistic-screen';
import { LAST_QUESTION } from './common/audiocall.constants';
import mockData from './common/mock-data';

class Audiocall {
  constructor() {
    this.correct = new Audio('./assets/audio/correct.mp3');
    this.mistake = new Audio('./assets/audio/error.mp3');
    this.failure = new Audio('./assets/audio/failure.mp3');
    this.win = new Audio('./assets/audio/success.mp3');
    this.baseUrl = 'https://raw.githubusercontent.com/irinainina/rslang-data/master/';
  }

  startGame() {
    const startButton = document.getElementById('center-div');
    store.dispatch(setQuestions(mockData));
    startButton.addEventListener('click', () => {
      const state = store.getState();
      const { askInfo } = state.audioCallReducer;
      const startAskInfo = {
        nextQuestion: (askInfo.nextQuestion === undefined) ? false : askInfo.nextQuestion,
        nextQuestionNum: (askInfo.nextQuestionNum === undefined) ? 0 : askInfo.nextQuestionNum,
        firstQuestion: true,
      };
      store.dispatch(askQuestion(startAskInfo));
      store.dispatch(togglePlay());
      this.playGameQuestion();
    });
  }

  playGameQuestion() {
    const state = store.getState();
    const { askInfo, setQuestionsGame } = state.audioCallReducer;
    const questions = this.getQuestionWithAnswers();
    if (state.audioCallReducer.togglePlay) {
      if (askInfo.nextQuestion) {
        store.dispatch(askQuestion({
          nextQuestion: false,
          nextQuestionNum: askInfo.nextQuestionNum += 1,
          firstQuestion: false,
        }));
      }
      const number = askInfo.nextQuestionNum || 0;
      helper.render('#root', questions[number], 'append', '.screen');
      const { audio } = setQuestionsGame[askInfo.nextQuestionNum || 0];
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
            this.checkAnswer(event.target, askInfo.nextQuestionNum);
          }
        });
      });
    }
  }

  sayQuestion(audio) {
    const audioQuestion = new Audio(`${this.baseUrl}${audio}`);
    audioQuestion.play();
  }

  getQuestionWithAnswers() {
    const state = store.getState();
    const { setQuestionsGame } = state.audioCallReducer;
    return helper.getAnswers(setQuestionsGame).map((elem) => gameScreenComponent(elem));
  }

  setGameStatistic(info = {}) {
    store.dispatch(setStatistic(info));
  }

  checkAnswer(answer, questionNum) {
    const currentQuestion = document.querySelector('.result-word').getAttribute('data-word-id');
    if (answer.getAttribute('data-id') === currentQuestion) {
      this.markCorrectAnswer(currentQuestion, questionNum);
    } else {
      this.markWrongAnswer(answer.getAttribute('data-id'));
    }
  }

  stopGame() {
    helper.render('#root', startScreenComponent(), 'append', '.container');
    this.startGame();
  }

  markCorrectAnswer(currentQuestion, questionNum) {
    const picture = document.querySelector('.prof-img');
    const playAudio = document.querySelector('.play-audio');
    const forget = document.querySelector('.forget');
    const next = document.querySelector('.next');
    const answersGroup = document.querySelector('.answers-group');
    const answers = document.querySelectorAll('.icon');
    const titles = document.querySelectorAll('.name');
    answers.forEach((item) => {
      if (item.getAttribute('data-id') === currentQuestion) {
        item.innerHTML = '<i class="fas fa-check-circle"></i>';
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

    next.addEventListener('click', () => {
      const state = store.getState();
      const { askInfo } = state.audioCallReducer;
      store.dispatch(askQuestion({
        ...askInfo,
        nextQuestion: !askInfo.nextQuestion,
      }));

      if (helper.isLastQuestion(questionNum, LAST_QUESTION.last)) {
        helper.render('#root', statisticScreenComponent(), 'append', '.screen');
        store.dispatch(togglePlay());
        const restart = document.querySelector('.restart');
        restart.addEventListener('click', () => {
          this.stopGame();
        });
        this.setGameStatistic({ id: currentQuestion, error: false, type: 'checkAnswer' });
      } else {
        this.setGameStatistic({ id: currentQuestion, error: false, type: 'checkAnswer' });
        this.playGameQuestion();
      }
    });
  }

  markWrongAnswer(currentQuestion) {
    const answers = document.querySelectorAll('.name');
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
    this.setGameStatistic({ id: currentQuestion, error: true, type: 'checkAnswer' });
  }

  init() {
    this.startGame();
  }
}

export default new Audiocall();
