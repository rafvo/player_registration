export default class Player {
  constructor({
    id = "",
    name = "",
    birth = null,
    user_name = "",
    email = "",
    password = ""
  } = {}) {
    this.id = id;
    this.name = name;
    this.birth = birth;
    this.user_name = user_name;
    this.email = email;
    this.password = password;
  }

  /*seta as propriedades da instância com a validação*/
  create(json = null) {
    let model = Player.fromJson(json);

    Object.keys(json).forEach((key) => {
      this[key] = model[key];
    });
  }

  static fromJson(json = null) {
    let model = new Player(json);

    model.id = json["id"] ? parseInt(json["id"]) : "";
    model.name = json["name"] ? json["name"] : "";
    model.birth = json["birth"] ? json["birth"] : null;
    model.user_name = json["user_name"] ? json["user_name"] : "";
    model.email = json["email"] ? json["email"] : "";
    model.password = json["password"] ? json["password"] : "";

    return model;
  }
}
