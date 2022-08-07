import MaterialTable from "@material-table/core";
import React, { useState, useEffect } from "react";
import { CryptoState } from "../CryptoContext";
import axios from "axios";
import { SingleCoin, TrendingCoins } from "../api";
import { useNavigate } from "react-router-dom";
function NewTable() {
  const [cryptoList, setCryptoList] = useState([]);
  const { currency, symbol } = CryptoState();

  useEffect(() => {
    getTrendingData();
    SingleCoin();
  }, [currency]);
  const getTrendingData = async () => {
    const { data } = await axios.get(TrendingCoins(currency));
    console.log(data);
    setCryptoList(data);
  };

  const navigate = useNavigate();
  async function handleClick(id) {
    //console.log(id);
    const { data } = await axios.get(SingleCoin(id));
    console.log(data);
    navigate(`/coins/${id}`);
  }
  return (
    <div style={{ margin: "80px" }}>
      <MaterialTable
        columns={[
          {
            title: " ",
            field: "image",
            render: (item) => (
              <img src={item.image} alt="crypto_logo" width="50" height="50" />
            ),
          },
          {
            title: "Coins",
            field: "name",
            render: (item) => <p>{item.name.toUpperCase()}</p>,
          },
          {
            title: "Price",
            field: "current_price",
            render: (item) => (
              <p>
                {symbol}
                {item.current_price}
              </p>
            ),
          },
          {
            title: "24h Change",
            field: "price_change_percentage_24h",
            render: (item) => (
              <p>
                {item.price_change_percentage_24h > 0 ? (
                  <p style={{ color: "green" }}>
                    {item.price_change_percentage_24h.toFixed(2)}%
                  </p>
                ) : (
                  <p style={{ color: "red" }}>
                    {item.price_change_percentage_24h.toFixed(2)}%
                  </p>
                )}
              </p>
            ),
          },
          {
            title: "Market Cap",
            field: "market_cap",
            render: (item) => <p>{item.market_cap.toString().slice(0, -8)}M</p>,
          },
        ]}
        data={cryptoList}
        title="Crypto Data"
        onRowClick={(event, rowData) => handleClick(rowData.id)}
        options={{
          headerStyle: {
            backgroundColor: "gold",
            color: "black",
            fontWeight: "700",
          },
        }}
      />
    </div>
  );
}

export default NewTable;
