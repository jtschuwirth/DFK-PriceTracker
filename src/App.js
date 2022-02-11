// eslint-disable-next-line
import React, { useState, useEffect } from "react";
import Header from "./Components/Header";
import Items from "./Components/Items";
import Alchemist from "./Components/Alchemist";

function App() {
    const [PriceList, setPriceList] = useState([]);
    const [JewelOne, setJewelOne] = useState(0);
    const [JewelUSD, setJewelUSD] = useState(0);
    return (
      <div className="App">
          <Header />
          <Items 
          PriceList={PriceList}
          setPriceList={setPriceList}
          JewelOne={JewelOne}
          setJewelOne={setJewelOne}
          JewelUSD={JewelUSD}
          setJewelUSD={setJewelUSD}
          />
          <Alchemist />
      </div>
    );
}

export default App;
