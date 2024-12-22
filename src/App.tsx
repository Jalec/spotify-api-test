import { useEffect, useState } from "react";
import "./App.css";
import Callback from "./components/Callback";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Default from "./pages/Default";
import TopTracks from "./pages/TopTracks";
import ContentSelector from "./pages/ContentSelector";
import Player from "./pages/Player";
import { Bingo } from "./pages/Bingo";
import { ProtectedRoutes } from "./utils/ProtectedRoutes";
import { useUserDataStore } from "./store/userData";

function App() {
  const fetchUserData = useUserDataStore((state) => state.fetchUserData);

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <Routes>
            <Route path="/" element={<Default />} />
            <Route path="/callback" element={<Callback />} />
            <Route element={<ProtectedRoutes />}>
              <Route path="/content" element={<ContentSelector />} />
              <Route path="/player" element={<Player />} />
              <Route path="/bingo" element={<Bingo />} />
            </Route>
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
