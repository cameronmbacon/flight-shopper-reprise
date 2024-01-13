const FlightsInfo = ({flight}) => {
    return (
        <tr>
            <td>{flight.To}</td>
            <td>{flight.From}</td>
            <td>{flight.FlightNumber}</td>
            <td>{flight.Departs}</td>
            <td>{flight.Arrives}</td>
            <td>{flight.MainCabinPrice}</td>
            <td>{flight.FirstClassPrice}</td>
        </tr>
    )
}

export default FlightsInfo;