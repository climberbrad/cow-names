import {Fragment, useState} from 'react'
import {Dialog, Transition} from '@headlessui/react'
import {XIcon} from '@heroicons/react/outline'
import {LinkIcon, PlusIcon, QuestionMarkCircleIcon} from '@heroicons/react/solid'

export default function SideBarDetail({open, setOpen, cow, isSearch}) {
    const [cowName, setCowName] = useState(cow?.name);
    const [cowId, setCowId] = useState(cow?.id);
    const [foundBy, setFoundBy] = useState(cow?.finder);
    const [description, setDescription] = useState('');
    const [foundOnDate, setFoundOnDate] = useState('');

    async function saveCow(cowToSave) {
        const requestOptions = {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    name: cowToSave.name,
                    id: cowToSave.id,
                    date: cowToSave.date,
                    image: '',
                    finder: cowToSave.finder
                })
        };
        const resp = await fetch('http://localhost:8080/v0/cows', requestOptions);
        if (!resp.ok) {
            console.error(`Error encountered`);
        }
        isSearch(false)
    }

    const toCow = () => {
        let newCow = {
            name: cowName,
            id: cowId,
            finder: foundBy,
            date: new Date().toLocaleDateString(),
            image: '',
        }
        return newCow;
    }

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" auto-reopen="true" className="fixed inset-0 overflow-hidden" onClose={setOpen}>
                <div className="absolute inset-0 overflow-hidden">
                    <Dialog.Overlay className="absolute inset-0"/>

                    <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex sm:pl-16">
                        <Transition.Child
                            as={Fragment}
                            enter="transform transition ease-in-out duration-500 sm:duration-700"
                            enterFrom="translate-x-full"
                            enterTo="translate-x-0"
                            leave="transform transition ease-in-out duration-500 sm:duration-700"
                            leaveFrom="translate-x-0"
                            leaveTo="translate-x-full"
                        >
                            <div className="w-screen max-w-2xl">
                                <form
                                    className="h-full flex flex-col bg-white shadow-xl overflow-y-scroll"
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        saveCow(toCow());
                                        setOpen(false);
                                    }}>
                                    <div className="flex-1">
                                        {/* Header */}
                                        <div className="px-4 py-6 bg-gray-100 sm:px-6">
                                            <div className="flex items-start justify-between space-x-3">
                                                <div className="space-y-1">
                                                    <Dialog.Title className="text-lg font-medium text-gray-900">
                                                        {cow ? cow.name : ("New Cow")}
                                                    </Dialog.Title>
                                                    <p className="text-sm text-gray-500">
                                                        {cow ? cow.date : ("Found on", new Date().toLocaleDateString())}

                                                    </p>
                                                </div>
                                                <div className="h-7 flex items-center">
                                                    <button
                                                        type="button"
                                                        className="text-gray-400 hover:text-gray-500"
                                                        onClick={() => setOpen(false)}
                                                    >
                                                        <span className="sr-only">Close panel</span>
                                                        <XIcon className="h-6 w-6" aria-hidden="true"/>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Divider container */}
                                        <div
                                            className="py-6 space-y-6 sm:py-0 sm:space-y-0 sm:divide-y sm:divide-gray-200">

                                            {/* Cow Name */}
                                            <div
                                                className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
                                                <div>
                                                    <label
                                                        htmlFor="cow-name"
                                                        className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                                                    >
                                                        Name
                                                    </label>
                                                </div>
                                                <div className="sm:col-span-2">
                                                    <input
                                                        type="text"
                                                        name="cow-name"
                                                        id="cow-name"
                                                        placeholder={cow?.name}
                                                        onChange={(e) => setCowName(e.target.value)}
                                                        className="block w-full shadow-sm sm:text-sm focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md"
                                                    />
                                                </div>
                                            </div>

                                            {/* Cow ID */}
                                            <div
                                                className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
                                                <div>
                                                    <label
                                                        htmlFor="cow-id"
                                                        className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                                                    >
                                                        ID
                                                    </label>
                                                </div>
                                                <div className="sm:col-span-2">
                                                    <input
                                                        type="text"
                                                        name="cow-id"
                                                        placeholder={cow?.id}
                                                        id="cow-id"
                                                        onChange={(e) => setCowId(e.target.value)}
                                                        className="block w-full shadow-sm sm:text-sm focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md"
                                                    />
                                                </div>
                                            </div>

                                            {/* Named By*/}
                                            <div
                                                className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
                                                <div>
                                                    <label
                                                        htmlFor="cow-finder"
                                                        className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                                                    >
                                                        Named By
                                                    </label>
                                                </div>
                                                <div className="sm:col-span-2">
                                                    <input
                                                        type="text"
                                                        name="cow-finder"
                                                        id="cow-finder"
                                                        placeholder={cow?.finder}
                                                        onChange={(e) => setFoundBy(e.target.value)}
                                                        className="block w-full shadow-sm sm:text-sm focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md"
                                                    />
                                                </div>
                                            </div>

                                            {/* Cow description */}
                                            <div
                                                className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
                                                <div>
                                                    <label
                                                        htmlFor="cow-description"
                                                        className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                                                    >
                                                        Description
                                                    </label>
                                                </div>
                                                <div className="sm:col-span-2">
                          <textarea
                              id="cow-description"
                              name="cow-description"
                              onChange={(e) => setDescription(e.target.value)}
                              rows={3}
                              className="block w-full shadow-sm sm:text-sm focus:ring-blue-500 focus:border-blue-500 border border-gray-300 rounded-md"
                              defaultValue={''}
                          />
                                                </div>
                                            </div>

                                            {/* Cow Image */}
                                            <div
                                                className="space-y-2 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:items-center sm:px-6 sm:py-1">
                                                <div>
                                                    <h3 className="text-sm font-medium text-gray-900">Photo</h3>
                                                </div>
                                                <div className="sm:col-span-2">
                                                    <div className="flex space-x-2">
                                                        {/*{team.map((person) => (*/}
                                                        {/*    <a*/}
                                                        {/*        key={person.email}*/}
                                                        {/*        href={person.href}*/}
                                                        {/*        className="flex-shrink-0 rounded-full hover:opacity-75"*/}
                                                        {/*    >*/}
                                                        {/*        <img*/}
                                                        {/*            className="inline-block h-8 w-8 rounded-full"*/}
                                                        {/*            src={person.imageUrl}*/}
                                                        {/*            alt={person.cowName}*/}
                                                        {/*        />*/}
                                                        {/*    </a>*/}
                                                        {/*))}*/}

                                                        <button
                                                            type="button"
                                                            className="flex-shrink-0 bg-white inline-flex h-8 w-8 items-center justify-center rounded-full border-2 border-dashed border-gray-200 text-gray-400 hover:text-gray-500 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                                        >
                                                            <span className="sr-only">Add team member</span>
                                                            <PlusIcon className="h-5 w-5" aria-hidden="true"/>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>

                                    {/* Action buttons */}
                                    <div className="flex-shrink-0 px-4 border-t border-gray-200 py-5 sm:px-6">
                                        <div className="space-x-3 flex justify-end">
                                            <button
                                                type="button"
                                                onClick={() => setOpen(false)}
                                                className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                type="submit"
                                                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                            >
                                                {cow ? ("Save") : ("Create")}
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}
