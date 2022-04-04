import React from 'react';
import './styles/update.css'
import Header from './Header';
import Content from './Content';
import { getTheme } from '@fluentui/react';
import { Provider, teamsTheme } from '@fluentui/react-northstar'


const theme = getTheme()

function App({ Component, pageProps }) {
  return (
    <Provider theme={teamsTheme}>
      <Header theme={theme}/>
      <Content theme={theme}/>
    </Provider>
  )
}

export default App

