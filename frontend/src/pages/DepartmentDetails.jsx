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

        loadIssues();

    }, [department]);

    async function loadIssues() {

        try {

            const response = await api.get(
                `/issues/department/${decodeURIComponent(department)}`
            );

            setIssues(response.data);

        }

        catch (error) {

            console.error(error);

        }

        finally {

            setLoading(false);

        }

    }

    if (loading) {

        return <Loading />;

    }

    return (

        <div className="space-y-8">

            <div className="bg-gradient-to-r from-indigo-700 to-blue-600 rounded-2xl p-8 text-white shadow-xl">

                <h1 className="text-4xl font-bold">

                    {decodeURIComponent(department)}

                </h1>

                <p className="mt-2 text-blue-100">

                    All issues assigned to this department.

                </p>

            </div>

            <div className="grid grid-cols-4 gap-6">

                <div className="bg-white rounded-xl shadow p-5">
                    <p className="text-slate-500">Total Issues</p>
                    <h2 className="text-3xl font-bold">{issues.length}</h2>
                </div>

                <div className="bg-white rounded-xl shadow p-5">
                    <p className="text-slate-500">Pending</p>
                    <h2 className="text-3xl font-bold text-yellow-600">
                        {issues.filter(i => i.status === "Pending").length}
                    </h2>
                </div>

                <div className="bg-white rounded-xl shadow p-5">
                    <p className="text-slate-500">In Progress</p>
                    <h2 className="text-3xl font-bold text-purple-600">
                        {issues.filter(i => i.status === "In Progress").length}
                    </h2>
                </div>

                <div className="bg-white rounded-xl shadow p-5">
                    <p className="text-slate-500">Resolved</p>
                    <h2 className="text-3xl font-bold text-green-600">
                        {issues.filter(i => i.status === "Resolved").length}
                    </h2>
                </div>

            </div>

            {

                issues.length === 0 ?

                (

                    <div className="bg-white rounded-2xl shadow p-20 text-center">

                        <h2 className="text-2xl font-bold">

                            No issues found.

                        </h2>

                        <p className="text-slate-500 mt-3">

                            This department has not received any reports yet.

                        </p>

                    </div>

                )

                :

                (

                    <IssueTable

                        issues={issues}

                        refresh={loadIssues}

                    />

                )

            }

        </div>

    );

}

export default DepartmentDetails;