const BASE_URL = "https://api.coingecko.com/api/v3";
const API_Key = "CG-UcyE1BV5sfG5zScpuvs2jPnn";

const getCoinList = (page, currency) =>
  `${BASE_URL}/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=20&page=${page}&x_cg_demo_api_key=${API_Key}`;

const searchCoin = (search) =>
  `${BASE_URL}/search?query=${search}&x_cg_demo_api_key=${API_Key}`;

const marketChart = (coin) =>
  `${BASE_URL}/coins/${coin}/market_chart?vs_currency=usd&days=7&x_cg_demo_api_key=${API_Key}`;

export { getCoinList, searchCoin, marketChart };
