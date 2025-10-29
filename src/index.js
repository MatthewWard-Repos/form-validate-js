import "./styles.css";
import {
  postcodeValidator,
  postcodeValidatorExistsForCountry,
} from "postcode-validator";

function getCountries() {
  fetch("https://restcountries.com/v3.1/all?fields=name,cca2")
    .then((res) => res.json())
    .then((data) => {
      const select = document.getElementById("country");
      const countries = data.sort((a, b) =>
        a.name.common.localeCompare(b.name.common)
      );
      countries.forEach((country) => {
        const option = document.createElement("option");
        option.textContent = country.name.common;
        option.value = country.cca2;
        select.appendChild(option);
      });
    });
}

function toggleError(input, error) {
  const inputError = selectEl(`#${input.id}-error`);
  inputError.textContent = input.validity.valid ? "" : error;
}
function selectEl(input) {
  return document.querySelector(`${input}`);
}

function validateEmail(input) {
  const emailInput = selectEl(input);
  emailInput.addEventListener("input", (e) => {
    toggleError(
      emailInput,
      "*Please enter a valid email, e.g(example@example.com)"
    );
  });
}

function validateCountry(input) {
  const countryInput = selectEl(input);
  countryInput.addEventListener("input", (e) => {
    toggleError(countryInput, "");
  });
}

function validatePostCode(input) {
  const postCodeInput = selectEl(input);
  postCodeInput.addEventListener("input", (e) => {
    const countryCode = selectEl("#country").value;
    if (postcodeValidatorExistsForCountry(countryCode)) {
      postCodeInput.setCustomValidity(
        postcodeValidator(postCodeInput.value, countryCode) ? "" : "invalid"
      );
    }
    toggleError(postCodeInput, "*Please enter a valid postcode");
  });
}

function validatePassword(input) {
  const passwordInput = selectEl(input);
  function validateRequirement(requirement, test) {
    if (test) {
      document.getElementById(requirement).classList.remove("invalid");
      document.getElementById(requirement).classList.add("valid");
    } else {
      document.getElementById(requirement).classList.remove("valid");
      document.getElementById(requirement).classList.add("invalid");
    }
  }
  passwordInput.addEventListener("input", (e) => {
    const passwordValue = passwordInput.value;
    const hasLength = passwordValue.length >= 12;
    const hasLowercase = /[a-z]/.test(passwordValue);
    const hasUppercase = /[A-Z]/.test(passwordValue);
    const hasSpecial = /[@!%?*$&]/.test(passwordValue);
    const hasNumber = /\d/.test(passwordValue);
    validateRequirement("length", hasLength);
    validateRequirement("lowercase", hasLowercase);
    validateRequirement("uppercase", hasUppercase);
    validateRequirement("special", hasSpecial);
    validateRequirement("number", hasNumber);
    if (hasLength && hasLowercase && hasUppercase && hasSpecial && hasNumber) {
      passwordInput.setCustomValidity("");
    } else {
      passwordInput.setCustomValidity("invalid");
    }
  });
}

function validateVerifyPassword(input) {
  const verifyPasswordInput = selectEl(input);
  const passwordInput = selectEl("#password");

  function comparePasswords() {
    const verifyValue = verifyPasswordInput.value;
    const passwordValue = passwordInput.value;
    const match = verifyValue === passwordValue && verifyValue !== "";
    verifyPasswordInput.setCustomValidity(match ? "" : "invalid");
    toggleError(verifyPasswordInput, "*Please enter the same password");
  }

  verifyPasswordInput.addEventListener("input", comparePasswords);
  passwordInput.addEventListener("input", comparePasswords);
}

function validateForm() {
  const form = selectEl("form");
  const formInputs = document.querySelectorAll(".form-field");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    formInputs.forEach((input) => {
      if (input.id !== "form-submit" && input.validity.valueMissing) {
        toggleError(
          input,
          `*${
            input.id.slice(0, 1).toUpperCase() + input.id.slice(1)
          } field must be filled.`
        );
      }
    });
  });

  validateEmail("#email");
  validateCountry("#country");
  validatePostCode("#post-code");
  validatePassword("#password");
  validateVerifyPassword("#password-verify");
}
getCountries();
validateForm();
