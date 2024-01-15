import { useState, useEffect } from "react";
import { BiSolidPlaneAlt } from "react-icons/bi";
import Data from "./flights.csv";
import FlightsInfo from "./components/FlightsInfo";
import SearchFlights from "./components/SearchFlights";
import Papa from "papaparse";

function App() {

  const [data, setData] = useState([]);
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const filteredFlights = data.filter(item => {
      return (
        item.To.includes(destination) && item.From.includes(origin)
      )
    }
  )

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
    <div className="App container mx-auto mt-3 font-thin">
      <h1 className="text-5xl mb-3"><BiSolidPlaneAlt className="inline-block align-top" />Your Flights</h1>
      <SearchFlights origin={origin} destination={destination}
        onQueryChange={(origin, destination) => {
          setOrigin(origin);
          setDestination(destination);
          }}
        onDestinationChange={destination => setDestination(destination)} />
      <table className="table-auto text-center">
        <thead className="table-header-group bg-blue-400 border-2">
          <tr className="table-row">
            <th className="px-5 py-2">From</th>
            <th className="px-5 py-2">To</th>
            <th className="px-5 py-2">Flight Number</th>
            <th className="px-5 py-2">Departs</th>
            <th className="px-5 py-2">Arrives</th>
            <th className="px-5 py-2">Main Cabin Price</th>
            <th className="px-5 py-2">First Class Price</th>
          </tr>
        </thead>
        <tbody>
          {
            origin === "" && destination === "" ? data.map((flightData, index) => (
              <FlightsInfo key={index}
                flight={flightData}
              />
            )) : 
            filteredFlights.map((flightData, index) => (
              <FlightsInfo key={index}
                flight={flightData}
              />
            ))
          }
        </tbody>
      </table>
    </div>
  );
}

export default App;
