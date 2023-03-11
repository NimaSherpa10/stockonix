import React from "react";
import WidgetInitialState from "./widget";
import './widget.css';
import image from '../../assets/icon.png';

/**
 * Defines the functionality of the initial state of a widget. When a user 
 * enters valid input, the input is then retrieved and displayed 
 * 
 * @returns initial state 
 */
const DisplayWidget = () => {
  
  return (
    <div id="main">
      <div className="adddiv">
        <img src={image} id="icon1" alt="image.png"></img>
        <h1 id = "welcome">Welcome to Stockonix</h1>
        <div className="stocks">
          <WidgetInitialState widgetId="1" />
          <WidgetInitialState widgetId="2" />
          <WidgetInitialState widgetId="3" />
          <WidgetInitialState widgetId="4" />
          <WidgetInitialState widgetId="5" />
        </div>
        <div className="stocks1">
          <WidgetInitialState widgetId="6" />
          <WidgetInitialState widgetId="7" />
          <WidgetInitialState widgetId="8" />
          <WidgetInitialState widgetId="9" />
          <WidgetInitialState widgetId="10" />
        </div>
      </div>
    </div>
  );
}

export default DisplayWidget;

