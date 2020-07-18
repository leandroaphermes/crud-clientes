import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { 
  BrowserRouter as Router, 
  Route, 
  Switch 
} from "react-router-dom";

import PagesHome from './pages/Home/Home'

import { GlobalStyle } from './styles/GlobalStyle'
import { Reset } from './styles/Reset'

function App() {
  return (
    <Router>
      <Reset />
      <GlobalStyle />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Switch>
        <Route exact  path="/" component={PagesHome} />
        <Route exact  path="/:searchRouter" component={PagesHome} />
      </Switch>
    </Router>
  );
}

export default App;
