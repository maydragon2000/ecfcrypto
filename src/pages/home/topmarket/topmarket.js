import React, { useEffect, useState } from "react";
import SingleCoin from "../../../component/singlecoin/SingleCoin";
import axios from "axios"
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import "./style.css"

const TopMarket = () => {
    const [marketData, setMarketData] = useState();
    const responsive = {
        desktop: {
            breakpoint: { max: 1500, min: 1024 },
            items: 3,
            partialVisibilityGutter: 40
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2,
            partialVisibilityGutter: 40
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
            partialVisibilityGutter: 40
        }
    };
    useEffect(() => {
        getTopMarket();
        setInterval(getTopMarket, 6000000);
    }, []);
    const getTopMarket = () => {
        axios.get(`${process.env.REACT_APP_SERVER_HOST}/api/cryptocurrency/getMainCoin`)
            .then((res) => {
                setMarketData(Object.values(res.data.data).sort(function (a, b) { return a.cmc_rank - b.cmc_rank }));
            })
            .catch((res) => {
                console.log(res, "res error");
            });
    }
    return (
        <>
            <div className="home-top-market">
                <div className="title">
                    <p style={{ color: "#5367FF" }}>Top Market</p>
                    <h1>Get Various Crypto Coin</h1>
                    {!marketData ? <div>Loading</div>
                        :
                        <>
                            <div className="topcoin-wrap">
                                {marketData.map((item, index) =>
                                    <SingleCoin coinName={item.name} coinId={item.id} logogram={item.symbol} price={item.quote.USD.price.toFixed(2)} percent={item.quote.USD.percent_change_7d.toFixed(2)} />
                                )}
                            </div>
                            <div className="topcoin_wrap_mobile">
                                <Carousel partialVisible={true} autoPlay={false} autoPlaySpeed={3000} responsive={responsive}>
                                    {marketData.map((item, index) =>
                                        <SingleCoin coinName={item.name} coinId={item.id} logogram={item.symbol} price={item.quote.USD.price.toFixed(2)} percent={item.quote.USD.percent_change_7d.toFixed(2)} />
                                    )}
                                </Carousel>
                            </div>
                        </>}
                </div>
            </div>
        </>
    )
}
export default TopMarket