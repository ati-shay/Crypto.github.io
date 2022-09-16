import axios from "axios";
import { useEffect, useState } from "react";
import Plot from "react-plotly.js";
import { useParams } from "react-router-dom";
import { SingleCoin } from "../Config/api";
import { HistoricalChart } from "../Config/api";
import parse from "html-react-parser";
import milify from "millify";
import  "../ComponentCss/Coinid.css";
import Loading from "./Loading";

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const CoinId = () => {
  let { id } = useParams();
  // console.log(id);
  const [historicalData, setHistoricalData] = useState();
  const [days, setDays] = useState(1);
  const [coin, setCoin] = useState();
  const [loading, setLoading] = useState(false);


  const fetchCoin = async () => {
    setLoading(true);
    const { data } = await axios.get(SingleCoin(id));
    setCoin(data);
    setLoading(false);
  };
  console.log(coin);
  
  useEffect(() => {
    fetchCoin();
  }, []);

  const fetchHistoricalData = async () => {
    setLoading(true);
    const { data } = await axios.get(HistoricalChart(id, days, "USD"));
    setHistoricalData(data.prices);
    setLoading(false);
  };
  // console.log(historicalData);

  useEffect(() => {
    fetchHistoricalData();
  }, [days]);

  let xvalue = [];
  let yvalue = [];
  for (let i in historicalData) {
    let date = new Date(historicalData[i]["0"]);
    let time =
      date.getHours() > 12
        ? `${date.getHours() - 12}:${date.getMinutes()} PM`
        : `${date.getHours()}:${date.getMinutes()} AM`;
    let price = `$ ${historicalData[i]["1"]}`;

    if (days === 1) {
      xvalue.push(time);
    } else {
      xvalue.push(date);
    }
    yvalue.push(price);
  }
  // console.log(xvalue);
  // console.log(yvalue);

  // for select dropdown list
  const handleChange = (e) => {
    console.log(e.target.value);
    setDays(e.target.value);
  };

  
  return (
    <>
      {loading ? (
        <Loading></Loading>
      ) : (
        <div className="mainContainer">
          <div className="coinContainer ">
            <img
              style={{ width: "4rem", marginBottom: "5px", backgroundColor:"white", borderRadius:"50px",}}
              src={coin?.image?.large}
              alt={id}
            />
            <h5>Rank : {coin?.market_cap_rank}</h5>
            <div>
              <h5>Current Price : $
                {coin?.market_data?.current_price?.usd}
              </h5>
            </div>
            <h5>
              Market Cap : $
              {coin?.market_data?.market_cap?.usd}
            </h5>
          </div>

          <div className="graphcontainer">
            <div style={{
              display:"flex",
              padding:"2px",
              alignItems:"center",
            }}>
            <h1>Select Days</h1>
            <select style={{
              width:"7vw",
              height:"5vh",
              margin:"1rem",
              borderRadius:"10px",
            }} onChange={handleChange}>
              <option value="1">{days}</option>
              <option value="1">1</option>
              <option value="7">7</option>
              <option value="30">30</option>
              <option value="365">1 year</option>
              <option value="3650">10years</option>
            </select>
              </div>
            <div className="chartdiv">
              <Plot 
                data={[
                  {
                    x: xvalue,
                    y: yvalue,
                    type: "scatter",
                    mode: "lines+markers",
                    marker: { color: "#212529" },
                  },
                ]}
                layout={{ title: `Past ${days} days Plot`,width:1000, height:500}}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CoinId;
