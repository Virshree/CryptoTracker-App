import React from "react";
import { CChart } from "@coreui/react-chartjs";
import { HistoricalChart } from "../../api";
import { useEffect } from "react";
import axios from "axios";
import { CryptoState } from "../../CryptoContext";
import { useParams } from "react-router-dom";
import { useState } from "react";
function ChartData() {
  const { id } = useParams();
  const { currency } = CryptoState();

  const [priceChart, setPriceChart] = useState([]);
  const [marketChart, setMarketChart] = useState([]);

  const fetchChartDetails = async () => {
    const { data } = await axios.get(HistoricalChart(id, 365, currency));
    console.log(data.prices);
    setPriceChart(data.prices);

    setMarketChart(data.market_caps);
  };
  useEffect(() => {
    fetchChartDetails();
  }, [currency]);

  function displayPrices() {
    const price = [];
    for (let i = 0; i < priceChart.length; i++) {
      price.push(priceChart[i][1]);
    }

    return price;
  }
  function displayMarketCap() {
    const market = [];
    for (let j = 0; j < marketChart.length; j++) {
      market.push(marketChart[j][1]);
    }
    console.log(market);
    return market;
  }
  function displayDays() {
    const days = [];
    for (let i = 0; i < 367; i++) {
      days[i] = i;
    }
    return days;
  }
  return (
    <div>
      <CChart
        type="line"
        data={{
          labels: displayDays(),
          datasets: [
            {
              label: "Price Chart",
              backgroundColor: "rgba(220, 220, 220, 0.2)",
              borderColor: "gold",
              pointBackgroundColor: "rgba(220, 220, 220, 1)",
              pointBorderColor: "black",
              data: displayPrices(),
            },
            {
              label: "Market Chart",
              backgroundColor: "rgba(220, 220, 220, 0.2)",
              borderColor: "gold",
              pointBackgroundColor: "rgba(220, 220, 220, 1)",
              pointBorderColor: "black",
              data: displayMarketCap(),
            },
          ],
        }}
      />
    </div>
  );
}

export default ChartData;
