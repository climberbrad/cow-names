import {useState} from "react";

const CowDetails = (props) => {
    const {cow, saveCow, setSidePanel} = props;

    const [cowName, setCowName] = useState(cow?.name);
    const [cowFinder, setFinder] = useState(cow?.finder);
    const [cowId, setCowId] = useState(cow?.Id);

    const updateCow = () => {
        console.log('UPDATE COW')
        let newCow = {
            name: cowName,
            id: cowId,
            finder: cowFinder,
            date: new Date().toLocaleDateString(),
            image: '',
        }
        return newCow;
    }

    return (
        <div className="mt-5 md:mt-0 md:col-span-2">
            <form onSubmit={(e) => {
                e.preventDefault();
                saveCow(updateCow())
                setSidePanel({isPaneOpen: false});
            }}>
                <div className="shadow sm:rounded-lg sm:overflow-hidden">
                    <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Photo</label>
                            <div className="mt-1 flex items-center">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0 h-10 w-10">
                                        <img className="h-10 w-10 rounded-full" src="./cow_head.jpeg" alt=""/>
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                    Change
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-6">
                            <div className="col-span-3 sm:col-span-2">
                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                        Name
                                    </label>
                                    <input
                                        onChange={(e) => setCowName(e.target.value)}
                                        placeholder={cow?.name}
                                        type="text"
                                        name="name"
                                        id="name"
                                        autoComplete="given-name"
                                        className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                            <label htmlFor="id" className="block text-sm font-medium text-gray-700">
                                ID
                            </label>
                            <input
                                onChange={(e) => setCowId(e.target.value)}
                                placeholder={cow?.id}
                                type="text"
                                name="id"
                                id="id"
                                autoComplete="id"
                                className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            />
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                            <label htmlFor="foundBy" className="block text-sm font-medium text-gray-700">
                                Found By
                            </label>
                            <input
                                onChange={(e) => setFinder(e.target.value)}
                                placeholder={cow?.finder}
                                type="text"
                                name="foundBy"
                                id="foundBy"
                                autoComplete="foundBy"
                                className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            />
                        </div>

                    </div>
                    <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                        <button
                            type="submit"
                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Save
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}
export default CowDetails;