import { Container, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import Carousel from './Carousel';

const useStyles =makeStyles(()=>({
    banner:{
        backgroundImage:"url(./banner2.jpg)",
       
    },
    bannerContent:{
      display:"flex",
      height:"150px",
      justifyContent:"space-around",
      paddingTop:"20px"
    },
    tagline:{
      display:"flex",
      height:"30%",
      flexDirection:"column",
      textAlign:"center",
      justifyContent:"center",
    },
 
    

}))
function Banner() {
    const classes=useStyles();
  return (
    <div className={classes.banner}>
      <Container className={classes.bannerContent}>
      <div className={classes.tagline}>
        <Typography variant='h3'style={{fontWeight:"bold",marginBottom:"15px",marginTop:"40px"}}>
            CryptoTracker
        </Typography>
        <Typography variant='e2' style={{textTransform:"capitalize",color:"gray"}}>
            Get all the Info regarding your fav crypto currency
        </Typography>
        </div>
      
        </Container>
          <Carousel/>
    </div>
  )
}

export default Banner