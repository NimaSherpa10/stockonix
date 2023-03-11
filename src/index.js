import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import SecondPage from './components/secondpage/secondpage';
import DisplayWidget from './components/widget/DisplayWidget';
import { CookiesProvider } from 'react-cookie';

// File imports for testing


// Declares the root of the 
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <CookiesProvider>
  <BrowserRouter>
  <React.StrictMode>
    <Routes>
    <Route path = "/" element = {<DisplayWidget />} />
    <Route path = "/secondpage" element = {<SecondPage /> } />
    </Routes>
  </React.StrictMode>
  </BrowserRouter>
  </CookiesProvider>

);