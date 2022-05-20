import React, { useEffect, useState } from "react";
import { WatchlistContainer, StockInformation, StockSymbol } from "./constants";
import axios from 'axios';

const token = 'ca2mphiad3i73jrq92v0';

const Watchlist = ({
  symbol,
  company,
  currentPrice,
  currency,
  exchange,
  high52,
  low52,
}) => {
  const [detailsVisible, setDetailsVisible] = useState(false);
  const [price, setPrice] = useState(currentPrice);

  useEffect(() => {
    const current = 
    `https://finnhub.io/api/v1/quote?token=${token}
    &symbol=${symbol}`;

    function getCurrentPrice() {
        axios.get(current)
        .then((response) => {
          const data = response.data;
  
          setPrice(data.c);
        })
      }
      getCurrentPrice();
      const interval = setInterval(() => getCurrentPrice(), 30000)
      return () => {
        clearInterval(interval);
      }
  })

  return (
    <WatchlistContainer onClick={() => setDetailsVisible(!detailsVisible)}>
      <StockSymbol>Stock Symbol: {symbol}</StockSymbol>
      <StockInformation>Company Name: {company}</StockInformation>
      <StockInformation>
        Current Price: {price} {currency}
      </StockInformation>
      {detailsVisible && (
        <>
          <StockInformation>Exchange: {exchange}</StockInformation>
          <StockInformation>
            52 Week High: {high52} {currency}
          </StockInformation>
          <StockInformation>
            52 Week Low: {low52} {currency}
          </StockInformation>
        </>
      )}
    </WatchlistContainer>
  );
};

export default Watchlist;
