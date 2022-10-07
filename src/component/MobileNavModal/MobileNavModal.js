import React, { useState } from "react";
import { Navbar, NavbarBrand, NavLink, Dropdown, DropdownButton } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap"
import { useSelector } from "react-redux"
import { HiOutlineHome } from "react-icons/hi"
import { BsLightningCharge } from "react-icons/bs"
import { FiBook } from "react-icons/fi"
import { BiWallet } from "react-icons/bi"
import {GrTransaction} from "react-icons/gr"
const MobileNavModal = ({ showMobileMenu, setShowMobileMenu, isAuth, user, logOut, isAdmin, adminLogout }) => {
    const handleClose = () => setShowMobileMenu(false);
    const { styleMode } = useSelector((state) => state.user);

    return (
        <>
            <Modal show={showMobileMenu} className={`mobile_menu_side light_mobile_menu_side`} onHide={handleClose}>
                {/* <Modal.Header closeButton>

                </Modal.Header> */}
                <Modal.Body>
                    <div className="mobile_menu_header" style={{ display: !isAuth ? "none" : "flex" }}>
                        <Link to="/profile" style={{ display: !isAuth ? "none" : "flex" }} className="user-picture"><img alt="" src={!user ? "" : !user.image ? "/image/user.jpg" : `${process.env.REACT_APP_SERVER_IMAGE_URL}${user.image}`} /></Link>
                        <p style={{ display: !isAuth ? "none" : "flex" }}>{!user ? "" : user.name}</p>

                    </div>
                    <Navbar className="mobile_menu_body">
                        <NavLink href="/">
                            <label><HiOutlineHome />Home</label><label>{">"}</label>
                        </NavLink>
                        <NavLink href="/market" ><label><BsLightningCharge />Market</label><label>{">"}</label></NavLink>
                        <NavLink href="/detail/btc" ><label><GrTransaction />Send Coin</label><label>{">"}</label></NavLink>
                        <Link to="/profile/wallet" onClick={handleClose} style={{ display: !isAuth ? "none" : "flex" }} ><label><BiWallet />Wallet</label> <label>{">"}</label></Link>
                        <div className="auth_button_wrap">
                            <button className="logout_btn" style={{ display: !isAuth ? "none" : "flex" }} onClick={logOut}>Log Out</button>
                            <Link to="/login" onClick={adminLogout} style={{ display: isAuth ? "none" :!isAdmin?"none":"flex" }} className="login-button">Log Out</Link>
                            <Link to="/login" style={{ display: isAuth ? "none" : isAdmin?"none": "flex" }} className="login-button">Sign in</Link>
                            <Link to="/register" style={{ display: isAuth ? "none" : isAdmin?"none": "flex" }} className="register-button">Register</Link>
                        </div>
                    </Navbar>
                </Modal.Body>
            </Modal>
        </>
    )
}
export default MobileNavModal;