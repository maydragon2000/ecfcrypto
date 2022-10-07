export const LOGIN_USER = "LOGIN_USER";
export const LOGOUT_USER = "LOGOUT_USER";
export const SET_USER = "SET_USER";
export const RESET_USER = "RESET_USER";
export const RECOVERY_PHRASE_VERIFY = "RECOVERY_PHRASE_VERIFY";
export const SAVE_REGISTER_DATA = "SAVE_REGISTER_DATA";
export const SET_RESPONSE_STATUS = "SET_RESPONSE_STATUS";
export const SET_DARK_WHITE_MODE = "SET_DARK_WHITE_MODE";

export function login(user) {
  return {
    type: LOGIN_USER,
    user,
  };
}

export function logout() {
  return {
    type: LOGOUT_USER,
  };
}

export function setUser(user) {
  return {
    type: SET_USER,
    user,
  };
}

export function resetUser() {
  return { type: RESET_USER };
}

export function recoveryPhraseVerify(name) {
  return { type: RECOVERY_PHRASE_VERIFY, name };
}
export function saveRegisterData(data) {
  return {
    type: SAVE_REGISTER_DATA,
    data
  }
}
export function setResponseStatus(data) {
  return {
    type: SET_RESPONSE_STATUS,
    data
  }
}

export function setStyleMode(data) {
  return {
    type: SET_DARK_WHITE_MODE,
    data
  }
}