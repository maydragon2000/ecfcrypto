import {SAVE_REGISTER_DATA, SAVE_ID_FRONT_IMAGE, SAVE_ID_BACK_IMAGE, SAVE_REAL_PHOTO} from "../actions/auth";

const getRegiserData = () => {
  try {
    const registerData = localStorage.getItem('registerData');
    if (!!registerData) {
      return JSON.parse(registerData);
    }
    return "";
  }
  catch (err) {
    return "";
  }
}

const initialState ={
    registerData:getRegiserData(),
    idFrontImage:{},
    idBackImage:{},
    realPhoto:{}
}

export default function auth(state = initialState, action) {
    switch (action.type) {
        case SAVE_REGISTER_DATA:
          return {
            registerData:action.data
          };
        case SAVE_ID_FRONT_IMAGE:
          return {
            registerData:state.registerData,
            idFrontImage:action.data
          };
        case SAVE_ID_BACK_IMAGE:
          return {
            registerData:state.registerData,
            idFrontImage:state.idFrontImage,
            idBackImage:action.data
          };
        case SAVE_REAL_PHOTO:
          return {
            registerData:state.registerData,
            idFrontImage:state.idFrontImage,
            idBackImage:state.idBackImage,
            realPhoto:action.data
          };
        default:
          return state;
  }
}
