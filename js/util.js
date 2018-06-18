export const getElementFromTemplate = (template) => {
  const wrapper = document.createElement(`template`);
  wrapper.innerHTML = template.trim();
  return wrapper.innerHTML;
};

export const getIntroElementFromTemplate = (template, className) => {
  const wrapper = document.createElement(`div`);
  wrapper.className = className;
  wrapper.innerHTML = template.trim();
  return wrapper;
};
