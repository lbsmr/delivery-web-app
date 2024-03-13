import React from 'react'
import './App.css'
import axios from 'axios'
import {AuthContextProvider} from './context/Context';
import Router from './Router';

axios.defaults.withCredentials = true;
axios.defaults.headers.get['Access-Control-Allow-Origin'] = '*';

function App() {

  return (
    <AuthContextProvider>
      <Router/>
    </AuthContextProvider>
  )
}

export default App
