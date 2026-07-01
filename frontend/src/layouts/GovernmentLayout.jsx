import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

function GovernmentLayout() {

    return (

        <div className="flex min-h-screen bg-slate-100">

            <Sidebar />

            <div className="flex-1">

                <Navbar />

                <main className="p-8">

                    <Outlet />

                </main>

            </div>

        </div>

    );

}

export default GovernmentLayout;