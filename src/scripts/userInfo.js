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
  setUserInfo(nameInput, infoInput) {
    this._name.textContent = nameInput;
    this._info.textContent = infoInput;
  }
}
    