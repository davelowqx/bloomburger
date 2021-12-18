## About

A Bloomberg Terminal costs about $2000 a month, and since I'm a broke college student I decided to build my own.

Of course I won't be able to replicate the complete feature set offered by Bloomberg, so I decided to focus on these few:

- Chart Lists
  - provide a macro view of the markets
- Comps
  - quickly screen for useful valuation metrics, such as Price to Sales and Price to Earnings
- ADR Charts
  - since ADRs trade in 2 separate sessions every day (eg $BABA trades US and HK), I thought it would be useful to chart them together, adjusted for the exchange rate and conversion ratio

### Built With

- [Next.js](https://nextjs.org/)
- [Bootstrap](https://getbootstrap.com)
- [Lightweight Charts](https://www.tradingview.com/HTML5-stock-forex-bitcoin-charting-library/)
- [React Table](https://react-table.tanstack.com/)

## Roadmap

- Add Indices/ETFs constituents and have them updated via API calls

## License

Distributed under the GPL License.

## Acknowledgements

Data from Yahoo Finance

Design inspired by Bloomberg
