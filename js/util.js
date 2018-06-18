export const getElementFromTemplate = (template, templateId) => {
  const wrapper = document.createElement(`template`);
  wrapper.id = templateId;
  wrapper.innerHTML = template.trim();
  return wrapper;
};

export const getIntroElementFromTemplate = (template, templateId, className) => {
  const wrapper = document.createElement(`div`);
  wrapper.id = templateId;
  wrapper.className = className;
  wrapper.innerHTML = template.trim();
  return wrapper;
};

