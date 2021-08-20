import {SearchIcon} from '@heroicons/react/solid'
import {useEffect, useState} from "react";
import ListCows from "./ListCows";
import SlidingPane from "react-sliding-pane";
import CowDetails from "./CowDetails";


const TheFarm = () => {
    const [sidePanel, setSidePanel] = useState({
        isPaneOpen: false,
        isPanelOpenLeft: false,
        hideHeader: true
    })

    const [allCows, setAllCows] = useState([])
    const [cowNames, setCowNames] = useState([])

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

    async function saveCow(cow) {
        if (cow.id) {
            console.log("SAVE", cow);
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
        console.log("SAVED!");
        await fetchCows()
    }


    return (
        <div className="min-h-screen bg-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="relative flex justify-between xl:grid xl:grid-cols-12 lg:gap-8">
                    <div className="flex md:absolute md:left-0 md:inset-y-0 lg:static xl:col-span-2">
                        <div className="flex-shrink-0 flex items-center">
                            <a href="#">
                                <img
                                    className="block h-8 w-auto"
                                    src="https://tailwindui.com/img/logos/workflow-mark.svg?color=blue&shade=600"
                                    alt="Workflow"
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
                                () => setSidePanel({isPaneOpen: true})
                            }
                            className="ml-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            New Cow
                        </a>
                    </div>
                </div>
            </div>
            <ListCows cowNames={cowNames} saveCow={saveCow}/>
            <SlidingPane
                style={{width : 50}}
                overlayClassName="some-custom-overlay-class"
                isOpen={sidePanel.isPaneOpen}
                title="New Cow"
                subtitle={new Date().toLocaleDateString()}
                onRequestClose={() => {
                    // triggered on "<" on left top click or on outside click
                    setSidePanel({isPaneOpen: false});
                }}
            >
                <CowDetails cow={null} saveCow={saveCow} setSidePanel={setSidePanel}/>
            </SlidingPane>

        </div>
    )
}
export default TheFarm;