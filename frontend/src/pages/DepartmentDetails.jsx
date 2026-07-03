import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import api from "../services/api";
import Loading from "../components/Loading";
import IssueTable from "../components/IssueTable";

function DepartmentDetails() {

    const { department } = useParams();

    const [loading, setLoading] = useState(true);
    const [issues, setIssues] = useState([]);

    useEffect(() => {
        loadDepartmentIssues();
    }, [department]);

    async function loadDepartmentIssues() {
        try {
            const res = await api.get("/government/pending");
            const assigned = await api.get("/government/assigned");
            const progress = await api.get("/government/in-progress");
            const resolved = await api.get("/government/resolved");

            const all = [
                ...res.data,
                ...assigned.data,
                ...progress.data,
                ...resolved.data
            ];

            const filtered = all.filter(
                issue =>
                    issue.department?.toLowerCase() ===
                    decodeURIComponent(department).toLowerCase()
            );

            setIssues(filtered);

        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    if (loading) return <Loading />;

    const pending = issues.filter(i => i.status === "Pending");
    const inProgress = issues.filter(i => i.status === "In Progress");
    const resolved = issues.filter(i => i.status === "Resolved");
    const rejected = issues.filter(i => i.status === "Rejected");

    return (
        <div className="space-y-8">

            {/* HEADER */}
            <div className="bg-gradient-to-r from-indigo-700 to-blue-600 text-white p-8 rounded-2xl shadow-xl">
                <h1 className="text-4xl font-bold">
                    {department}
                </h1>
                <p className="mt-2 text-blue-100">
                    Manage all civic issues assigned to this institution
                </p>
            </div>

            {/* SUMMARY CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

                <div className="bg-white p-6 rounded-xl shadow">
                    <p className="text-slate-500">Pending</p>
                    <h2 className="text-3xl font-bold">{pending.length}</h2>
                </div>

                <div className="bg-white p-6 rounded-xl shadow">
                    <p className="text-slate-500">In Progress</p>
                    <h2 className="text-3xl font-bold">{inProgress.length}</h2>
                </div>

                <div className="bg-white p-6 rounded-xl shadow">
                    <p className="text-slate-500">Resolved</p>
                    <h2 className="text-3xl font-bold">{resolved.length}</h2>
                </div>

                <div className="bg-white p-6 rounded-xl shadow">
                    <p className="text-slate-500">Rejected</p>
                    <h2 className="text-3xl font-bold">{rejected.length}</h2>
                </div>

            </div>

            {/* PENDING SECTION */}
            <div>
                <h2 className="text-2xl font-bold mb-4">Pending Issues</h2>
                <IssueTable
                    issues={pending}
                    mode="department"
                    refresh={loadDepartmentIssues}
                />
            </div>

            {/* IN PROGRESS SECTION */}
            <div>
                <h2 className="text-2xl font-bold mb-4">In Progress</h2>
                <IssueTable
                    issues={inProgress}
                    mode="department"
                    refresh={loadDepartmentIssues}
                />
            </div>

            {/* RESOLVED SECTION */}
            <div>
                <h2 className="text-2xl font-bold mb-4">Resolved</h2>
                <IssueTable
                    issues={resolved}
                    mode="view"
                />
            </div>

            {/* REJECTED SECTION */}
            <div>
                <h2 className="text-2xl font-bold mb-4">Rejected</h2>
                <IssueTable
                    issues={rejected}
                    mode="view"
                />
            </div>

        </div>
    );
}

export default DepartmentDetails;
