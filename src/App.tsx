import React from 'react';
import './App.css';
import AppRoutes from './appRoutes';
import { KeepContextProvider } from './context';
import { LabelContextProvider } from './context/LabelContext';
import { SearchContextProvider } from './context/SearchContext';

function App() {
  return (
    <SearchContextProvider>
      <LabelContextProvider>
        <KeepContextProvider>
          <div style={{color: "#5f6368"}} className="App">
            <AppRoutes />
          </div>
        </KeepContextProvider>
      </LabelContextProvider>
    </SearchContextProvider>
  );
}

export default App;
