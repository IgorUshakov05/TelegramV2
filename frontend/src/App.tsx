import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ModalProvider from "./Components/Modal/ModalProvider";
import CallPage from "./pages/Call";
import CallPageNotFound from "./pages/Call_404";

function App() {
  return (
    <>
      <ModalProvider />
      <main className="vh-100 min-vh-100">
        <Routes>
          <Route element={<Index />} path="/" index />
          <Route element={<CallPageNotFound />} path="/call/404" />
          <Route element={<CallPage />} path="/call/:id" />
        </Routes>
      </main>
    </>
  );
}

export default App;
