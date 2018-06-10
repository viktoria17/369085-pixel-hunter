import {getIntroElementFromTemplate} from '../util';

const wrapper =
  `<h1 class="intro__asterisk">*</h1>
  <p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>
`;

const templateId = `intro`;
const className = `intro`;
const introTemplate = getIntroElementFromTemplate(wrapper, templateId, className);

export default introTemplate;
