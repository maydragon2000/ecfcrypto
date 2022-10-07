import React, { useEffect, useState } from "react";
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import { Link, useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { RiLock2Line } from "react-icons/ri";
import { IoWalletOutline } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";
import { attemptUploadImage } from "../../store/thunks/auth";
import { ToastContainer, toast } from 'react-toastify';
import {VscHistory} from "react-icons/vsc";
import 'react-toastify/dist/ReactToastify.css';
import "./style.css";
import '@trendmicro/react-sidenav/dist/react-sidenav.css';

const LeftSide = ({ setIsVisible, isVisible }) => {
    const { user, isAuth } = useSelector((state) => state.user);
    const [sendImageData, setSendImageData] = useState({
        userName: !!user?user.name:"",
        image: ''
    })
    const uploadedImage = !!user?user.image:"";
    const [disable, setDisable] = useState(true);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [selectedImage, setSelectedImage] = useState(null);
    const handleClick = event => {
        hiddenFileInput.current.click();
    };
    const hiddenFileInput = React.useRef(null);
    useEffect(() => {
        if(!isAuth)
            navigate('login');
    },[])

    useEffect(() => {
        if (sendImageData.image !== "")
        setDisable(false);
    },[sendImageData])
    const success = () => toast.success("Success Save New Avatar.");
    const failed = () => toast.error("Error Save New Avatar.");
    const sendUploadImage = () => {
        setDisable(true);
        dispatch(attemptUploadImage(sendImageData)).then((res) => {
            if (res === true) {
                success();
            }
            setDisable(false);
        }).catch((res) => {
            failed();
            setDisable(false);
        })
    }
    useEffect(() => {
        if (window.innerWidth >= 1100)
            setIsVisible(true);
        else setIsVisible(false);
    }, []);

    const onClickProfile = () => {
        navigate("/profile");
        if (window.innerWidth < 1100)
            setIsVisible(false);
    }

    const onClickSecurity = () => {
        navigate("sequrity");
        if (window.innerWidth < 1100)
            setIsVisible(false);
    }

    const onClickWallet = () => {
        navigate("wallet");
        if (window.innerWidth < 1100)
            setIsVisible(false);
    };

    const onClickWalletHistory = () => {
        navigate("walletHistory");
        if (window.innerWidth < 1100)
            setIsVisible(false);
    }

    console.log(selectedImage, "selectedImage");
    return (
        <>
            <SideNav expanded={isVisible} className={isVisible ? "side_visible" : "side-unvisible"} >
                <ToastContainer limit={3} autoClose={3000} hideProgressBar={true} theme="colored" />
                <SideNav.Toggle
                    onClick={() => {
                        setIsVisible(!isVisible);
                    }}
                />
                <img className="avatar" onClick={handleClick} alt="not found" src={selectedImage ? URL.createObjectURL(selectedImage) : !uploadedImage ? "/image/user.jpg" : `${process.env.REACT_APP_SERVER_IMAGE_URL}${uploadedImage}`} />
                <button disabled={disable} className="btn save-uploadImage" onClick={sendUploadImage}>Save</button>
                <input type="file"
                    style={{ display: "none" }}
                    ref={hiddenFileInput}
                    name="myImage" onChange={(event) => {
                        setSendImageData({
                            ...sendImageData, image: event.target.files[0]
                        })
                        setSelectedImage(event.target.files[0]);
                    }} />
                <h2>{user?.name ?? ""}</h2>
                <p>{user?.displayName ?? ""}</p>
                <SideNav.Nav defaultSelected="profile">
                    <NavItem eventKey="profile" onClick={onClickProfile}>
                        <NavIcon>
                            <CgProfile />
                        </NavIcon>
                        <NavText>My Profile</NavText>
                    </NavItem>
                    <NavItem eventKey="Sequrity" onClick={onClickSecurity}>
                        <NavIcon>
                            <RiLock2Line />
                        </NavIcon>
                        <NavText>Security</NavText>
                    </NavItem>
                    <NavItem eventKey="wallet" onClick={onClickWallet}>
                        <NavIcon>
                            <IoWalletOutline />
                        </NavIcon>
                        <NavText>Wallet</NavText>
                    </NavItem>
                    <NavItem eventKey="wallethisory" onClick={onClickWalletHistory}>
                        <NavIcon>
                            <VscHistory />
                        </NavIcon>
                        <NavText>Wallet History</NavText>
                    </NavItem>
                </SideNav.Nav>
            </SideNav>
        </>
    )
}
export default LeftSide;