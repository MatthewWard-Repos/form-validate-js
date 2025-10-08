function validateForm() {
  const form = document.querySelector("form");
  const formInputs = document.querySelectorAll("form input");
  let targetInput;
  //   const formInput = document.querySelectorAll("form input");
  form.addEventListener("input", (e) => {
    targetInput = document.querySelector(`#${e.target.id}`);
    toggleError(targetInput);
  });
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    formInputs.forEach((input) => {
      if (input.id !== "form-submit") {
        toggleError(input);
      }
    });
  });
  function toggleError(input) {
    let inputError = document.querySelector(`#${input.id}-error`);
    if (input.validity.valid) {
      inputError.textContent = "";
    } else if (input.validity.valueMissing) {
      inputError.textContent = `*${
        input.id.slice(0, 1).toUpperCase() + input.id.slice(1)
      } field must be filled.`;
    }
  }
}
validateForm();
