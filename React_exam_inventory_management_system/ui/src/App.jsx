import React from "react";

import Addinventory from "./components/Addinventory";
import Viewinventory from "./components/Viewinventory";


import { BrowserRouter, Routes, Route} from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Addinventory />} />

        <Route path="/getinventory" element={<Viewinventory />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
