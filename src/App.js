import "./App.css";
import { makeStyles } from "@material-ui/core";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import CoinInfo from "./pages/CoinsInfo/CoinInfo";
import "@coreui/coreui/dist/css/coreui.min.css";
import "bootstrap/dist/css/bootstrap.min.css";

const useStyles = makeStyles(() => ({
  app: {
    backgroundColor: "black",
    color: "white",
    minHeight: "120vh",
  },
}));
function App() {
  const classes = useStyles();
  return (
    <BrowserRouter>
      <div className={classes.app} id="scroll">
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route path="/coins/:id" element={<CoinInfo />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
