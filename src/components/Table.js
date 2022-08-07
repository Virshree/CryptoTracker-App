import { ThemeProvider, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import TextField from '@material-ui/core/TextField';
import CustomTable from './CustomTable';
import React from 'react'
import axios from 'axios';
import { TrendingCoins } from '../api';
import { CryptoState } from '../CryptoContext';
import { useEffect } from 'react';
import { useState } from 'react';
import { createTheme} from '@material-ui/core/styles';
 const useStyles=makeStyles({
    table:{
        alignItems:"center",
        justifyContent:"center",
        display:"flex",
        marginTop:"10px",
        flexDirection:"column",
       
    },
    search:{
        width:'90ch',
        color:"white",
        marginTop:"20px",
    }
    });
const darkTheme = createTheme({
  palette: {
      primary:{
          main:"#fff",
      },
          type:"dark",
      }
});
function Table() {
   const classes=useStyles();
   const [search,setSearch]=useState("");
   const [list,setList]=useState([]);
   const {currency}=CryptoState();
    useEffect(()=>{
       getTrendingData();
   // eslint-disable-next-line react-hooks/exhaustive-deps
   },[currency])
   const getTrendingData=async()=>{
        const {data}= await axios.get(TrendingCoins(currency));
        console.log(data);
        setList(data);
   }

  return (
        
    <div className={classes.tablecontainer}>
        <div className={classes.table}>
            <Typography variant='h4'>Cryptocurrency Prices by Market Cap</Typography>
          <ThemeProvider theme={darkTheme}>
            <TextField search={search} 
            onChange={(e)=>setSearch(e.target.value)} 
            className={classes.search} id="outlined-basic"
            label="Serach for  a Crypto Currency" variant="outlined" />
      </ThemeProvider>
        <CustomTable list={list} setList={setList} search={search} setSearch={setSearch}/>  
        </div>
          
    </div>
     
  )
}

export default Table