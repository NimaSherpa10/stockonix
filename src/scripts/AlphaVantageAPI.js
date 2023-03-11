/**
 * This module establishes an API connection with AlphaVantage, and instantiates
 * a class to retrieve the user requested stock information.
 * 
 * The AlphaVantageAPI class takes in a stock symbol as an argument through 
 * its constructor, and defines methods for retrieving the stock information.
 * 
 * @class AlphaVantageAPI
 */

export class AlphaVantageAPI {
    constructor(requestedStock = "TSLA") {
        this.requestedStock = requestedStock;
        this.alpha = require('alphavantage')({ key: 'WX5GQNRSWDWX1NZT' });
    }

    /**
     * Retrieves the requested stocks information as a promises, and resolves 
     * the values to a destructured object.
     * 
     * @returns {Promise} Resolved destructured object containing the stocks: 
     * symbol, open, high, low, current price, volume, and previousClose
     */
    async getStockInformation() {
        const data = await this.alpha.data.quote(this.requestedStock);

        const { '01. symbol': symbol, '02. open': open, '03. high': high,
            '04. low': low, '05. price': currentPrice, '06. volume': volume,
            '08. previous close': previousClose } = data['Global Quote'];

        return { symbol, open, high, low, currentPrice, volume, previousClose };
    }

    /**
     * Retrieves the requested stocks company information as a promise, and 
     * resolves the values to a destructured object.
     * 
     * @returns {Promise} Resolved destructured object containing the stocks: 
     * descriptions, PERatio, and EPS.
     */
    async getCompanyInformation() {
        const data = await this.alpha.fundamental.company_overview(this.requestedStock);
        const { 'Description': companyDescription, 'PERatio': PERatio,
            EPS, 'Beta': beta } = data;

        return { companyDescription, PERatio, EPS, beta };
    }
    



}

export default AlphaVantageAPI;





