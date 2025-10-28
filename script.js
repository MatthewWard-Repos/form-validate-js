function getCountries() {
  fetch("https://restcountries.com/v3.1/all?fields=name")
    .then((res) => res.json())
    .then((data) => {
      const select = document.getElementById("country");
      const countries = data.sort((a, b) =>
        a.name.common.localeCompare(b.name.common)
      );
      countries.forEach((country) => {
        const option = document.createElement("option");
        option.textContent = country.name.common;
        select.appendChild(option);
      });
    });
}
function getCountryCode(country) {
  fetch(`https://restcountries.com/v3.1/name/${country.toLowerCase()}`)
    .then((res) => res.json())
    .then(([data]) => {
      let countryCode = data.cca2;
      console.log(countryCode);
    });
}

function validateForm() {
  const form = document.querySelector("form");
  const formInputs = document.querySelectorAll(".form-field");
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
getCountries();
validateForm();
