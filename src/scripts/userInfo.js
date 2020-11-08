export default class UserInfo {
  constructor({ nameSelector, infoSelector }) {
    this._name = document.querySelector(nameSelector);
    this._info = document.querySelector(infoSelector);  
  }

  getUserInfo() {
    const profile = {};
    profile.name = this._name.textContent;
    profile.info = this._info.textContent;
    return profile;
  }
  
  setUserInfo(inputs) {
    this._name.textContent = inputs["name-input"];
    this._info.textContent = inputs["description-input"];
  }
}
    