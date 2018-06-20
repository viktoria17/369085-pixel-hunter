export const getElementFromTemplate = (template) => {
  return template.trim();
};

export const getIntroElementFromTemplate = (template, className) => {
  const wrapper = document.createElement(`div`);
  wrapper.className = className;
  wrapper.innerHTML = template.trim();
  return wrapper;
};
