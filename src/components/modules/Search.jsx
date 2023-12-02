import { useEffect, useState } from "react";
import { RotatingLines } from "react-loader-spinner";

import { searchCoin } from "../../services/criptoApis";
import styles from "./Search.module.scss";

function Search({ currency, setCurrency }) {
  const [text, setText] = useState("");
  const [coins, setCoins] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    if (!text) {
      setIsLoading(false);
      return;
    }
    setCoins([]);
    const searchCoins = async () => {
      try {
        const resp = await fetch(searchCoin(text), {
          signal: controller.signal,
        });
        const json = await resp.json();
        if (json.coins) {
          console.log(json.coins);
          setCoins(json.coins);
          setIsLoading(false);
        } else {
          alert(json.status.error_message);
        }
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        if (error.name !== "AbortError") {
          alert(error.message);
        }
      }
    };
    setIsLoading(true);
    searchCoins();
    return () => controller.abort();
  }, [text]);
  return (
    <div className={styles.searchBox}>
      <input
        type="text"
        placeholder="Search"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
        <option value="usd">USD</option>
        <option value="eur">EUR</option>
        <option value="jpy">JPY</option>
      </select>
      {(!!coins.length || isLoading) && (
        <div className={styles.searchResult}>
          {isLoading && (
            <RotatingLines
              width="50px"
              height="50px"
              strokeColor="#3874ff"
              strokeWidth="2"
            />
          )}
          <ul>
            {coins.map((item) => (
              <li key={item.id}>
                <img src={item.thumb} alt={item.name} />
                <p>{item.name}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Search;
