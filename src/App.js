import "./App.css";
import { makeStyles } from "@material-ui/core";
import React from "react";
import Header from "./components/Header";
import Banner from "./components/banner/Banner";
//import Table from './components/Table';
import NewTable from "./components/NewTable";
const useStyles = makeStyles(() => ({
  app: {
    backgroundColor: "black",
    color: "white",
    minHeight: "100vh",
  },
}));
function App() {
  const classes = useStyles();
  return (
    <div className={classes.app}>
      <Header />
      <Banner />
      {/* <Table/> */}
      <NewTable />
    </div>
  );
}

export default App;
