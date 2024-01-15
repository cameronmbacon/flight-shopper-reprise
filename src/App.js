import { useState, useEffect } from "react";
import { BiSolidPlaneAlt } from "react-icons/bi";
import Data from "./flights.csv";
import FlightsInfo from "./components/FlightsInfo";
import SearchFlights from "./components/SearchFlights";
import SortableHeader from "./components/SortableHeader";
import Papa from "papaparse";

function App() {
  const [data, setData] = useState([]);
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [sortBy, setSortBy] = useState("Depart");
  const [orderBy, setOrderBy] = useState("asc");
  const flightHeaders = ["From", "To", "FlightNumber", "Departs", "Arrives", "MainCabinPrice", "FirstCabinPrice"];

  const filteredFlights = data.filter(item => {
      return (
        item.To.includes(destination) && item.From.includes(origin)
      )
    }
  ).sort((a, b) => {
    let order = (orderBy === "asc") ? 1 : -1;
    return (
      a[sortBy] < b[sortBy] ? -1 * order : 1 * order
    )
  })

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
      <table className="table-auto text-center min-w-fit">
        <thead className="table-header-group bg-green-400 border-2 flex-nowrap">
          <tr className="flex flex-row flex-nowrap items-center justify-center">
            {
              flightHeaders.map((header, index) => {
                return <SortableHeader key={index}
                flightHeader={header}
                orderBy={orderBy}
                setOrderBy={setOrderBy}
                setSortBy={setSortBy} />
              })
            }
          </tr>
        </thead>
        <tbody>
          {
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