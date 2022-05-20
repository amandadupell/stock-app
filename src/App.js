import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Heading, 
  Input, 
  PageContainer, 
  StockContainer, 
  StockInformation,
  StockSymbol,
  StyledButton
} from './constants';
import Watchlist from './Watchlist';

const token = 'ca2mphiad3i73jrq92v0';

function App() {
  const [symbol, setSymbol] = useState();
  const [company, setCompany] = useState();
  const [currentPrice, setCurrentPrice] = useState();
  const [currency, setCurrency] = useState();
  const [exchange, setExchange] = useState();
  const [high52, setHigh52] = useState();
  const [low52, setLow52] = useState();
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    const highAndLow52 = 
      `https://finnhub.io/api/v1/stock/metric?symbol=${symbol}
      &metric=all&token=${token}`;

    axios.get(highAndLow52)
      .then((response) => {
        const high = '52WeekHigh';
        const low = '52WeekLow';
        const data = response.data;

        setHigh52(data.metric[high]);
        setLow52(data.metric[low]);
      })
  }, [symbol, high52, low52]);

  useEffect(() => {
    const current = 
      `https://finnhub.io/api/v1/quote?token=${token}
      &symbol=${symbol}`;

    axios.get(current)
      .then((response) => {
        const data = response.data;

        setCurrentPrice(data.c);
      })
  }, [symbol, currentPrice]);

  useEffect(() => {
    const companyProfile = 
      `https://finnhub.io/api/v1/stock/profile2?token=${token}
      &symbol=${symbol}`;
  
    axios.get(companyProfile)
      .then((response) => {
        const data = response.data;

        setCompany(data.name);
        setExchange(data.exchange);
        setCurrency(data.currency);
      })
  }, [symbol, company, exchange]);

  const searchItems = (value) => {
    setSymbol(value);
  };

  const addToWatchlist = (symbol, company, currentPrice, currency, exchange, high52, low52) => {
    const result = [...watchlist];
    result.push({symbol, company, currentPrice, currency, exchange, high52, low52});

    setWatchlist(result);
  };

  return (
    <PageContainer>
      <Heading>Stock Search</Heading>
      <StockInformation>
        Enter stock symbol below:
      </StockInformation>
      <Input 
        label='Input Stock Symbol'
        type='text'
        placeholder='Search...'
        onChange={event => searchItems(event.target.value)}
      />
      <StockContainer>
        <StockSymbol>
          Stock Symbol: {symbol}
        </StockSymbol>
        <StockInformation>
          Company Name: {company}
        </StockInformation>
        <StockInformation>
          Current Price: {currentPrice} {currency}
        </StockInformation>
        <StockInformation>
          Exchange: {exchange}
        </StockInformation>
        <StockInformation>
          52 Week High: {high52} {currency}
        </StockInformation>
        <StockInformation>
          52 Week Low: {low52} {currency}
        </StockInformation>
        <StyledButton
          onClick={() => {
            if (watchlist.length === 0) {
              addToWatchlist(symbol, company, currentPrice, currency, exchange, high52, low52)
            } else watchlist.forEach(item => {
              if (item.symbol !== symbol) {
                addToWatchlist(symbol, company, currentPrice, currency, exchange, high52, low52)
              }
            });
          }}
        >Add to watchlist</StyledButton>
      </StockContainer>
      <Heading>Watchlist</Heading>
      {
        watchlist.map((item, index) =>
          <Watchlist 
            key={index}
            symbol={item.symbol}
            company={item.company}
            currentPrice={item.currentPrice}
            currency={item.currency}
            exchange={item.exchange}
            high52={item.high52}
            low52={item.low52}
          />
      )}
    </PageContainer>
  );
}

export default App;
