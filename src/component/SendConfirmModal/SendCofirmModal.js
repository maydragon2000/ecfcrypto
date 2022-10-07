import React, {useState} from "react";
import { Modal } from "react-bootstrap"
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch, useSelector } from "react-redux";
import { attemptSendCrypto } from "../../store/thunks/send";
import "./style.css"

const SendConfirmModal = ({showModal, setShowModal, tokenName, tokenId, sendAmount, sendAddress}) => {
    const {user} = useSelector((state) => state.user);
    const [pending, setPending] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const transactionSuccess = () => toast.success("Transaction Success");
    const inssufficiant = () => toast.error("Insusfficiant Error");
    const transactionFault = () => toast.error("Transaction Fault");

    const handleClose = () => setShowModal(false);
    const confirm = () => {
        setPending(true);
        dispatch(attemptSendCrypto({sendAddress, sendAmount, userName:user.name, tokenName}))
        .then((res) =>{
            setPending(false);
            console.log(res, "res sendcrypto");
            if(res === "success")
                transactionSuccess();
            else if(res === "insufficient")
                inssufficiant();
            else if(res === "fault")
                transactionFault();
            setShowModal(false);
        })
        .catch((res) => {
            setPending(false);
            console.log(res, "err sendctypro");
            setShowModal(false);
        })
    }

    

    return(
            <Modal className="send_confirm" show={showModal} onHide={handleClose}>
            <ToastContainer limit={3} autoClose={3000} hideProgressBar={true} theme="colored" />
                <Modal.Header closeButton>
                    <h1>Sending {tokenName}</h1>
                </Modal.Header>
                <Modal.Body>
                    <div className="send_detail">
                        <p>To : <label>{sendAddress}</label></p>
                        <p><img src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${tokenId}.png`} />: {sendAmount}</p>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                <div className="button_wrap">
                        <button className="reject_button">Reject</button>
                        <button disabled={pending} onClick={confirm} className="btn confirm_button ">Confirm</button>
                    </div>
                </Modal.Footer>
            </Modal>
    )
}

export default SendConfirmModal;