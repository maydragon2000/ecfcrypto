import { SET_SEND_STATUS } from "../actions/send";
const initialState = {
    status: "No_Transactioin",
}
export default function send(state = initialState, action) {
    switch (action.type) {
        case SET_SEND_STATUS:
            return {
                status: action.status
            }
        default:
            return state;
    }
}