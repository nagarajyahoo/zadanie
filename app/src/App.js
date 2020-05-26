import React from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter} from "react-router-dom";
import AppLayout from "./components/AppLayout";

function App() {
  return (
      <BrowserRouter>
        <div>
          <AppLayout/>
        </div>
      </BrowserRouter>
  );
}

export default App;
