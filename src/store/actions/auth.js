export const SAVE_REGISTER_DATA = "SAVE_REGISTER_DATA";
export const SAVE_ID_FRONT_IMAGE = "SAVE_ID_FRONT_IMAGE";
export const SAVE_ID_BACK_IMAGE = "SAVE_ID_BACK_IMAGE";
export const SAVE_REAL_PHOTO = "SAVE_REAL_PHOTO";

export function saveRegisterData(data) {
    return {
      type: SAVE_REGISTER_DATA,
      data
    }
  }

  export function saveIdFrontImage(data) {
    return {
      type: SAVE_ID_FRONT_IMAGE,
      data
    }
  }

  export function saveIdBackImage(data) {
    return {
      type: SAVE_ID_BACK_IMAGE,
      data
    }
  }

  export function saveRealPhoto(data) {
    return {
      type: SAVE_REAL_PHOTO,
      data
    }
  }