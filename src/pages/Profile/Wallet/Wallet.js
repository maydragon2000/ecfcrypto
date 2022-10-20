import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { attemptGetWalletData, attemptSendWalletTokenList } from "../../../store/thunks/wallet"
import AddCoinModal from "../../../component/AddCoinModal/AddCoinModal";
import BuySellModal from "../../../component/BuySellModal/BuySellModal";
import { RiFileCopyLine } from "react-icons/ri";
import { GoPlus } from "react-icons/go";
import { setSendStatus } from "../../../store/actions/send";
import { ToastHeader } from "react-bootstrap";
import "./style.css"

const Wallet = () => {
    const { walletAddress, walletData } = useSelector(state => state.wallet);
    const { isAuth, user, styleMode } = useSelector(state => state.user);
    const [selectedValue, setSelectedValue] = useState(undefined);
    const [isCopyClipboard, setIsClipboard] = useState(false);
    const [loading, setLoading] = useState(false);
    const [modalShow, setModalShow] = useState(false);
    const [buyModalShow, setBuyModalShow] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onOpenModal = () => {
        setModalShow(true);
    }
    const onCloseModal = () => {
        setModalShow(false);
    }
    const onClickToken = (token) => {
        navigate(`/profile/walletHistory/${token.name}/${token.id}`);
    }
    useEffect(() => {
        if (!isAuth) {
            navigate('/login');
        }
        setLoading(true);
        if (isAuth)
            dispatch(attemptGetWalletData(user.name))
                .then((res) => {
                    setLoading(false)
                })
    }, []);
    const copySuccess = () => toast.success("Copy success");
    const comingSoon = () => toast.info("Coming Soon...");
    const onClickClipboard = () => {
        setIsClipboard(true);
        copySuccess();
    }
    
    useEffect(() => {
        if (!modalShow && selectedValue) {
            const sendTokenList = selectedValue.map(item => item.label);
            const sendData = { tokenlist: sendTokenList, userName: user.name };
            setLoading(true)
            dispatch(attemptSendWalletTokenList(sendData))
                .then(res => {
                    dispatch(attemptGetWalletData(user.name))
                        .then((res) => {
                            setLoading(false);
                        })
                    setSelectedValue(undefined);
                })
        }
    }, [modalShow]);
    console.log(walletData, "walletData");

    const opneBuyModal = () => {
        setBuyModalShow(true);
    }

    const closeBuyModal = () => {
        setBuyModalShow(false);
    }

    const t = document.querySelector('#test')
    
    
    return (
        <>
            <ToastContainer limit={3} autoClose={3000} hideProgressBar={true} theme="colored" />
            <div className={`wallet light_wallet`}>
                <h1>
                    Wallet
                </h1>
                {walletAddress?
                <>
                <h5>BTC address</h5>
                <div className="wallet_address_wrap">
                <p>{walletAddress.bitcoinAddress}</p>
                <CopyToClipboard text={walletAddress.bitcoinAddress}
                    onCopy={onClickClipboard}>
                    <button className="clip-button"><RiFileCopyLine /></button>
                </CopyToClipboard>
                </div>
                <h5>ERC20 address</h5>
                <div className="wallet_address_wrap">
                <p>{walletAddress.ERC20Address}</p>
                <CopyToClipboard text={walletAddress.ERC20Address}
                    onCopy={onClickClipboard}>
                    <button className="clip-button"><RiFileCopyLine /></button>
                </CopyToClipboard>
                </div>
                
                
                </>
                :<></>
                }
                
                <div className="wallet-button-wrap">
                    <button className="buy_sell_button" onClick={() => opneBuyModal()}>BUY/SELL</button>
                    <button onClick={onOpenModal}><GoPlus />Add Coin</button>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th className="coinName">
                                Coin
                            </th>
                            <th className="coin-available">
                                Available
                            </th>
                            <th className="usd-valuation">
                                USD Valuation
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {!walletData?<div className="loader-wrap"><div className="Loader"></div></div>:!walletData[0]  || loading ? <div className="loader-wrap"><div className="Loader"></div></div>
                            : <>
                                {
                                    walletData.map((item, index) => <tr key={index} onClick={()=>navigate('/profile/walletHistory')}>
                                        <td className="coinName">
                                            <img alt="" src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${item.id}.png`} />
                                            {item.name}
                                        </td>
                                        <td className="coin-available">
                                            {(item.available).toFixed(5)} {item.symbol}
                                        </td>
                                        <td className="usd-valuation">
                                            {(item.price * item.available).toFixed(2)} USD
                                        </td>
                                    </tr>)
                                }
                            </>
                        }
                    </tbody>
                </table>
            </div>
            <AddCoinModal selectedValue={selectedValue} setSelectedValue={setSelectedValue} modalShow={modalShow} onCloseModal={onCloseModal} />
            <BuySellModal showModal={buyModalShow} onCloseModal={closeBuyModal}  />
        </>
    )
}
export default Wallet;
