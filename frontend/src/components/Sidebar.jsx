import { NavLink } from "react-router-dom";

function Sidebar() {

    const menu = [

        {
            title: "Dashboard",
            icon: "📊",
            path: "/admin"
        },

        {
            title: "Pending",
            icon: "🟡",
            path: "/admin/pending"
        },

        {
            title: "In Progress",
            icon: "🟣",
            path: "/admin/in-progress"
        },

        {
            title: "Resolved",
            icon: "🟢",
            path: "/admin/resolved"
        },

        {
            title: "Departments",
            icon: "🏢",
            path: "/admin/departments"
        }

    ];

    return (

        <aside className="w-72 bg-slate-900 text-white min-h-screen flex flex-col shadow-2xl">

            <div className="p-8 border-b border-slate-700">

                <h1 className="text-3xl font-bold text-blue-400">
                    CivicPulse AI
                </h1>

                <p className="text-slate-400 mt-2">
                    Government Portal
                </p>

            </div>

            <nav className="flex-1 px-4 py-6 space-y-2">

                {

                    menu.map(item => (

                        <NavLink

                            key={item.path}

                            to={item.path}

                            end={item.path === "/admin"}

                            className={({ isActive }) =>

                                `flex items-center gap-4 px-5 py-4 rounded-xl transition font-medium ${
                                    isActive
                                        ? "bg-blue-600 text-white shadow-lg"
                                        : "hover:bg-slate-800 text-slate-300"
                                }`

                            }

                        >

                            <span className="text-xl">
                                {item.icon}
                            </span>

                            <span>
                                {item.title}
                            </span>

                        </NavLink>

                    ))

                }

            </nav>

            <div className="p-6 border-t border-slate-700">

                <a

                    href="/"

                    className="block w-full text-center bg-slate-800 hover:bg-slate-700 py-3 rounded-xl transition"

                >

                    ← Citizen Portal

                </a>

            </div>

        </aside>

    );

}

export default Sidebar;