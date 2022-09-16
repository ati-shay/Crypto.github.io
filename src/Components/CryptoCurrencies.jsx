import axios from "axios";
import React, { useEffect, useState } from "react";
import { CoinList } from "../Config/api";
import { useNavigate } from "react-router-dom";
import "../ComponentCss/Home.css";
import Loading from "./Loading";

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

let homeStyle = {
    backgroundColor: "rgb(219, 224, 226)",
  };

const CryptoCurrencies = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  
  const navigate = useNavigate();

  const fetchCoins = async () => {
    setLoading(true);
    const { data } = await axios.get(CoinList("USD"));
    setCoins(data);
    setLoading(false);
  };
  console.log(coins);

  useEffect(() => {
    fetchCoins();
  }, []);

  const handleSearch = () => {
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search)
    );
  };

  return (
    <>
      {loading ? (
        <Loading></Loading>
      ) : (
        <div className="container-fluid p-3" style={{
            minHeight:"84.2vh"
        }}>
            <div style={{
                display:"flex",
                alignItem:"center",
                justifyContent:"center",
                margin:"1rem 0"
            }}><h2 className="textCenter">All CryptoCurrencies</h2></div>
          <div className="d-flex justify-content-center">
            <input
              type="search"
              placeholder="Search for a Crypto Currency..."
              onChange={(e) => setSearch(e.target.value)}
              id="gsearch"
              name="gsearch"
              className="homeStyle"
              style={{
                padding:5,
                width:"30%",
              }}
            ></input>
          </div>
          <div className="row text-center">
            {handleSearch().map((coin, ind) => {
              

              let profit = coin.price_change_percentage_24h >= 0;
              return (
                <div className="col-10 col-md-3 mt-4"
                 key={coin?.id}
                 onClick={() => navigate(`/coins/${coin.id}`)}
                 >
                  <div className="card p-2 cardHover" style={homeStyle}>
                    <div className="d-flex flex-column containerCard">
                      <div className="d-flex  justify-content-between">
                        <h5>
                          {ind + 1}. {coin?.name} <span>({coin.symbol})</span>
                          <hr />
                        </h5>
                        <img src={coin?.image} width="75px" alt="" />
                      </div>
                      <div className="CoinDetails">
                        <p>
                          Price:{" "}
                          <span style={{ fontWeight: 700}}>
                            $ {numberWithCommas(coin?.current_price)}
                          </span>
                        </p>
                        <p>
                          PriceChange:{" "}
                          <span style={{ fontWeight: 700 }}>
                            {profit && "+"}{" "}
                            {coin?.price_change_percentage_24h?.toFixed(2)}%
                          </span>
                        </p>
                        <p>
                          Market Cap:{" "}
                          <span style={{ fontWeight: 700 }}>
                            ${" "}
                            {numberWithCommas(coin?.market_cap)
                              .toString()
                              .slice(0, -8)}
                            M
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default CryptoCurrencies;
