import React from "react";
import Banner from "../../components/banner/Banner";
import Header from "../../components/Header";
import CryptoTable from "../../components/CryptoTable";
function HomePage() {
  return (
    <div>
      <Header />
      <Banner />
      <CryptoTable />
    </div>
  );
}

export default HomePage;
