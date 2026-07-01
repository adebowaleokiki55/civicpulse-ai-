import { Routes, Route } from "react-router-dom";

import GovernmentLayout from "./layouts/GovernmentLayout";
import CitizenLayout from "./layouts/CitizenLayout";

// Government Pages
import Dashboard from "./pages/Dashboard";
import Pending from "./pages/Pending";
import Assigned from "./pages/Assigned";
import InProgress from "./pages/InProgress";
import Resolved from "./pages/Resolved";
import Departments from "./pages/Departments";
import IssueDetails from "./pages/IssueDetails";

// Citizen Pages
import Home from "./pages/citizen/Home";
import ReportIssue from "./pages/citizen/ReportIssue";
import TrackIssue from "./pages/citizen/TrackIssue";
import MyReports from "./pages/citizen/MyReports";
import Profile from "./pages/citizen/Profile";

function App() {

    return (

        <Routes>

            {/* ==========================
                Citizen Portal
            ========================== */}

            <Route element={<CitizenLayout />}>

                <Route
                    path="/"
                    element={<Home />}
                />

                <Route
                    path="/report"
                    element={<ReportIssue />}
                />

                <Route
                    path="/track"
                    element={<TrackIssue />}
                />

                <Route
                    path="/my-reports"
                    element={<MyReports />}
                />

                <Route
                    path="/profile"
                    element={<Profile />}
                />

            </Route>

            {/* ==========================
                Government Portal
            ========================== */}

            <Route
                path="/admin"
                element={<GovernmentLayout />}
            >

                <Route
                    index
                    element={<Dashboard />}
                />

                <Route
                    path="pending"
                    element={<Pending />}
                />

                <Route
                    path="assigned"
                    element={<Assigned />}
                />

                <Route
                    path="in-progress"
                    element={<InProgress />}
                />

                <Route
                    path="resolved"
                    element={<Resolved />}
                />

                <Route
                    path="departments"
                    element={<Departments />}
                />

                <Route
                    path="issue/:id"
                    element={<IssueDetails />}
                />

            </Route>

        </Routes>

    );

}

export default App;