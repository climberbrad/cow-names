import SlidingPane from "react-sliding-pane";
import CowDetails from "./CowDetails";
import {useState} from "react";

const CowRow = (props) => {
    const {cow, saveCow} = props;

    const [sidePanel, setSidePanel] = useState({
        isPaneOpen: false,
        isPanelOpenLeft: false,
        hideHeader: true
    })

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
                <a href="#" className="text-indigo-600 hover:text-indigo-900" onClick={
                    () => setSidePanel({isPaneOpen: true})
                }>
                    Edit
                </a>
            </td>
            <SlidingPane
                style={{width : 50}}
                overlayClassName="some-custom-overlay-class"
                isOpen={sidePanel.isPaneOpen}
                title={cow.name}
                subtitle={cow.date}
                onRequestClose={() => {
                    // triggered on "<" on left top click or on outside click
                    setSidePanel({isPaneOpen: false});
                }}
            >
                <CowDetails cow={cow} saveCow={saveCow} setSidePanel={setSidePanel}/>
            </SlidingPane>
        </tr>
)
}
export default CowRow;