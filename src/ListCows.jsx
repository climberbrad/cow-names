import {useEffect, useState} from "react";
import Cow from './Cow'

const ListCows = () => {
    const [allCows, setAllCows] = useState([])
    const [cowNames, setCowNames] = useState([])

    useEffect(() => {
        fetchCows()
    }, [])

    async function fetchCows() {
        const res = await fetch(`data.json`);
        const json = await res.json();
        setCowNames(json.cows);
        setAllCows(json.cows);
    }

    function searchCows(searchTerm) {
        setCowNames(allCows)
        if (searchTerm == null || searchTerm.length === 0) {
            setCowNames(allCows)
        } else {
            let results = allCows.filter((cow) => cow.name.toLowerCase().search(searchTerm.toLowerCase()) !== -1)
            if (results.length === 0) {
                results = allCows.filter((cow) => cow.id.search(searchTerm) !== -1)
            }
            if (results.length === 0) {
                results = allCows.filter((cow) => cow.finder.toLowerCase().search(searchTerm.toLowerCase()) !== -1)
            }
            setCowNames(results)
        }
    }

    return (
        <div className="flex flex-col">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                            <tr>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Name
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    ID
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Date Named
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Named By
                                </th>
                                <th scope="col"
                                    className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    <form onSubmit={e => {
                                        e.preventDefault();
                                    }}>
                                        <label>Search:&nbsp;</label>
                                        <input name="search" onChange={(e) => searchCows(e.target.value)}/>
                                    </form>
                                </th>
                            </tr>
                            </thead>
                            {(cowNames && cowNames?.length > 0) && (
                                <tbody className="bg-white divide-y divide-gray-200">
                                {cowNames.map((cow) => (
                                    <Cow key={cow.id} id={cow.id} name={cow.name} image={cow.image} finder={cow.finder}
                                         date={cow.date}/>))}
                                </tbody>
                            )}
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ListCows;