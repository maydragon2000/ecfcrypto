import { push } from "connected-react-router";
import { login, setUser } from "../actions/user";
import jwt_decode from "jwt-decode";
import {
  postRegister,
  postLogin,
  postRecoveryPhrase,
  resetUser,
  changePassword,
  resetPassword,
  uploadImage,
  sendEmail
} from "../../api/index";

export const attemptLogin = (user) => (dispatch) =>
  postLogin(user).then((res) => {
    console.log(res, "login test");
    if (res.status === 200) {
      const decoded = jwt_decode(res.data.token);
      dispatch(login(decoded));
      localStorage.setItem("token", res.data.token);
      return 200;
    } else if(res.status === 201) {
      return 201;
    }
  }).catch(({ response }) => {
    if (response.status === 400)
      return 400
    else if (response.status === 401)
      return 401;
    else if (response.status === 402)
      return 402;
    else if (response.status === 404)
      return 404;
    else return 500
  });

export const attemptResetPassword = (user) => (dispatch) =>
  resetPassword(user)
    .then((response) => {
      if (response.data === "update success")
        return true;
      else return false;
    })
    .catch(() => {
      dispatch(push(`/login/reset`));
    });
export const attemptRegister = (newUser) => () => postRegister(newUser);
export const attemptVerifyRecoveryPhrase = (data) => () => postRecoveryPhrase(data);
export const attemptResetUser = (user) => (dispatch) =>
  resetUser(user)
    .then(({ data }) => {
      const decoded = jwt_decode(data.token);
      dispatch(setUser(decoded));
      localStorage.setItem("token", data.token);
      return true
    }).catch(({response}) => {
      if(response.status === 401)
        return -1;
      return -2;
    });
export const attemptChangePassword = (data) => () => changePassword(data);
export const attemptSendEmail = (data) => () => sendEmail(data);

export const attemptUploadImage = (data) => (dispatch) =>
  uploadImage(data)
    .then((res) => {
      const decoded = jwt_decode(res.data.token);
      dispatch(setUser(decoded));
      localStorage.setItem("token", res.data.token);
      return true;
    })
    .catch(({ response }) => {
      return false;
    })

