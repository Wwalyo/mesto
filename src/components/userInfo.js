export default class UserInfo {
  constructor({ nameSelector, infoSelector, photoSelector }) {
    this._name = document.querySelector(nameSelector);
    this._info = document.querySelector(infoSelector);
    this._photo = document.querySelector(photoSelector);  
  }

  getUserInfo() {
    const profile = {};
    profile.name = this._name.textContent;
    profile.info = this._info.textContent;
    return profile;
  }
  
  setUserInfo(userInfoFromServer) {
      this._name.textContent = userInfoFromServer.name;
      this._info.textContent = userInfoFromServer.about;
      this._photo.src = userInfoFromServer.avatar;
  }
}
    