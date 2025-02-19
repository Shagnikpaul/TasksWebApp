import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { HeroUIProvider } from "@heroui/react"
import { store } from "./store";
import { Provider } from "react-redux";
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider as NextThemesProvider } from "next-themes";

const theme = sessionStorage.getItem("theme");
const root = document.getElementById("root");
if (theme === "dark") {

  root.classList.remove("light-bg");
  root.classList.add("dark-bg");
}
else {
  root.classList.remove("dark-bg");
  root.classList.add("light-bg");
}


ReactDOM.createRoot(document.getElementById('root')).render(


  <Provider store={store}>
    <BrowserRouter>
      <HeroUIProvider>
        <NextThemesProvider attribute="class" defaultTheme={theme}>
          <main className={`${theme} text-foreground`}>
            <App />
          </main>
        </NextThemesProvider>
      </HeroUIProvider>
    </BrowserRouter>
  </Provider>
  ,
)
