import { getDOMElement } from '../../common/main.helper';
import getCardHeader from './getCardHeader';
import getCardBody from './getCardBody';
import getCardFooter from './getCardFooter';

const getCard = (currentWord = {}, iterator) => {
  const {
    image, wordTranslate,
  } = currentWord;
  const card = getDOMElement('div', 'main-screen-card card unselectable');
  card.setAttribute('id', `main-card-${iterator}`);
  card.setAttribute('guessed', 'false');
  card.setAttribute('data-img', image);
  card.setAttribute('data-translate', wordTranslate);

  const cardHeader = getCardHeader(iterator, image);
  const cardBody = getCardBody(currentWord, iterator);
  const cardFooter = getCardFooter(currentWord, iterator);

  card.append(cardHeader, cardBody, cardFooter);

  return card;
};

export default getCard;
