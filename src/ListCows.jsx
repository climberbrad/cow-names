import {useEffect, useState} from "react";
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";
import CowRow from './CowRow';

const ListCows = () => {
    const [allCows, setAllCows] = useState([])
    const [cowNames, setCowNames] = useState([])

    useEffect(() => {
        fetchCows()
    }, [])

    async function fetchCows() {
        const res = await fetch('http://localhost:8080/v0/cows');

        if (!res.ok) {
            console.error(`Error encountered ${res.error()}`);
            throw new Error(res.error)
        }

        const json = await res.json();
        setCowNames(json);
        setAllCows(json);
    }

    function searchCows(searchTerm) {
        setCowNames(allCows)
        const search = searchTerm.toLowerCase().trim()

        if (search == null || searchTerm.length === 0) {
            setCowNames(allCows)
        } else {
            let results = allCows.filter((cow) => cow.name.toLowerCase().startsWith(search))
            if (results.length === 0) {
                results = allCows.filter((cow) => cow.id.toLowerCase().startsWith(search))
            }
            if (results.length === 0) {
                results = allCows.filter((cow) => cow.finder.toLowerCase().startsWith(search))
            }
            setCowNames(results)
        }
    }

    async function saveCow(cow) {
        if (cow.id) {
            console.log("SAVE", cow)
            const requestOptions = {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    {
                        name: cow.name,
                        id: cow.id,
                        date: cow.date,
                        image: cow.image,
                        finder: cow.finder
                    })
            };
            const resp = await fetch('http://localhost:8080/v0/cows', requestOptions);
            if (!resp.ok) {
                console.error(`Error encountered`);
            }
        }
        await fetchCows()
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
                                        <label
                                            className="px-2 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Search</label>
                                        <input
                                            className="outline-none border border-gray-400 rounded-md shadow-sm divide-y divide-gray-500"
                                            name="search" onChange={(e) => searchCows(e.target.value)}/>
                                    </form>
                                </th>
                            </tr>
                            </thead>
                            {(cowNames && cowNames?.length > 0) && (
                                <tbody className="bg-white divide-y divide-gray-200">
                                {cowNames.map((cow) => (
                                    <CowRow key={cow.id} cow={cow} saveCow={saveCow}/>
                                ))}
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