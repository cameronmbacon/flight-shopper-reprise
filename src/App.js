import { useState, useEffect } from "react";
import Data from "./flights.csv";
import FlightsInfo from "./components/FlightsInfo";
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
      <table>
        <thead>
          <tr>
            <th>From</th>
            <th>To</th>
            <th>Flight Number</th>
            <th>Departs</th>
            <th>Arrives</th>
            <th>Main Cabin Price</th>
            <th>First Class Price</th>
          </tr>
        </thead>
        <tbody>
          {data.map((flightData, index) => (
            <FlightsInfo key={index}
              flight={flightData}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
