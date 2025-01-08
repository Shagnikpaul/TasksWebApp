import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { NextUIProvider } from '@nextui-org/react'
import { store } from "./store";
import { Provider } from "react-redux";
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider as NextThemesProvider } from "next-themes";
ReactDOM.createRoot(document.getElementById('root')).render(


  <Provider store={store}>
    <BrowserRouter>
      <NextUIProvider>
        <NextThemesProvider attribute="class" defaultTheme="dark">
          <main className="dark text-foreground">
            <App />
          </main>
        </NextThemesProvider>
      </NextUIProvider>
    </BrowserRouter>
  </Provider>
  ,
)
