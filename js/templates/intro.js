import {getIntroElementFromTemplate} from '../util';

const wrapper =
  `<h1 class="intro__asterisk">*</h1>
  <p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>
`;

const introTemplate = getIntroElementFromTemplate(wrapper, `intro`, `intro`);

export default introTemplate;
