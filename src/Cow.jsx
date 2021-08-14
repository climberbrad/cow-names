const Cow = (props) => {
    const { id, image, name, date, finder, setSidePanel } = props;
    return (
        <tr key={id}>
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                        <img className="h-10 w-10 rounded-full" src="./cow_head.jpeg" alt=""/>
                    </div>
                    <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{name}</div>
                    </div>
                </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{id}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-500">{date}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{finder}</td>
            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <a href="#" className="text-indigo-600 hover:text-indigo-900" onClick={
                    () => setSidePanel({isPaneOpen: true})
                }>
                    Edit
                </a>
            </td>
        </tr>
    )
}
export default Cow;