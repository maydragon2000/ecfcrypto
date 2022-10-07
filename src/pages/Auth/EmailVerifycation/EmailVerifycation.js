import React, {useState, useEffect} from "react";
import { encode, decode } from "base-64";
import { useSelector, useDispatch } from "react-redux";
import {MdOutlineMarkEmailUnread} from "react-icons/md"
import { attemptSendEmail } from "../../../store/thunks/auth";
import AuthLogo from "../../../component/AuthLogo/AuthLogo";
import "./style.css"

const EmailVerifycation = () => {

    const {registerData} = useSelector(state => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        sendVerification();
    },[])

    const sendVerification = () => {
        let id = parseInt(Math.random() * 100000);
        dispatch(attemptSendEmail({email:registerData.email, id, name:registerData.userName}))
        .then((res) => {
            console.log(res, "send Email responsive");
        })
        .catch((res) => {
            console.log(res, "sendEmail error")
        })
    }

    return(
        <div className="email_verification">
            <AuthLogo />
            <div className="email_verification-inner">
                <h1>Please Confirm your email</h1>
                <div className="img_wrap">
                    <MdOutlineMarkEmailUnread />
                </div>
                <p>{`(If you did not receive this email, please click`} <a onClick={sendVerification} className="resend">here</a> {`to resend.)`}</p>
            </div>
        </div>
    )
}

export default EmailVerifycation;