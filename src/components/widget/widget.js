import React, { useState, useEffect } from "react";
import AlphaVantageAPI from "../../scripts/AlphaVantageAPI";
import { Link } from 'react-router-dom';
import './widget.css';
import { useCookies } from 'react-cookie';

/**
 * Defines the functionality of the initial state of a widget. When a user 
 * enters valid input, the input is then retrieved and displayed 
 * 
 * @returns 
 */
const WidgetInitialState = ({ widgetId }) => {
  const [newStock, setNewStock] = useState('');
  const [showStockWidget, setStockWidget] = useState(false);
  //setting cookies
  const [cookies, setCookie,removeCookie] = useCookies([`stockSymbol-${widgetId}`]);

  //making cookies to save it when there is new symbol added and saving it with its id
  useEffect(() => {
    const stockSymbol = cookies[`stockSymbol-${widgetId}`];
    if (stockSymbol) {
      setNewStock(stockSymbol);
      setStockWidget(true);
    }
  }, [cookies, widgetId]);

  const handleSettingStock = (newStockSymbol) => {
    setNewStock(newStockSymbol);
  }

  const handleStockPrompt = () => {
    const retrieveNewStock = window.prompt("Enter the name of the stock:");

    if (retrieveNewStock) {
      handleSettingStock(retrieveNewStock);
      setStockWidget(true);
      setCookie(`stockSymbol-${widgetId}`, retrieveNewStock, { path: '/' });
    }
  }
  //handles edit widget and removes cookie also changes tock widget to false so it will return to first state.
  const handleEditWidget = () => {
    removeCookie(`stockSymbol-${widgetId}`, { path: '/' });
    setStockWidget(false);
  }
  if (showStockWidget) {
    return <WidgetClicked stockSymbol={newStock} onEditWidget = {handleEditWidget}/>;
  } else {
    return (
      <div  className = "stock-container-initial" id={`stock-container-initial-${widgetId}`}>
        <h1 id="add-stock" onClick={handleStockPrompt}>+</h1>
      </div>
    );
  }
}

/**
 * Widget which contains information regarding the user selected stock
 * 
 * @returns 
 */
const WidgetClicked = ({ stockSymbol, onEditWidget}) => {
  const [stockData, setStockData] = useState({});
  const [infoData, setStockInfo] = useState({});
  
  //setting Date
  const [newDate, setNewDate] = useState('');

  //initial state of editing is false since we are not clicking edit button .
  const alphaVantageAPI = new AlphaVantageAPI(stockSymbol);

  useEffect(() => {
    alphaVantageAPI.getStockInformation()
      .then(({ symbol, open, high, low, currentPrice, volume, previousClose }) => {
        const priceChange = parseFloat(currentPrice - previousClose).toFixed(2);
        const percentChange = parseFloat((priceChange / previousClose) * 100).toFixed(2);
        const data = {
          symbol,
          open: parseFloat(open).toFixed(2),
          high: parseFloat(high).toFixed(2),
          low: parseFloat(low).toFixed(2),
          currentPrice: parseFloat(currentPrice).toFixed(2),
          volume: parseFloat(volume).toLocaleString(undefined, { groupingSeparator: "'" }),
          previousClose: parseFloat(previousClose).toFixed(2),
          priceChange,
          percentChange,
        };
        setStockData(data);
      })
      .catch(error => {
        console.error(error);
      });

    alphaVantageAPI.getCompanyInformation()
      .then(({ companyDescription, PERatio, EPS, beta }) => {
        const info = {
          companyDescription,
          PERatio,
          EPS,
          beta,
        };
        setStockInfo(info);
      })
      .catch(error => {
        console.error(error);
      });

    const lastUpdated = new Date();
    const time = lastUpdated.getFullYear() + '/' + lastUpdated.getMonth() + '/' + lastUpdated.getDate();
    setNewDate(time);
    
    //handles Edit Widget so when user clicks edit button it clears the cookies related to the id and change the state to its initial state.

  },[stockSymbol]);
  return (
    <div id="stock-container">
       <Link to = '/'  id="edit-widget-button" className="button"  onClick={onEditWidget}> ❌</Link>
      <Link to = '/secondpage' state={{stockData: stockData, infoData:infoData}} type="button" id="navigate-to-metrics-button" className="button" >📉</Link>
      <h1 id="stock-symbol">{stockData.symbol}</h1>
      {stockData.currentPrice && (
        <h2 id="current-price" className="type-number">$
          {stockData.currentPrice}<span id="denomination">USD</span>
        </h2>
      )}
      <h3 id="price-change" className="type-number"
      style = {{color: stockData.priceChange < 0 ? "red" : "green"}}>
        ${stockData.priceChange}
      <span id="percent-change" class="type-number" style={{color: stockData.percentChange < 0 ? "red" : "green"}}>
            {stockData.percentChange}%
      </span>
    </h3>
      <h4 id="last-updated"> Last Updated: {newDate}</h4>
    </div>
  );
  }
  export default WidgetInitialState;