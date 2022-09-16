import React from 'react'

const Footer = () => {
  let footerStyle={
    position: "fixed",
    height:"8vh",
    bottom:"0",
    width: "100%",
  }
  let divStyle={
    height:"8vh",
    // backgroundColor:"red"
  }
  return (
    <div style={divStyle}>
    <footer className='bg-dark text-light py-3' style={footerStyle}>
      <p className='text-center'>&copy; CryptoPedia.com</p>
      </footer>
      </div>
  )
}

export default Footer