import React from "react";
import Benefit from "./Benefit/Benefit";
import CreateProfile from "./CreateProfile/CreateProfile";
import DownloadApp from "./DownloadApp/DownloadApp";
import Instant from "./instant/instant";
import Investor from "./Investor/Investor";
import StartMining from "./StartMining/StartMining";
import TopMarket from "./topmarket/topmarket";
import { useSelector } from "react-redux";
import "./style.css"

const Home = () => {
    const { styleMode } = useSelector((state) => state.user);

    return (
        <>
            <div className={`home light_home`}>
                <Instant />
                <TopMarket />
                <CreateProfile />
                <Benefit />
                <Investor />
                <StartMining />
            </div>
        </>
    )
}
export default Home;