import React from 'react';
import './styles/update.css'
import Header from './Header';
import Content from './Content';
import Footer from './Footer'
import './custom.scss';
import Stages from './Stages';

function App({ Component, pageProps }) {
  return (
    <>
      <Header />
      <Content />
      <Footer />
      {/* <Header />
      <Body />
      <Footer /> */}
    </>
  )
}

export default App

