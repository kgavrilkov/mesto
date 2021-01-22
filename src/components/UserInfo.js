class UserInfo {
  constructor({userNameSelector, userInfoSelector, userAvatarSelector}) {
    this._userName = document.querySelector(userNameSelector);
    this._userInfo = document.querySelector(userInfoSelector);
    this._userAvatar = document.querySelector(userAvatarSelector);
  }

  getUserInfo() {
    return {
      userName: this._userName.textContent,
      userInfo: this._userInfo.textContent,
      userAvatar: this._userAvatar.style.backgroundImage
    }
  }

  setUserInfo({userName, userInfo, userAvatar}) {
    if (userName) {
      this._userName.textContent = userName;
    }
    if (userInfo) {
      this._userInfo.textContent = userInfo;
    }
    if (userAvatar) {
      this._userAvatar.style.backgroundImage = `url(${userAvatar})`;
    }
  }
}

export default UserInfo;
