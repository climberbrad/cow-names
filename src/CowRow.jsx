import SideBarDetail from "./SideBarDetail";
import {useState} from "react";

const CowRow = ({ cow, isSearch }) => {
    const [open, setOpen] = useState(false)

    return (
        <tr key={cow.id}>
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                        <img className="h-10 w-10 rounded-full" src="./cow_head.jpeg" alt=""/>
                    </div>
                    <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{cow.name}</div>
                    </div>
                </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{cow.id}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-500">{cow.date}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{cow.finder}</td>
            <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium">
                <a
                    onClick={() => setOpen(true)}
                    href="#" className="text-indigo-600 hover:text-indigo-900">
                    Edit
                </a>
            </td>
            <SideBarDetail setOpen={setOpen} open={open} cow={cow} isSearch={isSearch}/>
        </tr>
    )
}
export default CowRow;