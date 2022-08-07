import React from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
const Crypto=createContext();

const CryptoContext=({children})=>{

    const [currency,setCurrency]=useState('INR');
    const [symbol,setSymbol]=useState('₹');

    useEffect(()=>{
        if(currency ==='INR')
        setSymbol('₹')
        else if(currency==='USD')
        setSymbol('$')
    },[currency])
    return (
        <Crypto.Provider value={{currency,setCurrency,symbol}} >
            {children}
        </Crypto.Provider>
    )
}
export default CryptoContext;

export const CryptoState=()=>useContext(Crypto);

