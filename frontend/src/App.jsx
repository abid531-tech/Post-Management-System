import React, { useState } from 'react';
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Createnewpost from './pages/Createnewpost';
import Editpost from './pages/Editpost';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Create-new-post" element={<Createnewpost />} />
        <Route path="/edit-post/:id" element={<Editpost />} />
      </Routes>
    </>
  );
}

export default App;
