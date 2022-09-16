import axios from "axios";
import React, { useEffect, useState } from "react";
import Loading from "./Loading";
import "../ComponentCss/News.css";

const News = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);

  const url =
    "https://newsapi.org/v2/everything?q=cryptocurrencies&apiKey=1ef9fbc4146c4e73a659e218f25c36d8";

  const fetchNews = async () => {
    setLoading(true);
    const { data } = await axios.get(url);
    setNews(data.articles);
    setLoading(false);
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
        <div
          className="container-fluid p-3"
          style={{
            minHeight: "84.2vh",
          }}
        >
          <h2 className="textCenter ">Crypto Market News</h2>
          <div className="row text-center">
            <h1 className="heading">
              <span className="badge badge-secondary">Breaking News !!</span>
            </h1>
            {news.map((coin, ind) => {
              return (
                <>
                  <div className="newsContainer">
                    <h1></h1>
                    <div className="newscard">
                      <div>
                      <img
                        className="card-img-top"
                        src={coin.urlToImage}
                        alt="Card image cap"
                        />
                        </div>
                      <div className="card-body">
                        <h5 className="card-title">{coin.title}</h5>
                        <p className="card-text">
                          {coin.description}..
                          <a
                            rel="noreferrer"
                            target="_blank"
                            href={coin?.url}
                            className="btn btn-primary"
                          >
                            Read more
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>
                </>
                // <div className="col-10 col-md-3 mt-4 " key={ind}>
                //   <a
                //     rel="noreferrer"
                //     style={{
                //       color: "black",
                //       textDecoration: "none",
                //     }}
                //     target="_blank"
                //     href={coin?.url}
                //   >
                //     <div className="card p-2 cardHover" style={homeStyle}>
                //       <div className="card">
                //         <img
                //           src={coin.urlToImage}
                //           className="card-img-top"
                //           alt={coin.source.name}
                //         />
                //         <div className="card-body">
                //           <h5
                //             className="card-title"
                //             style={{
                //               textAlign: "left",
                //             }}
                //           >
                //             {coin.title}
                //           </h5>
                //           <p
                //             className="card-text"
                //             style={{
                //               textAlign: "left",
                //             }}
                //           >
                //             {coin.description}..
                //             <a
                //               rel="noreferrer"
                //               target="_blank"
                //               href={coin?.url}
                //             >
                //               Read more
                //             </a>
                //           </p>
                //           <div
                //             style={{
                //               display: "flex",
                //               flexDirection: "column",
                //               // justifyContent: "flex-start",
                //               alignItems: "flex-start",
                //             }}
                //           >
                //             <p style={ParaStyle}>
                //               Author:{" "}
                //               <span>
                //                 {coin.author === null ? "Me" : coin.author}
                //               </span>
                //             </p>
                //             <p style={ParaStyle}>
                //               Published On:{" "}
                //               <span>{coin.publishedAt.slice(0, 10)}</span>
                //             </p>
                //             <p style={ParaStyle}>
                //               Source : <span>{coin.source.name}</span>
                //             </p>
                //           </div>
                //         </div>
                //       </div>
                //     </div>
                //   </a>
                // </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default News;
