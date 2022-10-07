import { postRemoveCoin } from "../../api";

export const attemptRemoveCoin = (name, tokenName) => (dispatch) => 
    postRemoveCoin(name, tokenName)
    .then((res) => {
         return res.status;
    })
    .catch((res) => {
        console.log(res)
    })