import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { SingleCoin } from "../../api";
import axios from "axios";

import Header from "../../components/Header";
import { CryptoState } from "../../CryptoContext";
import ChartData from "../../components/ChartData/ChartData";

function CoinInfo() {
  const [coinData, setCoinData] = useState([]);
  const { symbol, currency } = CryptoState();
  const { id } = useParams();
  console.log(id);

  useEffect(() => {
    fetchCoinsData();
  }, []);
  const fetchCoinsData = async () => {
    const { data } = await axios.get(SingleCoin(id));
    console.log(data);
    setCoinData(data);
  };

  function checkPrice() {
    if (currency === "INR") {
      return coinData?.market_data?.current_price[
        currency.toLowerCase()
      ].toLocaleString("en-IN");
    } else if (currency === "USD") {
      return coinData?.market_data?.current_price[
        currency.toLowerCase()
      ].toLocaleString("en-US");
    }
  }

  function checkMarketCap() {
    if (currency === "INR") {
      return coinData?.market_data?.market_cap[currency.toLowerCase()]
        .toLocaleString("en-IN")
        .slice(0, -10);
    } else if (currency === "USD") {
      return coinData?.market_data?.market_cap[currency.toLowerCase()]
        .toLocaleString("en-US")
        .slice(0, -10);
    }
  }

  return (
    <div>
      <Header />

      <div className="row m-2 p-3">
        <div className="col-md-4">
          <img
            src={coinData?.image?.large}
            alt="coin-logo"
            width="250px"
            height="250px"
          />
          <br />
          <br />
          <h3>{coinData?.name}</h3>

          <span>{coinData?.description?.en.split(".")[0]}</span>
          <br />
          <br />
          <h6>
            Current_Price:{symbol} {checkPrice()}
          </h6>
          <br />
          <h6>Rank:{coinData?.market_cap_rank}</h6>
          <br />
          <h6>
            Market Cap:{symbol} {checkMarketCap()} M
          </h6>
        </div>

        <div className="col-md-8">
          <ChartData />
        </div>
      </div>
    </div>
  );
}

export default CoinInfo;
