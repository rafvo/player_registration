import { extend } from "vee-validate";

extend("password1", {
  validate: (value) => {
    let upper = /[A-Z]/,
      lower = /[a-z]/,
      number = /[0-9]/,
      special = /[ !"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]/;

    return (
      upper.test(value) &&
      lower.test(value) &&
      number.test(value) &&
      special.test(value)
    );
  },
  message:
    "Deve ser informado pelo menos 1 dos caracteres a seguir: letra maiúscula, letra minúscula, número, caractere especial",
});
