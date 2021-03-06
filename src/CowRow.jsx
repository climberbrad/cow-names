import CowItem from "./CowItem";
import {useState} from "react";
import {useMutation, useQueryClient} from "react-query";
import {deleteCow, saveCow} from "./Api";

const CowRow = ({cow}) => {
    const queryClient = useQueryClient();
    const [open, setOpen] = useState(false)
    const {mutate, info} = useMutation(deleteCow, {
        onSuccess: (data) => {
            void queryClient.invalidateQueries("fetchCows");
        }
    });

    const handleDelete = async (cow) => {
        await mutate({
            name: cow.name,
            id: cow.id,
            finder: cow.finder,
            date: cow.date,
            image: '',
        })
    }

    return (
        <tr key={cow.id}>
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                        <a
                            onClick={() => setOpen(true)}
                            href="#" className="text-sm font-medium text-gray-900">
                            <img className="h-10 w-10 rounded-full" src="./cow_head.jpeg" alt=""/>
                        </a>
                    </div>
                    <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                            <a
                                onClick={() => setOpen(true)}
                                href="#" className="text-sm font-medium text-gray-900">
                                {cow.name}
                            </a>
                        </div>
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
                <a href="#" onClick={() => handleDelete(cow)} >
                    <img className="block h-5 w-auto " alt="trash" src="trash.png"/>
                </a>
            </td>
            <CowItem setOpen={setOpen} open={open} cow={cow}/>
        </tr>
    )
}
export default CowRow;