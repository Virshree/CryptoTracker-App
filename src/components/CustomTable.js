import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { CryptoState } from '../CryptoContext';
import { createTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import { useState } from 'react';

const StyledTableCell = withStyles(() => ({
  head: {
    backgroundColor:"gold",
    color: "black",
    fontWeight:800,
    fontSize:18,
   
  },
  body: {
    fontSize: 16,
    
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
     
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    width:"800px",
  },
  tablestyle:{
    width:"900",
    marginTop:"20px",
    
  },
  firstcell:{
      paddingLeft:"15px",
      
  },
  firstcontainer:{
    display:"flex",
  },
  tbody:{
    backgroundColor:'black',
  },
  
pagination: {
      "& .MuiPaginationItem-root": {
        color: "gold",
        marginTop:"10px",
        fontSize:'18px',
      },
    },

 
});
const darkTheme = createTheme({
  palette: {
      primary:{
          main:"#fff",
      },
          type:"dark",
      }
});

export default function CustomTable({list,setList,search,setSearch}) {
  const classes = useStyles();
  const {symbol}=CryptoState();
  const [page,setPage]=useState(1);
  const handleSearch=()=>{
     return list.filter(
       (item)=>item.name.toLowerCase().includes(search)||
       item.symbol.toLowerCase().includes(search)
     );
  };
  return (
    <ThemeProvider theme={darkTheme}>
      <div className={classes.tablestyle}>
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow >
            <StyledTableCell>Coins</StyledTableCell>
            <StyledTableCell align="right">Price</StyledTableCell>
            <StyledTableCell align="right">24h Change</StyledTableCell>
            <StyledTableCell align="right">Market Cap</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody className={classes.tbody} >
          {handleSearch()
         
          .map((row) =>{

              const change=row.price_change_percentage_24h;
          
          return(
            <StyledTableRow key={row.id}>
              <StyledTableCell component="th" scope="row">
          <div className={classes.firstcontainer}>
            <img src={row.image} alt="" style={{width:"60px"}}/>
                <div className={classes.firstcell}>
               <span style={{display:"flex",paddingTop:"10px",fontWeight:600,fontSize:"20px"}} >{row.symbol.toUpperCase()}</span>
                <span style={{display:"flex",color:"gray",fontSize:"16px"}}>{row.name}</span>
                </div>
                </div>
              </StyledTableCell>
              <StyledTableCell align="right">{symbol} {row.current_price.toFixed(2)}</StyledTableCell>
              <StyledTableCell align="right" style={{color:change>0 ? "green":"red"}} >{row.price_change_percentage_24h.toFixed(2)}%</StyledTableCell>
              <StyledTableCell align="right">{symbol} {row.market_cap.toString().slice(0,-6)}M</StyledTableCell>
            </StyledTableRow>
          );
          })};
        </TableBody>
      </Table>
      
          
    </TableContainer>
    </div>
          <Pagination  
          className={classes.pagination} 
        count={10}
       
          
         
 />

    </ThemeProvider>
  );
}
