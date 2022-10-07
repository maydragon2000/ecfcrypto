import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux";
import { attemptRegister } from "../../../store/thunks/auth";
import { setResponseStatus } from "../../../store/actions/user";
import { attemptCreateWallet } from "../../../store/thunks/wallet"
import wordData from "./words.json";
import "./style.css";

const RecoveryPhrase = () => {
    var { registerData, idFrontImage, idBackImage, realPhoto } = useSelector((state) => state.auth);
    console.log(registerData, idFrontImage, idBackImage, realPhoto, "result");
    var phrase = [];
    var randomNumber = 0;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [disable, setDisable] = useState(false);


    for (let i = 0; i < 12; i++) {
        randomNumber = Math.floor(Math.random() * 1001);
        phrase.push(wordData.words[randomNumber]);
    }
    const onClickContinue = () => {
        setDisable(true);
        const finalRegisterData = { ...registerData, recoveryPhrase: phrase, idFrontImage, idBackImage, realPhoto };
        console.log(finalRegisterData, "finalRegisterData")
        dispatch(attemptRegister(finalRegisterData))
            .then((res) => {
                setDisable(false);
                dispatch(setResponseStatus("success register"));
                dispatch(attemptCreateWallet(res.data.name));
                navigate("/Login");
            })
            .catch((error) => {
                if (error.response) {
                    if (error.response.status === 400) {
                        dispatch(setResponseStatus("userName already exited"))
                    }
                    else {
                        dispatch(setResponseStatus("server connection error"));
                    }
                }
                setDisable(false);
                navigate("/Register");
            });
    }

    console.log(registerData, "registerData");

    return (
        <>
            <div className={`recovery-phrase light_recovery-phrase`}>
                <div className="logo">
                    <Link to="/">
                        <img alt="" src="image/logo.png" />
                        <p>ECF Crypto</p>
                    </Link>
                </div>

                <div className="recovery-phrase-inner">
                    <h1>Secrect Recovery Phrase</h1>
                    <div className="sub-title">
                        <p >Your secret phrase makes it easy to back up and restore your account.</p>

                    </div>
                    <div className="phrase-list">
                        {
                            phrase.map((item, index) =>
                                <div>
                                    <p>
                                        {index + 1}{" "}{item}
                                    </p>
                                </div>)
                        }
                    </div>
                    <p className="warning"><label>WARNING:</label>  Never disclose your Secret Recovery Phrase.
                        Anyone with this phrase can access your account forever.
                    </p>
                    <div className="recovery-phrase-button-wrap">
                        <button type="submit" disabled={disable} onClick={onClickContinue} className="btn recovery-phrase-button">Continue</button>
                    </div>
                </div>
            </div>
        </>
    )
}
export default RecoveryPhrase