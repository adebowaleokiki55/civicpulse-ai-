import { Link } from "react-router-dom";

function CitizenNavbar() {

    return (

        <nav className="bg-white shadow">

            <div className="max-w-7xl mx-auto px-8 py-5 flex justify-between items-center">

                <h1 className="text-2xl font-bold text-blue-600">

                    CivicPulse AI

                </h1>

                <div className="flex gap-8">

                    <Link to="/">Home</Link>

                    <Link to="/report">

                        Report Issue

                    </Link>

                    <Link to="/track">

                        Track Issue

                    </Link>

                    <Link to="/my-reports">

                        My Reports

                    </Link>

                    <Link to="/profile">

                        Profile

                    </Link>

                </div>

            </div>

        </nav>

    );

}

export default CitizenNavbar;