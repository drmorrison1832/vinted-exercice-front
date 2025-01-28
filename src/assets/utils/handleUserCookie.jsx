import Cookie from "js-cookie";

export const handleUserCookie = {
  get: function () {
    console.log("handleUserCookie: get");
    const userStr = Cookie.get("userObj");
    if (!userStr) {
      // console.log("Unauthorized");
      return null;
    } else {
      const userObj = JSON.parse(userStr);
      // console.log("userObj", userObj);
      return userObj;
    }
  },

  set: function (username, token, avatar) {
    // console.log("handleUserCookie: set");

    const userObj = {};

    userObj.username = username ? username : null;
    userObj.token = token ? token : null;
    userObj.avatar = avatar ? avatar : null;

    Cookie.set("userObj", JSON.stringify(userObj));
    // console.log("userObj is", userObj);
    return userObj;
  },

  clear: function () {
    console.log("handleUserCookie: clear");
    Cookie.remove("userObj");
    return;
  },
};
