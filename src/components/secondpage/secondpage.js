import './secondpage.css';

import React from 'react';
import image from '../../assets/icon.png';
import { useLocation } from 'react-router-dom';
import TradingViewWidget from './chart';

export default function SecondPage() {
  //useLocation which gets the location of previous page where we passed state on Link
  const location = useLocation();
  console.log(location);
  //retireiving sotckData(OHCL),symbol and PE ratio as a state passed on link. 
  const stockData = location.state?.stockData;
  const infoData = location.state?.infoData;
  console.log(stockData);
  console.log(infoData);
  return (
    
    <div className='main-container'>
      <div className='container'>
      <img src = {image} alt = "icon" id = "icon" onClick={() => window.location.href='/'} />
      <div className= 'card1'>
        <h1 id = "symbol">{stockData ? stockData.symbol  : "INVALID"}</h1>
        <h1>{stockData.symbol} Data metrics</h1>
          <p>Open: ${stockData.open}</p>
          <p>High: ${stockData.high}</p>
          <p>Low:${stockData.low}</p>
          <p>Close: ${stockData.previousClose}</p>
          <p>PE Ratio: {infoData.PERatio}</p>
          <p>EPS: {infoData.EPS}</p>
          <p>Beta Ratio: {infoData.beta}</p>
      </div>  
      <div className= 'card3'>
         <h2 id ="title">Company Description:</h2>
        <p id = "desc"><span>{infoData.companyDescription}</span></p>
      </div> 
      <div className='chart'>
          <TradingViewWidget stockData={stockData}/> 
      </div> 
    </div>
    </div>
  );
       
   
}
