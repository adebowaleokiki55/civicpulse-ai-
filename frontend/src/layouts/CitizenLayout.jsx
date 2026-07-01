import CitizenNavbar from "../components/CitizenNavbar";
import { Outlet } from "react-router-dom";

function CitizenLayout() {

    return (

        <div className="min-h-screen bg-slate-100">

            <CitizenNavbar />

            <main>

                <Outlet />

            </main>

        </div>

    );

}

export default CitizenLayout;