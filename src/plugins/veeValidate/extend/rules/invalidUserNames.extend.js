import { extend } from "vee-validate";

extend("invalid_user_names", {
  validate: (value) => {
    const invalidNames = ["cloud", "lx2018", "kiwi"];
    const invalid = invalidNames.filter((e) => e == value);
    return invalid.length <= 0;
  },
  message: (field, obj) => {
    return `O usuário ${obj._value_} não pode ser escolhido`;
  }
});
