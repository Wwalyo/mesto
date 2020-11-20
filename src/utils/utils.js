export const loadingRate = (isLoading, formSelector) => {
  const form = document.querySelector(formSelector);
  const submitButton = form.querySelector('.content-form__save-button');
  if (isLoading) {
    submitButton.value = "Сохранение..."
  } 
};
