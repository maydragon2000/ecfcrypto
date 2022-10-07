import React, { useEffect, useReducer, useState } from "react"
import axios from "axios";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { useSelector, useDispatch } from "react-redux";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { FaStar } from "react-icons/fa"
import { AiOutlineExclamationCircle } from "react-icons/ai"
import { MdShowChart } from "react-icons/md"
import { GoClock } from "react-icons/go";
import { RiFileCopyLine } from "react-icons/ri";
import TableFilterCategory from "../../component/TableFilterCategory/TableFilterCategory";
import MarketTable from "../../component/MarketTable/MarketTable";
import SelectCoin from "../../component/SelectCoin/SelectCoin";
import SendConfirmModal from "../../component/SendConfirmModal/SendCofirmModal";

import 'react-tabs/style/react-tabs.css';
import 'react-toastify/dist/ReactToastify.css';
import "./style.css";

const CoinDetail = () => {
    const { tokenSymbol } = useParams();
    const { walletAddress } = useSelector(state => state.wallet);
    const { styleMode } = useSelector(state => state.user);

    const [marketData, setMarketData] = useState();
    const [coinList, setCoinList] = useState([{
        name: {
            image: "bitcoin",
            fullName: "Bitcoin",
            logogram: "BTC"
        },
        id: 1,
    },
    {
        name: {
            image: "ethereum",
            fullName: "Ethereum",
            logogram: "ETH"
        },
        id: 1027,
    },
    {
        name: {
            image: "tether",
            fullName: "Tether",
            logogram: "USDT"
        },
        id: 825,
    },
    {
        name: {
            image: "usdc",
            fullName: "United States Dollar",
            logogram: "USDC"
        },
        id: 3408,
    },
    {
        name: {
            image: "SHIB",
            fullName: "Shiba Inu",
            logogram: "SHIB"
        },
        id: 5994,
    },
    {
        name: {
            image: "polygon",
            fullName: "Dai",
            logogram: "DAI"
        },
        id: 4943,
    },
    
    {
        name: {
            image: "Wrapped Bitcoin",
            fullName: "Wrapped Bitcoin",
            logogram: "WBTC"
        },
        id: 3717,
    },
    {
        name: {
            image: "Uniswap",
            fullName: "Uniswap",
            logogram: "UNI"
        },
        id: 7083,
    },
    {
        name: {
            image: "Cronos",
            fullName: "Cronos",
            logogram: "CRO"
        },
        id: 3635,
    },
    {
        name: {
            image: "Chainlink",
            fullName: "Chainlink",
            logogram: "LINK"
        },
        id: 1975,
    },
    {
        name: {
            image: "ApeCoin",
            fullName: "ApeCoin",
            logogram: "APE"
        },
        id: 18876,
    },
    {
        name: {
            image: "Chiliz",
            fullName: "Chiliz",
            logogram: "CHZ"
        },
        id: 4066,
    },
    {
        name: {
            image: "Decentraland",
            fullName: "Decentraland",
            logogram: "MANA"
        },
        id: 1966,
    },
    {
        name: {
            image: "The Sandbox",
            fullName: "The Sandbox",
            logogram: "SAND"
        },
        id: 6210,
    },
    {
        name: {
            image: "Quant",
            fullName: "Quant",
            logogram: "QNT"
        },
        id: 3155,
    },
    ]);
    const [singleCoin, setSingleCoin] = useState();
    const [singleCoinHistory, setSingleCoinHistory] = useState();
    const [percent, setPercent] = useState(0);
    const [isCopyClipboard, setIsClipboard] = useState(false);
    const [selectedSendCoin, setSelectedSendCoin] = useState({ value: 1, label: 'BTC', image: 1 });
    const [sendCoinAmount, setSendCoinAmount] = useState(0);
    const [sendAddress, setSendAddress] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [marketDataCount, setMarketDataCount] = useState(20);
    const dispatch = useDispatch();

    const copySuccess = () => toast.success("Copy success");
    const onClickClipboard = () => {
        setIsClipboard(true);
        copySuccess();
    }
    const getSinglecoindata = () => {
        axios.get(`${process.env.REACT_APP_SERVER_HOST}/api/cryptocurrency/getcoindetail/${tokenSymbol}`)
            .then((res) => {

                setSingleCoin(res.data.data[tokenSymbol]);
            })
            .catch((res) => {
                console.log(res, "singleCoinError");
            });

        // get singlecoin history
        setSingleCoinHistory(true)
        // axios.get(`${process.env.REACT_APP_SERVER_HOST}/api/cryptocurrency/coinHistory/${tokenSymbol}`)
        //     .then((res) => {
        //         setSingleCoinHistory(res.data.data[tokenSymbol]);
        //     })
        //     .catch((res) => {
        //         console.log(res, "res error");
        //     });
    };
    const getMainMarketData = () => {
        axios.post(`${process.env.REACT_APP_SERVER_HOST}/api/cryptocurrency/getcoins`, { marketDataCount })
            .then((res) => {
                setMarketData(res.data);
            })
            .catch((res) => {
                console.log(res, "res error");
            });
    }
    const sendCoin = () => {
        setShowModal(true);
    }
    useEffect(() => {
        const interval = getMainMarketData();
        setInterval(() => {
            getMainMarketData();
            getSinglecoindata();
        }, 6000000);
        return () => clearInterval(interval);
    }, [])
    useEffect(() => {
        getSinglecoindata();
    }, [tokenSymbol]);

    //get real low and high price
    // useEffect(() => {
    //     if (!!singleCoinHistory && !!singleCoin) {
    //         const lowPrice = singleCoinHistory.quote.USD.low.toFixed(2);
    //         const highPrice = singleCoinHistory.quote.USD.high.toFixed(2);
    //         setPercent((singleCoin.quote.USD.price.toFixed(2) - lowPrice) / (highPrice - lowPrice) * 100);
    //     }
    // }, [singleCoinHistory])

    const selectChange = (e) => {
        setMarketDataCount(e.target.value);
    }
    console.log(marketDataCount, "marketdatacount")

    useEffect(() => {
        getMainMarketData();
    }, [marketDataCount])


    return (
        <>
            <div className={`currencies light_currencies`}>
                {/* <div className="coin-detail-inner"> */}
                <div className="left">
                    <div className="market-status">
                        <h5>Market status</h5>
                        {!singleCoin || !singleCoinHistory ? <div>loading</div> : <><div className="d-flex row">
                            <div className="col-6 market-status_left">
                                <div className="coin-name">
                                    <img alt="" src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${singleCoin.id}.png `} />
                                    <h5>{singleCoin.name}</h5>
                                    <p>{singleCoin.symbol}</p>
                                    <div className="star-wrap">
                                        <FaStar color="blue" />
                                    </div>
                                </div>
                                <div className="coin-number ">
                                    <p className="rank" >Rank #{singleCoin.cmc_rank}</p>
                                    <p className="type">Coin</p>
                                    <p className="watch-number" >On 2,771,773 watchlists</p>
                                </div>
                            </div>
                            <div className="col-6 market-status_right">
                                <div className="coin-price">
                                    <div className="first">
                                        <div className="left">
                                            <h4>${singleCoin.quote.USD.price.toFixed(2)}</h4>
                                            <p className="percent" style={{ color: singleCoin.quote.USD.percent_change_24h < 0 ? "rgb(234, 57, 67)" : "" }} >{singleCoin.quote.USD.percent_change_24h > 0 ? "+" : ""}{singleCoin.quote.USD.percent_change_24h.toFixed(2)}%</p>
                                            <img alt="" src="image/mask.svg" />
                                        </div>
                                        <div className="right">
                                            <p>{singleCoin.name} Price(USD)</p>
                                            <AiOutlineExclamationCircle color="#6C7080" />
                                        </div>
                                    </div>
                                    <div className="filter">
                                        <p><img alt="" src="image/coindetail/high-low-price.svg" /> High / Low Price</p>
                                        <select name="cars" id="24h">
                                            <option value="24h" >24h</option>
                                            <option value="hour">1h</option>
                                            <option value="month">1 month</option>
                                            <option value="year">1 year</option>
                                        </select>

                                    </div>
                                    {/* show real data */}
                                    {/* <progress id="file" value={percent} max="100"> {percent.toFixed(0)}% </progress>
                                    <div className="detail-price">
                                        <p className="low-price">Low : ${singleCoinHistory.quote.USD.low.toFixed(2)}</p>
                                        <p className="high-price" >High : ${singleCoinHistory.quote.USD.high.toFixed(2)}</p>
                                    </div> */}
                                    {/* show static data */}
                                    <progress id="file" value={80} max="100"> {100}% </progress>
                                    <div className="detail-price">
                                        <p className="low-price">Low : ${20235.62}</p>
                                        <p className="high-price" >High : ${22235.62}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                            <div className="detail-items">
                                <div className="detail-item-wrap">
                                    <p className="title" ><MdShowChart color="#5367FF" /> Market Cap</p>
                                    <h5>${singleCoin.quote.USD.market_cap.toFixed(0)}</h5>
                                    <p>+2% <img alt="" src="image/mask.svg" /></p>
                                </div>
                                <div className="detail-item-wrap">
                                    <p className="title" ><AiOutlineExclamationCircle color="#5367FF" /> Full Diluted</p>
                                    <h5>${singleCoin.quote.USD.fully_diluted_market_cap.toFixed(0)}</h5>
                                    <p>+2% <img alt="" src="image/mask.svg" /></p>
                                </div>
                                <div className="detail-item-wrap">
                                    <p className="title" ><GoClock color="#5367FF" /> 24 Volume</p>
                                    <h5>${singleCoin.quote.USD.volume_24h.toFixed(0)}</h5>
                                    <p style={{ color: singleCoin.quote.USD.volume_change_24h < 0 ? "rgb(234, 57, 67)" : "" }}>{singleCoin.quote.USD.volume_change_24h > 0 ? "+" : ""}{singleCoin.quote.USD.volume_change_24h.toFixed(2)}% <img alt="" src="image/mask.svg" /></p>
                                </div>
                                <div className="detail-item-wrap">
                                    <p className="title" ><AiOutlineExclamationCircle color="#5367FF" /> Circulating Supply</p>
                                    <h5>{singleCoin.circulating_supply.toFixed(2)} BTC</h5>
                                    <p className="supply">Max supply {singleCoin.max_supply}</p>
                                </div>
                            </div></>}

                    </div>
                    <div className="trade-history-table">
                        <div className="trade-history-table-header">
                            <h5>Market Cap</h5>
                            <select onChange={selectChange} value={marketDataCount}>
                                <option value="5">Show 5</option>
                                <option value="10">Show 10</option>
                                <option value="20" selected>Show 20</option>
                                <option value="30">Show 30</option>
                                <option value="40">Show 40</option>
                                <option value="50">Show 50</option>
                            </select>
                        </div>
                        {/* <div className="d-flex" style={{ marginBottom: "40px" }}>
                            <TableFilterCategory name="Trade Market" type="normal" />
                            <TableFilterCategory name="Open Order" type="normal" />
                            <TableFilterCategory name="Open History" type="normal" />
                            <TableFilterCategory name="Trade History" type="normal" />
                            <TableFilterCategory name="Portfolio" type="normal" />
                            <TableFilterCategory name="Watchlist" type="normal" />
                        </div> */}
                        <MarketTable smallType={false} marketData={marketData} />
                    </div>
                </div>
                <div className="currency-right">
                    <div className="buy-crypto">
                        <ToastContainer limit={3} autoClose={3000} hideProgressBar={true} theme="colored" />
                        <Tabs default={1}>
                            <TabList>
                                <Tab>SEND COIN</Tab>
                                <Tab>RECEIVE COIN</Tab>
                            </TabList>
                            <TabPanel>
                                <div className="buy-content">
                                    <SelectCoin label="Quantity(BTC)" coinValue={selectedSendCoin} setCoinValue={setSelectedSendCoin} coinAmount={sendCoinAmount} setCoinAmount={setSendCoinAmount} placeholder="0" marketData={coinList} initialId={0} />
                                    <div className="coin-selection-wrap ">
                                        <div className="input-wrap">
                                            <p>Address For send</p>
                                            <input value={sendAddress} onChange={(e) => setSendAddress(e.target.value)} placeholder="Insert the address" />
                                        </div>
                                    </div>

                                    <p className="total"></p>
                                    <button className="buy-button" onClick={sendCoin}>SEND COIN</button>
                                </div>
                            </TabPanel>
                            <TabPanel>
                                <div className="buy-content">
                                    <div className="coin-selection-wrap receive-address">
                                        <div className="input-wrap">
                                            <p>Address For Receive BTC</p>
                                            <div className="address-wrap">
                                                <input disabled value={walletAddress.bitcoinAddress} />
                                                <CopyToClipboard text={walletAddress.bitcoinAddress}
                                                    onCopy={onClickClipboard}>
                                                    <button className="clip-button"><RiFileCopyLine /></button>
                                                </CopyToClipboard>
                                            </div>
                                        </div>
                                    </div>
                                    <p className="warning">
                                        Send only Bitcoin (BTC) to this address.
                                        <br />
                                        Sending any other coins may result in permanent loss.
                                    </p>
                                    <div className="coin-selection-wrap receive-address ">
                                        <div className="input-wrap">
                                            <p>Address For Receive ERC20</p>
                                            <div className="address-wrap">
                                                <input disabled value={walletAddress.ERC20Address} />
                                                <CopyToClipboard text={walletAddress.ERC20Address}
                                                    onCopy={onClickClipboard}>
                                                    <button className="clip-button"><RiFileCopyLine /></button>
                                                </CopyToClipboard>
                                            </div>
                                        </div>
                                    </div>
                                    <p className="warning">
                                        Send only ERC20Tokens (ETH, USDT, ...) to this address.
                                    </p>
                                </div>
                            </TabPanel>
                        </Tabs>
                    </div>
                </div>
                {/* </div> */}
            </div>
            <SendConfirmModal showModal={showModal} setShowModal={setShowModal} sendAddress={sendAddress} sendAmount={sendCoinAmount} tokenName={selectedSendCoin.label} tokenId={selectedSendCoin.image} />
        </>
    )
}
export default CoinDetail;