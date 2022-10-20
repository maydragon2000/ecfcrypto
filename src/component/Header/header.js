import React, { useEffect, useState } from "react";
import { Navbar, NavbarBrand, NavLink, Dropdown, DropdownButton } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout, setStyleMode } from "../../store/actions/user";
import { GiHamburgerMenu } from "react-icons/gi"
import { BsFillMoonFill, BsFillSunFill } from "react-icons/bs";
import MobileNavModal from "../MobileNavModal/MobileNavModal";
import TawkMessengerReact from '@tawk.to/tawk-messenger-react';

import "./style.css";
const Header = (props) => {
    const { isAuth, user, styleMode } = useSelector((state) => state.user);
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const logOut = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("wallet");
        navigate("/");
        dispatch(logout());
    }
    const goProfile = () => {
        navigate("/profile")
    }
    const onClickMobile = () => {
        setShowMobileMenu(true)
    }
    const changeStyleToDark = () => {
        dispatch(setStyleMode(false));
        localStorage.setItem("styleMode", false)
    }
    const changeStyleToWhite = () => {
        dispatch(setStyleMode(true));
        localStorage.setItem("styleMode", true)
    }

    useEffect(() => {
        if(localStorage.getItem("admin") === "this user is admin"){
            setIsAdmin(true);
        } else {
            setIsAdmin(false);
        }
    },[])

    const adminLogout = () => {
        localStorage.removeItem('admin');
    }
    return (
        <>
            <div id="header" className={`header light_header`}>
                <Navbar expand="lg" >
                    <NavbarBrand href="/">
                        <img alt="" src="/image/logo.png" />
                        <p></p>
                    </NavbarBrand>
                    <div className="mobile-menu">
                        <button onClick={onClickMobile}><GiHamburgerMenu /></button>
                    </div>
                    <div className="button-wrap">
                        <div className="navlink-wrap">
                            <NavLink href="/">Home</NavLink>
                            <NavLink href="/market" >Market</NavLink>
                            <NavLink style={{display:isAuth? "block":"none"}} href="/detail/BTC" >Send Coin</NavLink>
                            <NavLink style={{display:isAdmin?"block":"none"}} href="/admin" >Admin</NavLink>
                        </div>
                        {/* <Link to="/profile/walletHistory/Bitcoin/1" style={{ display: !isAuth ? "none" : "flex" }} className="trade-history-button"><img alt="" src="/image/trade-history.svg" />History</Link> */}
                        <Link to="/profile/wallet" style={{ display: !isAuth ? "none" : "flex" }} className="wallet-button"><img alt="" src="/image/wallet.svg" /> Wallet</Link>
                        <Link to="/profile" style={{ display: !isAuth ? "none" : "flex" }} className="user-picture"><img alt="" src={!user ? "" : !user.image ? "/image/user.jpg" : `${process.env.REACT_APP_SERVER_IMAGE_URL}${user.image}`} /></Link>
                        <DropdownButton style={{ display: !isAuth ? "none" : "flex" }} id="dropdown-item-button" title={!user ? "" : user.name}>
                            <Dropdown.Item as="button" onClick={goProfile}>Profile</Dropdown.Item>
                            <Dropdown.Item as="button" onClick={() => logOut()}>Log Out</Dropdown.Item>
                        </DropdownButton>
                        <Link to="/login" onClick={adminLogout} style={{ display: isAuth ? "none" :!isAdmin?"none":"flex" }} className="login-button">Log Out</Link>
                        <Link to="/login" style={{ display: isAuth ? "none" : isAdmin?"none": "flex" }} className="login-button">Sign in</Link>
                        <Link to="/register" style={{ display: isAuth ? "none" : isAdmin?"none": "flex" }} className="register-button">Register</Link>
                    </div>
                </Navbar>
                {/* <div className="stylebutton_wrap">
                    <button className="dark_button" style={{ display: styleMode ? "flex" : "none" }} onClick={changeStyleToDark}><BsFillMoonFill /></button>
                    <button className="white_button" style={{ display: styleMode ? "none" : "flex" }} onClick={changeStyleToWhite}><BsFillSunFill /></button>
                </div> */}
                <MobileNavModal showMobileMenu={showMobileMenu} setShowMobileMenu={setShowMobileMenu} isAuth={isAuth} user={!user ? false : user} logOut={logOut} isAdmin={isAdmin} adminLogout={adminLogout} />
                <TawkMessengerReact
                    propertyId="6348276854f06e12d89a0395"
                    widgetId="1gf8tjstt"/>
            </div>
        </>
    )
}
export default Header;