import { useEffect, useState } from "react";

import api from "../services/api";

import Loading from "../components/Loading";
import IssueTable from "../components/IssueTable";

function Pending() {

    const [loading, setLoading] = useState(true);

    const [issues, setIssues] = useState([]);

    const [search, setSearch] = useState("");

    useEffect(() => {

        loadIssues();

    }, []);

    async function loadIssues() {

        try {

            const response = await api.get("/government/pending");

            setIssues(response.data);

        }

        catch (error) {

            console.error(error);

        }

        finally {

            setLoading(false);

        }

    }

    const filteredIssues = issues.filter(issue =>

        issue.title.toLowerCase().includes(search.toLowerCase()) ||

        issue.category.toLowerCase().includes(search.toLowerCase()) ||

        issue.department.toLowerCase().includes(search.toLowerCase()) ||

        (issue.location || "").toLowerCase().includes(search.toLowerCase())

    );

    if (loading) {

        return <Loading />;

    }

    return (

        <div>

            <div className="flex justify-between items-center mb-8">

                <div>

                    <h1 className="text-4xl font-bold text-slate-800">

                        Pending Issues

                    </h1>

                    <p className="text-slate-500 mt-2">

                        Reports waiting to be assigned to a government officer.

                    </p>

                </div>

                <input

                    type="text"

                    placeholder="Search issues..."

                    value={search}

                    onChange={(e) => setSearch(e.target.value)}

                    className="w-80 rounded-xl border border-slate-300 px-5 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"

                />

            </div>

            <div className="bg-white rounded-2xl shadow-md p-5 mb-6">

                <div className="flex gap-6">

                    <div>

                        <p className="text-slate-500">

                            Total Pending

                        </p>

                        <h2 className="text-3xl font-bold">

                            {filteredIssues.length}

                        </h2>

                    </div>

                    <div>

                        <p className="text-slate-500">

                            High Priority

                        </p>

                        <h2 className="text-3xl font-bold text-red-600">

                            {

                                filteredIssues.filter(

                                    issue => issue.severity === "High"

                                ).length

                            }

                        </h2>

                    </div>

                    <div>

                        <p className="text-slate-500">

                            Institutions

                        </p>

                        <h2 className="text-3xl font-bold">

                            {

                                new Set(

                                    filteredIssues.map(

                                        issue => issue.department

                                    )

                                ).size

                            }

                        </h2>

                    </div>

                </div>

            </div>

            {

                filteredIssues.length === 0

                ?

                (

                    <div className="bg-white rounded-2xl p-20 text-center shadow">

                        <h2 className="text-2xl font-bold">

                            No pending issues

                        </h2>

                        <p className="text-slate-500 mt-3">

                            Everything has been assigned.

                        </p>

                    </div>

                )

                :

                (

                    <IssueTable

                        issues={filteredIssues}

                        mode="pending"

                        refresh={loadIssues}


                    />

                )

            }

        </div>

    );

}

export default Pending;
