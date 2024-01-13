import { useState, useEffect } from "react";
import Data from "./flights.csv";
import Papa from "papaparse";

function App() {

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(Data);
      const reader = response.body.getReader();
      const result = await reader.read();
      const decoder = new TextDecoder("utf-8");
      const csvData = decoder.decode(result.value);
      const parsedData = Papa.parse(csvData, {
        header: true,
        skipEmptyLines: true
      }).data;
      setData(parsedData);
    };
    fetchData();
  }, []);

  return (
    <div className="App">
      <h1>Your Flights</h1>
      {JSON.stringify(data)}
    </div>
  );
}

export default App;
