import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import LeftSide from "../component/LeftSide/LeftSide";
import { useSelector } from "react-redux";
import "./style.css"
const ProfileLayout = () => {
    const { styleMode } = useSelector(state => state.user)
    const [isVisible, setIsVisible] = useState(true)
    return (
        <>
            <div className={`personal light_personal`}>
                <LeftSide isVisible={isVisible} setIsVisible={setIsVisible} />
                <div className={`personal-right ${isVisible ? "full_personal" : "part_personal"}`}>
                    <Outlet />
                </div>
            </div>
        </>
    )
}
export default ProfileLayout;