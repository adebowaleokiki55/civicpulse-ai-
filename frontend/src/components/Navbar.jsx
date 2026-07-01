import { useEffect, useState } from "react";

import {

    FiBell,

    FiRefreshCw,

    FiUser,

    FiCalendar,

    FiClock

} from "react-icons/fi";

function Navbar() {

    const [dateTime, setDateTime] = useState(new Date());

    useEffect(() => {

        const timer = setInterval(() => {

            setDateTime(new Date());

        }, 1000);

        return () => clearInterval(timer);

    }, []);

    function refreshPage() {

        window.location.reload();

    }

    return (

        <header className="bg-white shadow-sm border-b border-slate-200 px-8 py-5 flex items-center justify-between">

            <div>

                <h1 className="text-2xl font-bold text-slate-800">

                    CivicPulse Government Portal

                </h1>

                <p className="text-slate-500">

                    AI-Powered Civic Issue Management System

                </p>

            </div>

            <div className="flex items-center gap-6">

                <div className="hidden lg:flex items-center gap-3 text-slate-600">

                    <FiCalendar />

                    <span>

                        {dateTime.toLocaleDateString()}

                    </span>

                </div>

                <div className="hidden lg:flex items-center gap-3 text-slate-600">

                    <FiClock />

                    <span>

                        {dateTime.toLocaleTimeString()}

                    </span>

                </div>

                <button

                    onClick={refreshPage}

                    className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-xl transition"

                >

                    <FiRefreshCw />

                </button>

                <button

                    className="relative bg-slate-100 p-3 rounded-xl hover:bg-slate-200"

                >

                    <FiBell />

                    <span

                        className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center"

                    >

                        3

                    </span>

                </button>

                <div className="flex items-center gap-3 bg-slate-100 rounded-xl px-4 py-2">

                    <div className="bg-blue-600 text-white rounded-full p-3">

                        <FiUser />

                    </div>

                    <div>

                        <p className="font-semibold">

                            Government Admin

                        </p>

                        <p className="text-sm text-slate-500">

                            Operations Officer

                        </p>

                    </div>

                </div>

            </div>

        </header>

    );

}

export default Navbar;