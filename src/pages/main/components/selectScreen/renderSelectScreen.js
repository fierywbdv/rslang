import { clearRoot } from '../../../user/common/user.utils';
import getSelectCard from './getSelectCard';
import selectHandler from './selectHandler';
import { sidebarListener } from '../../common/main.utils';

const renderSelectScreen = () => {
  clearRoot();
  const root = document.querySelector('#root');
  const selectCard = getSelectCard();
  root.append(selectCard);
  selectHandler();
  sidebarListener();
};
export default renderSelectScreen;
