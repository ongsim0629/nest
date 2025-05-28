import { FaAlignRight, FaThLarge, FaDiceFour, FaRegFileAlt, FaUser } from "react-icons/fa";

export default function Sidebar() {
    return (
        <aside className="w-30 bg-indigo-900 text-white p-4 space-y-4">
            <div className="text-2xl font-bold mb-6">
                <FaAlignRight />
            </div>
            <nav className="space-y-4 text-2xl">
                <div className="hover:bg-indigo-700 p-2 rounded cursor-pointer">
                    <FaThLarge />
                </div>
                <div className="hover:bg-indigo-700 p-2 rounded cursor-pointer">
                    <FaDiceFour />
                </div>
                <div className="hover:bg-indigo-700 p-2 rounded cursor-pointer">
                    <FaRegFileAlt />
                </div>
                <div className="hover:bg-indigo-700 p-2 rounded cursor-pointer">
                    <FaUser />
                </div>
            </nav>
        </aside>
    );
}
