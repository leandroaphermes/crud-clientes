import React from 'react';

import PagesHome from './pages/Home/Home'

import { GlobalStyle } from './styles/GlobalStyle'
import { Reset } from './styles/Reset'

function App() {
  return (
    <>
      <Reset />
      <GlobalStyle />
      <PagesHome />
    </>
  );
}

export default App;
