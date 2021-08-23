import {SearchIcon} from '@heroicons/react/solid'
import {useState,} from "react";
import {useQuery} from 'react-query';
import ListCows from "./ListCows";
import SideBarDetail from "./SideBarDetail";

const fetchData = async () => {
    const res = await fetch('http://localhost:8080/v0/cows');
    return res.json();
}

const TheFarm = () => {
    const [open, setOpen] = useState(false)
    const {data, status, error} = useQuery('cows', fetchData)
    const [searchResults, setSearchResults] = useState([])

    function searchCows(searchTerm) {
        setSearchResults(data)
        const search = searchTerm.toLowerCase().trim()

        if (search == null || search.length === 0) {
            setSearchResults(data)
        } else {
            let results = data.filter((cow) => cow.name.toLowerCase().startsWith(search))
            if (results.length === 0) {
                results = data.filter((cow) => cow.id.toLowerCase().startsWith(search))
            }
            if (results.length === 0) {
                results = data.filter((cow) => cow.finder.toLowerCase().startsWith(search))
            }
            setSearchResults(results)
        }
    }

    return (
        <div className="min-h-screen bg-blue-500">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="relative flex justify-between xl:grid xl:grid-cols-12 lg:gap-8">
                    <div className="flex md:absolute md:left-0 md:inset-y-0 lg:static xl:col-span-2">
                        <div className="flex-shrink-0 flex items-center">
                            <a href="#">
                                <img
                                    className="block h-12 w-auto "
                                    src="barn.png"
                                    alt="The Farm"
                                />
                            </a>
                        </div>
                    </div>
                    <div className="min-w-0 flex-1 md:px-8 lg:px-0 xl:col-span-6">
                        <div
                            className="flex items-center px-6 py-4 md:max-w-3xl md:mx-auto lg:max-w-none lg:mx-0 xl:px-0">
                            <div className="w-full">
                                <label htmlFor="search" className="sr-only">
                                    Search
                                </label>
                                <div className="relative">
                                    <div
                                        className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                                        <SearchIcon className="h-5 w-5 text-gray-400" aria-hidden="true"/>
                                    </div>
                                    <input
                                        id="search"
                                        name="search"
                                        className="block w-full bg-white border border-gray-300 rounded-md py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:outline-none focus:text-gray-900 focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                        placeholder="Search"
                                        type="search"
                                        onChange={(e) => searchCows(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center md:absolute md:right-0 md:inset-y-0 lg:hidden">
                    </div>
                    <div className="hidden lg:flex lg:items-center lg:justify-end xl:col-span-4">
                        <a
                            onClick={
                                () => setOpen(true)
                            }
                            className="ml-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-600"
                        >
                            New Cow
                        </a>
                    </div>
                </div>
            </div>

            {status == 'loading' && (
                <div>loading...</div>
            )}

            {status == 'error' && (
                <div>Error fetching data {error}</div>
            )}

            {status == 'success' && (
                <div>
                    <ListCows cowNames={searchResults}/>
                    <SideBarDetail setOpen={setOpen} open={open}/>
                </div>
            )}
        </div>
    )
}
export default TheFarm;