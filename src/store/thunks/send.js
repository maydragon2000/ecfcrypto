import { getGasFee, postSendCrypto } from "../../api";
import { setSendStatus } from "../actions/send";
export const attemptSendCrypto = (data) => (dispatch) => postSendCrypto(data)
    .then((res) => {
        dispatch(setSendStatus("Success"));
        return "success";
    })
    .catch(({response}) => {
        console.log(response, "before res");
        if(response.status == 402){
            dispatch(setSendStatus("INSUFFICIENT_FUNDS"));
            return "insufficient";
        }
        else {
            dispatch(setSendStatus("Transaction_Fault")); 
            return "fault";
        }
    });

export const attemptGetGasfee = () => (dispatch) => getGasFee()
    .then((res) => {
        console.log(res, "res gasfee");
        return true;
    })
    .catch(() => {
        return false;
    })
    