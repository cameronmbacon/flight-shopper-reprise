const FlightsInfo = ({flight}) => {
    return (
        <tr className="pl-4 even:bg-gray-100 flex flex-row text-left">
            <td className="w-full">{flight.From}</td>
            <td className="w-full">{flight.To}</td>
            <td className="w-full">{flight.FlightNumber}</td>
            <td className="w-full">{flight.Departs}</td>
            <td className="w-full">{flight.Arrives}</td>
            <td className="w-full">${flight.MainCabinPrice}.00</td>
            <td className="w-full">${flight.FirstClassPrice}.00</td>
        </tr>
    )
}

export default FlightsInfo;