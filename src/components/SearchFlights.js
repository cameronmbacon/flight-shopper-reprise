import { useState, useEffect } from "react";
import Papa from "papaparse";
import Data from "../airports.csv";

function SearchFlights({ onQueryChange }) {
    const [data, setData] = useState([]);
    const [origin, setOrigin] = useState("");
    const [destination, setDestination] = useState("");

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
        <div>
          <div>
            <label htmlFor="selectedOrigin">From: </label>
            <select name="selectedOrigin" defaultValue={""} onChange={(e) => setOrigin(e.target.value)}>
                {data.map((airportData, index) =>
                    <option key={index} value={airportData.Code}>{airportData.Name}</option>
                )}
            </select>
          </div>
          <div>
            <label htmlFor="selectedDestination">To: </label>
            <select name="selectedDestination" defaultValue={""} onChange={(e) => setDestination(e.target.value)}>
                {data.map((airportData, index) =>
                    <option key={index} value={airportData.Code}>{airportData.Name}</option>
                )}
            </select>
          </div>
          <button onClick={() => onQueryChange(origin, destination)}>Search Flights</button>
          <button onClick={() => onQueryChange("", "")}>Show All Flights</button>
        </div>
    )
}

export default SearchFlights;