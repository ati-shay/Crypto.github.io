import axios from "axios";
import React, { useEffect, useState } from "react";
import { CoinList } from "../Config/api";
import "../ComponentCss/Home.css";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const Home = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const fetchCoins = async () => {
    setLoading(true);
    const { data } = await axios.get(CoinList("USD"));
    setCoins(data);
    setLoading(false);
  };
  // console.log(coins);

  useEffect(() => {
    fetchCoins();
  }, []);

  // For news dispaly

  const [news, setNews] = useState([]);

  const url =
    "https://newsapi.org/v2/everything?q=cryptocurrencies&apiKey=1ef9fbc4146c4e73a659e218f25c36d8";

  const fetchNews = async () => {
    const { data } = await axios.get(url);
    setNews(data.articles);
  };
  console.log(news);

  useEffect(() => {
    fetchNews();
  }, []);

  let homeStyle = {
    backgroundColor: "rgb(219, 224, 226)",
  };
  let ParaStyle = {
    fontWeight: 700,
    fontFamily: "Ubuntu",
  };
  return (
    <>
      {loading ? (
        <Loading></Loading>
      ) : (
        <>
          <div
            className="container-fluid p-3"
            style={{
              minHeight: "84.2vh",
            }}
          >
            <h2 className="textCenter ">Trending Crypto Currencies</h2>
            <div className="row text-center">
              {coins.slice(0, 8).map((coin, ind) => {
                let profit = coin.price_change_percentage_24h >= 0;
                return (
                  <div
                    className="col-10 col-md-3 mt-4 "
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
                          <img src={coin?.image} width="75px" alt=".." />
                        </div>
                        <div className="CoinDetails">
                          <p>
                            Price:{" "}
                            <span style={{ fontWeight: 700 }}>
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

          <div
            className="container-fluid p-3"
            style={{
              minHeight: "84.2vh",
            }}
          >
            <h2 className="textCenter ">Latest Crypto News</h2>
            <div className="row text-center">
              {news.slice(0, 9).map((coin, ind) => {
                return (
                  <div className="col-10 col-md-4 mt-4 " key={ind}>
                    <a
                      rel="noreferrer"
                      style={{
                        color: "black",
                        textDecoration: "none",
                      }}
                      target="_blank"
                      href={coin?.url}
                    >
                      <div className="card p-2 cardHover" style={homeStyle}>
                        <div className="card">
                          <img
                            src={coin.urlToImage}
                            className="card-img-top"
                            alt={coin.source.name}
                          />
                          <div className="card-body">
                            <h5
                              className="card-title"
                              style={{
                                textAlign: "left",
                              }}
                            >
                              {coin.title}
                            </h5>
                            <p
                              className="card-text"
                              style={{
                                textAlign: "left",
                              }}
                            >
                              {coin.description}..
                              <a
                                rel="noreferrer"
                                target="_blank"
                                href={coin?.url}
                              >
                                Read more
                              </a>
                            </p>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                // justifyContent: "flex-start",
                                alignItems: "flex-start",
                              }}
                            >
                              <p style={ParaStyle}>
                                Author:{" "}
                                <span>
                                  {coin.author === null ? "Me" : coin.author}
                                </span>
                              </p>
                              <p style={ParaStyle}>
                                Published On:{" "}
                                <span>{coin.publishedAt.slice(0, 10)}</span>
                              </p>
                              <p style={ParaStyle}>
                                Source : <span>{coin.source.name}</span>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </a>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Home;
