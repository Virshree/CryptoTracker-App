import MaterialTable from "@material-table/core";
import React, { useState, useEffect } from "react";
import { CryptoState } from "../CryptoContext";
import axios from "axios";
import { TrendingCoins } from "../api";

function NewTable() {
  const [cryptoList, setCryptoList] = useState([]);
  const { currency, symbol } = CryptoState();

  useEffect(() => {
    getTrendingData();
  }, [currency]);
  const getTrendingData = async () => {
    const { data } = await axios.get(TrendingCoins(currency));
    //console.log(data);
    setCryptoList(data);
  };
  function handleClick(id) {
    console.log(id);
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
        onRowClick={(event, rowData) => handleClick(rowData.cryptoList.id)}
        data={cryptoList}
        options={{
          headerStyle: {
            backgroundColor: "gold",
            color: "black",
            fontWeight: "700",
          },
        }}
        title="Crypto Data"
      />
    </div>
  );
}

export default NewTable;
