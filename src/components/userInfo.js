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
    profile.photo = this._photo.src;
    return profile;
  }
  
  setUserInfo(userInfoFromServer) {
    if (userInfoFromServer.name) this._name.textContent = userInfoFromServer.name;
    if (userInfoFromServer.about) this._info.textContent = userInfoFromServer.about;
    if (userInfoFromServer.avatar) this._photo.src = userInfoFromServer.avatar;
  }
}
    