import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from './Components/Header';
import Home from './Components/Home';
import Footer from './Components/Footer';
import About from './Components/About';
import News from './Components/News';
import CryptoCurrencies from './Components/CryptoCurrencies';
import CoinId from './Components/CoinId';

function App() {
  let bodyStyle={
    backgroundColor:"rgb(219, 224, 226)",
  }

  return (
    <Router>
        <Header></Header>

        <div style={bodyStyle}>
        <Routes>
          <Route  exact path="/" element={<Home/>} />
          <Route  exact path="/about" element={<About/>} />
          <Route  exact path="/news" element={<News/>} />
          <Route  exact path="/cryptoCurrencies" element={<CryptoCurrencies/>} />
          <Route  exact path="/coins/:id" element={<CoinId/>} />
        </Routes>
        </div>

        <Footer></Footer>
    </Router>
  );  
}

export default App;
