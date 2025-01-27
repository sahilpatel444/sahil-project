import React from "react";
import "./App.css";
import Header from "./Components/Header.js";
import Newsapp from "./Components/Newsapp.js";
import Notes from "./Components/Noteapp/noteapp.js";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Search from "./Components/Weatherapp/Search.js";
import { InputProvider } from "./Context/inputContext.js";
import HomePage from "./Components/MovieSearchapp/HomePage.js";
import Login from "./Components/Login/login.js"
import { GoogleOAuthProvider } from "@react-oauth/google";
import Home from "./Components/Home.js";
import Downloader from "./Components/VideoDownload/Downloader.js";
import { Analytics } from '@vercel/analytics/react';

function App() {
  const clientId = "571743621526-3lpmovu7hm9i31o7chqsa60vt7ikd3a6.apps.googleusercontent.com";
  return (
    <>
      <BrowserRouter>
        <InputProvider>
        <GoogleOAuthProvider clientId={clientId}>
            <Analytics />
            <Header />
     
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/news" element={<Newsapp />} />
            <Route path="/notes" element={<Notes />} />
            <Route path="/weather" element={<Search />} />
            <Route path="/movie" element={<HomePage/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/downloader" element={<Downloader/>}/>
          
          </Routes>
       </GoogleOAuthProvider>
        </InputProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
