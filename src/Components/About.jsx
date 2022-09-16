import React from 'react';
import imge from './about.jpg';
import '../about.css';

const About = () => {
  return (
      <>
      <div className="aboutContainer">

        <div className="aboutImg">
           <img src={imge} alt="image" className="img-fluid" title="harsh"/> 
        </div>
        <div className="aboutText">
            <p>Welcome to the CryptoPedia app</p>
            <h1>Hey! this is <span className="text_clr">Atishay </span> and I am a <span className="text_clr">MERN</span> stack
                developer</h1>
            <a href="/"><button>Go Back</button></a>
        </div>
    </div></>
  )
}

export default About