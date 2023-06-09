import { Route, Routes } from "react-router-dom";
import "./App.css";
import Pomodoro from "./components/pomodoro";
import Layout from "./components/Layout";

import Break from "./components/break";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Pomodoro />} />
          <Route path="break" element={<Break />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
