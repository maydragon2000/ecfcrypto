import React, { useState, useRef, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { ImPhone } from "react-icons/im";
import PhoneInput from 'react-phone-input-2';
import { adminUpdateUser } from "../../api";
import 'react-phone-input-2/lib/style.css'
import "./style.css"

const UserUpdateModal = ({showModal, setShowModal, user, success, error, getUsers, setSelectedIndex}) => {

    const [userName, setUserName] = useState("");
    const [idCheckStatus, setIdCheckStatus] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");
    const [btcAddress, SetBtcAddress] = useState("");
    const [ethAddress, SetEthAddress] = useState("");
    const [email, setEmail] = useState("");

    useEffect(() => {
        setUserName(user.name);
        setPhoneNumber(user.phoneNumber);
        SetBtcAddress(user.btcAddress);
        SetEthAddress(user.ethAddress);
        setEmail(user.email);
        if(user.permission === "0")
            setIdCheckStatus("Waiting");
        else if(user.permission === "1")
            setIdCheckStatus("Allowed");
        else if(user.permission === "2")
            setIdCheckStatus("Disabled");
    },[user])
    const onCloseModal = () => {
        setShowModal(false);
    }

    const update = () => {
        const data = {
            userName:user.name,
            phoneNumber: phoneNumber,
            password: password,
            email:email
        }
        adminUpdateUser(data)
        .then((res) => {
            setPassword("");
            success();
            setSelectedIndex(0);
            getUsers();
            setShowModal(false);
            console.log(res, "res");
        })
        .catch((res) => {
            setPassword("");
            error();
            setSelectedIndex(0);
            getUsers();
            setShowModal(false);
            console.log(res, 'res');
        })
    }
    return(
        <>
            <Modal 
                show={showModal}
                onHide={onCloseModal}
                className='user_update_modal'
            >
                <Modal.Header>
                <Modal.Title id='ModalHeader'>Update User</Modal.Title>
                </Modal.Header>
                <Modal.Body className="modal_body">
                <div className="admin_personal_information_wrap">
                    <div className="personal_information_wrap_column">
                        <div className="information_item">
                            <label>User Name</label>
                            <div className="input_wrap">
                                <input disabled={true} type="text"  value={userName} />
                            </div>
                        </div>
                        <div className="information_item">
                            <label>Id Checked Status</label>
                            <div className="input_wrap">
                                <input disabled={true}  type="text" onChange={(e) => setIdCheckStatus(e.target.value)} value={idCheckStatus} />
                            </div>
                        </div>
                    </div>
                    <div className="personal_information_wrap_column">
                        <div className="information_item">
                            <label>BTC Address</label>
                            <div className="input_wrap">
                                <input disabled={true}  type="text" onChange={(e) => SetBtcAddress(e.target.value)} value={btcAddress} />
                            </div>
                        </div>
                        <div className="information_item">
                            <label>ETH Address</label>
                            <div className="input_wrap">
                                <input disabled={true} type="text" onChange={(e) => SetEthAddress(e.target.value)} value={ethAddress} />
                            </div>
                        </div>
                    </div>
                    <div className="personal_information_wrap_column">
                        <div className="information_item">
                            <label>Phone Number</label>
                            <div className="input_wrap">
                                <PhoneInput
                                    country={'us'}
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e)}
                                />
                                <ImPhone />
                            </div>
                        </div>
                        <div className="information_item">
                            <label>Email</label>
                            <div className="input_wrap">
                                <input type="text" onChange={(e) => setEmail(e.target.value)} value={email} />
                            </div>
                        </div>
                    </div>
                    <div className="personal_information_wrap_column">
                        <div className="information_item information_item_password">
                            <label>New Password</label>
                            <div className="input_wrap">
                                <input type="text" onChange={(e) => setPassword(e.target.value)} value={password} />
                            </div>
                        </div>
                    </div>
                </div>
                </Modal.Body>
                <Modal.Footer className="modal_footer">
                   <button onClick={update} className="update_button">Update</button>
                   <button className="cancel_button" onClick={onCloseModal}>Cancel</button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default UserUpdateModal