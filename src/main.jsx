import React from 'react'
import ReactDOM from 'react-dom/client'

import 'bootstrap/dist/css/bootstrap.min.css';

import { Home } from './pages/home';


//import { Post } from './pages/Post';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Home />


  </React.StrictMode>,
)
