import React, { useEffect, useState } from "react";
import axios from "axios"
import { useSelector, useDispatch} from "react-redux";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import "./style.css"
import 'react-tabs/style/react-tabs.css';


const WalletHistory = () => {
    const {walletAddress} = useSelector(state => state.wallet)
    const [ethHistory, setEthHistory] = useState([]);
    const [btcHistory, setBtcHistory] = useState([]);
    const [loading, setLoading] = useState(false);
    const [ethPage, setEthPage] = useState(1);
    const [ethLimit, setEthLimit] = useState(10);
    const [btcPage, setBtcPage] = useState(1);
    const [btcLimit, setBtcLimit] = useState(10);
    const ethAddress = walletAddress.ERC20Address;
    const btcAddress = walletAddress.bitcoinAddress;
    
    const getEthHistory = () => {
        setLoading(true);
        axios.get(`https://api.etherscan.io/api?apikey=QVDS9HCFEZQVPSZ4Q9FN7S3MFDG58GXJQ9&address=${ethAddress}&module=account&action=txlist&endblock=99999999&startblock=0&page=${ethPage}&sort=desc&offset=${ethLimit}`)
        .then((res) => {
            const result = res.data.result.map((item) => {
                const value = (parseInt(item.value) / Math.pow(10, 18)).toFixed(4);
                var d = new Date(parseInt(item.timeStamp) * 1000);
                let action ="";
                if(item.from === "0x18aa5135d2713a3f341d080d30b1454b68afd7dc")
                    action = "Sent"
                else if(item.to === "0x18aa5135d2713a3f341d080d30b1454b68afd7dc")
                    action = "Received"
                return {
                    date:`${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`,
                    action:action,
                    address:action == "Sent"?item.to:item.from,
                    amount:`${value} Ether`
                }
            })
            setEthHistory(result);
            setLoading(false);
            console.log(res, "wallet history");
            console.log(result, 'result');
        })
        .catch((res) => {
            setLoading(false)
            console.log(res, "wallet history err");
        })
    }

    const getBtcHistory = () => {
        setLoading(true);
        axios.get(`https://blockchain.info/rawaddr/${btcAddress}?limit=${btcLimit}&offset=${(btcPage -1) * btcLimit}`)
        .then((res) =>{
            console.log(res.data.txs, "btc res");
            const result = res.data.txs.map((item) => {
                let action = "";
                const value = (parseInt(item.out[0].value) / Math.pow(10, 8)).toFixed(4);
                var d = new Date(parseInt(item.time) * 1000);
                if(item.inputs[0].prev_out.addr === btcAddress)
                    action = "Sent";
                else action = "Received";
                return{
                    date:`${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`,
                    action:action,
                    address:action === "Sent"?item.out[0].addr:item.inputs[0].prev_out.addr,
                    amount:`${value} BTC`
                }
            })
            console.log(result, "btc result");
                setBtcHistory(result);
                setLoading(false);
        })
        .catch((res) => {
            setLoading(false);
            console.log(res, "res");
        })
    }
 
    useEffect(() => {
        
        getEthHistory();
        
        getBtcHistory();
    },[])


    const ethSelectChange = (e) => {
        setEthLimit(e.target.value);
    }

    const ethpageChange = (e) => {
        setEthPage(e.target.value);
    }

    const prevEthPage = () => {
        if(ethPage === 1)
         setEthPage(1);
         else setEthPage(ethPage - 1);
    }

    const nextEthPage = () => {
        setEthPage(parseInt(ethPage) + 1);
    }

    useEffect(() => {
        getEthHistory();
    },[ethPage, ethLimit])

    const btcSelectChange = (e) => {
        setBtcLimit(e.target.value);
    }

    const btcpageChange = (e) => {
        setBtcPage(e.target.value);
    }

    const prevBtcPage = () => {
        if(btcPage === 1)
        setBtcPage(1);
         else setBtcPage(btcPage - 1);
    }

    const nextBtcPage = () => {
        setBtcPage(parseInt(btcPage) + 1);
    }

    useEffect(() => {
        getBtcHistory();
    },[btcPage, btcLimit])

    return (
        <>
            <div className={`wallet-history light_wallet-history`}>
                
                <h1>wallet history</h1>
                <Tabs>
                    <TabList>
                    <Tab>ETH Wallet</Tab>
                    <Tab>BTC Wallet</Tab>
                    </TabList>
                    <TabPanel>
                        <div className="wallethisory_select">
                            <select onChange={ethSelectChange} value={ethLimit}>
                                <option value="5">Show 5</option>
                                <option value="10" selected>Show 10</option>
                                <option value="20">Show 20</option>
                                <option value="30">Show 30</option>
                                <option value="40">Show 40</option>
                                <option value="50">Show 50</option>
                            </select>
                        </div>
                        <table>
                            <thead>
                                <tr>
                                    <th className="coinName">Coin </th>
                                    <th className="date">Date</th>
                                    <th className="amount">Amount</th>
                                    <th className="address">From Address</th>
                                    <th className="address">To Address</th>
                                    <th className="action">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    !ethHistory?
                                    <div className="loader-wrap" style={{height:`${ethLimit * 56}px`}}><div className="Loader"></div></div>:!ethHistory[0]  || loading ? <div className="loader-wrap" style={{height:`${ethLimit * 56}px`}}><div className="Loader"></div></div>
                                    :<>
                                        {ethHistory.map((item, index) =>
                                            <tr key={index} >
                                                <td className="coinName"><img alt="" src={`https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png`} />ETH</td>
                                                <td className="date">{item.date}</td>
                                                <td className="amount">{item.amount}</td>
                                                <td className="address">{item.address}</td>
                                                <td className="address">{item.address}</td>
                                                <td className="action" style={{ color: item.action === "Sent" ? "rgb(22, 199, 132)" : item.action === "Received" ? "rgb(0, 255, 0)" : item.action === "Pending" ? "yellow" : "white" }}>{item.action}</td>
                                            </tr>
                                            )
                                        }
                                    </>
                                }
                            </tbody>
                        </table>
                        <div className="wallehistory_button_wrap">
                                <button onClick={prevEthPage}>{`<`}</button>
                                <p><label>Page :</label><input type="text" value={ethPage} onChange={ethpageChange}  /></p>
                                <button onClick={nextEthPage}>{`>`}</button>
                        </div>
                    </TabPanel>
                    <TabPanel>
                    <div className="wallethisory_select">
                            <select onChange={btcSelectChange} value={btcLimit}>
                                <option value="5">Show 5</option>
                                <option value="10" selected>Show 10</option>
                                <option value="20">Show 20</option>
                                <option value="30">Show 30</option>
                                <option value="40">Show 40</option>
                                <option value="50">Show 50</option>
                            </select>
                        </div>
                    <table>
                            <thead>
                                <tr>
                                    <th className="coinName">Coin </th>
                                    <th className="date">Date</th>
                                    <th className="amount">Amount</th>
                                    <th className="address">From Address</th>
                                    <th className="address">To Address</th>
                                    <th className="action">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    !btcHistory?<div className="loader-wrap" style={{height:`${btcLimit * 56}px`}}><div className="Loader"></div></div>:!ethHistory[0]  || loading ? <div className="loader-wrap" style={{height:`${btcLimit * 56}px`}}><div className="Loader"></div></div>
                                    :<>
                                        {btcHistory.map((item, index) =>
                                            <tr key={index} >
                                                <td className="coinName"><img alt="" src={`https://s2.coinmarketcap.com/static/img/coins/64x64/1.png`} />BTC</td>
                                                <td className="date">{item.date}</td>
                                                <td className="amount">{item.amount}</td>
                                                <td className="address">{item.address}</td>
                                                <td className="address">{item.address}</td>
                                                <td className="action" style={{ color: item.action === "Sent" ? "rgb(22, 199, 132)" : item.action === "Received" ? "rgb(0, 255, 0)" : item.action === "Pending" ? "yellow" : "white" }}>{item.action}</td>
                                            </tr>
                                            )
                                        }
                                    </>
                                }
                            </tbody>
                        </table>
                        <div className="wallehistory_button_wrap">
                                <button onClick={prevBtcPage}>{`<`}</button>
                                <p><label>Page</label> :<input type="text" value={btcPage} onChange={btcpageChange}  /></p>
                                <button onClick={nextBtcPage}>{`>`}</button>
                        </div>
                    </TabPanel>
                </Tabs>
            </div>
        </>
    )
}
export default WalletHistory;
