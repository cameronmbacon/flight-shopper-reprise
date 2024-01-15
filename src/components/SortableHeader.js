import { BiCaretUp, BiCaretDown } from "react-icons/bi";

const SortableHeader = ({ flightHeader, orderBy, setSortBy, setOrderBy }) => {
    return (
        <th className="px-5 py-1 text-center flex flex-row items-center">
            <div className="pr-1">{flightHeader}</div>
            <div className="pl-1">
            <BiCaretUp 
                className={`${orderBy === "asc" ? 'text-black-500' : 'text-gray-500'}`} 
                onClick={() => {setSortBy(flightHeader); setOrderBy("asc")}} />
            <BiCaretDown 
                className={`${orderBy === "desc" ? 'text-black-500' : 'text-gray-500'}`} 
                onClick={() => {setSortBy(flightHeader); setOrderBy("desc")}} />
            </div>
        </th>
    )
}

export default SortableHeader;