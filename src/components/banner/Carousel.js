import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { CoinList } from '../../api';
import { CryptoState } from '../../CryptoContext';
import { makeStyles } from '@material-ui/styles'
import AliceCarousel from 'react-alice-carousel';
function Carousel() {

  const [trending,setTrending]=useState([]);
  // eslint-disable-next-line no-unused-vars
  const {currency,symbol}=CryptoState();


  const fetchTrendingCoins=async()=>{
   const {data} = await axios.get(CoinList(currency));
   console.log(data);
   setTrending(data);
  }
    useEffect(()=>{
    fetchTrendingCoins();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[currency]);

 const useStyles=makeStyles(()=>({
   main:{
   
     width:"64%",
     margin:"auto",
    paddingBottom:"40px",
   },
    carousel:{
        display:"flex",
        alignItems:"center",
        height:"20%",

    },
    carouselItem:{
      display:"flex",
      flexDirection:"column",
      alignItems:"center",
      cursor:"pointer",
      color:"white",
      
    },
    text:{
      display:"flex",
      alignItems:"center",
      justifyContent:"center",
      textIndent:"10px",
      
    }
}));
 const classes=useStyles();
  const items= trending.map((coin)=>{
    let profit = coin?.price_change_percentage_24h ;

  return (
  
         <div className={classes.carouselItem}>
          <img src={coin?.image} style={{marginBottom:"10px",width:"120px",height:"120px"}}  alt=""/>
            <div className={classes.text}>
          <span  style={{fontWeight:500,fontSize:"20px",textTransform:"uppercase"}}>{coin?.symbol} </span>
          <span style={{color:profit >0 ? "green":"red",fontSize:"20px"}}>{coin?.price_change_percentage_24h?.toFixed(2)}%</span>
          </div>
          <span style={{fontSize:"22px"}}>{symbol} {coin?.current_price}</span>
         </div>
  
  )  
  });
  const responsive={
    0:{
      items:2,
    },
    512:{
      items:4,
    },
  };
      return(
    <div className={classes.main}>
 <div className={classes.carousel}>
      <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls
        disableButtonsControls
        responsive={responsive}
        items={items}
        autoPlay
      />
    </div>
    </div>
      )
}

export default Carousel;