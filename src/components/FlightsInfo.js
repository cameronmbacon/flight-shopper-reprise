const FlightsInfo = ({flight}) => {
    return (
        <tr className="table-row even:bg-gray-100">
            <td>{flight.To}</td>
            <td>{flight.From}</td>
            <td>{flight.FlightNumber}</td>
            <td>{flight.Departs}</td>
            <td>{flight.Arrives}</td>
            <td>${flight.MainCabinPrice}.00</td>
            <td>${flight.FirstClassPrice}.00</td>
        </tr>
    )
}

export default FlightsInfo;