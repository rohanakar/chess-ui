import React, { createContext, useContext, useEffect, useState } from 'react';
import './App.css';
import Main from './screen/Main';
import Provider from './redux/AppProvider';
function App() {
  return (
    <Provider>
      <Main/>
    </Provider>
  );
}

export default App;
