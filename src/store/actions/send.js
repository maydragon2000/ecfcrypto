export const SET_SEND_STATUS = "SET_SEND_STATUS";
export function setSendStatus(status) {
    return {
        type: SET_SEND_STATUS,
        status,
    };
}