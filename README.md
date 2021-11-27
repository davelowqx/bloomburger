## About

A Bloomberg Terminal subscription costs $2000 a month, and since I'm a broke college student I decided to build my own.

Of course I'll not be able to actually replicate the complete feature set offered by Bloomberg, so I decided to focus on these few:

- Candlestick Charts, Bloomberg style
- Chart Lists
  - provide a broad overview of the markets
- Indices/ETF components
  - to view the components of the major Indices/ETFs and other useful details
- Comps
  - a table displaying commonly quoted valuation metrics, such as P/S, P/E, P/FCF
- ADR Charts
  - since ADRs trade in 2 separate sessions (eg $BABA trades US and HK), I thought it would be useful to chart them combined, adjusted for the exchange rate and conversion ratio

### Built With

- [Next.js](https://nextjs.org/)
- [React.js](https://reactjs.org/)
- [Bootstrap](https://getbootstrap.com)
- [Lightweight Charts](https://www.tradingview.com/HTML5-stock-forex-bitcoin-charting-library/)
- [React Table](https://react-table.tanstack.com/)

## Roadmap

- Add ability to save watchlists
- Add more Indices/ETFs and have them updated via API calls
- Anything else that pops in my mind

## Contributing

Feel free to open PRs to add to the application.

## License

Distributed under the GPL License.

## Acknowledgements

Data from Yahoo Finance
Design inspired by Bloomberg
