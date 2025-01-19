import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { HeroUIProvider } from "@heroui/react"
import { store } from "./store";
import { Provider } from "react-redux";
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider as NextThemesProvider } from "next-themes";
ReactDOM.createRoot(document.getElementById('root')).render(


  <Provider store={store}>
    <BrowserRouter>
      <HeroUIProvider>
        <NextThemesProvider attribute="class" defaultTheme="dark">
          <main className="dark text-foreground">
            <App />
          </main>
        </NextThemesProvider>
      </HeroUIProvider>
    </BrowserRouter>
  </Provider>
  ,
)
