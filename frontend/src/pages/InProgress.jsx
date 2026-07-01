import { useEffect, useState } from "react";

import api from "../services/api";

import Loading from "../components/Loading";
import IssueTable from "../components/IssueTable";

function InProgress() {

    const [loading, setLoading] = useState(true);

    const [issues, setIssues] = useState([]);

    const [search, setSearch] = useState("");

    useEffect(() => {

        loadIssues();

    }, []);

    async function loadIssues() {

        try {

            const response = await api.get("/government/in-progress");

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

        issue.department.toLowerCase().includes(search.toLowerCase()) ||

        issue.category.toLowerCase().includes(search.toLowerCase())

    );

    if (loading) {

        return <Loading />;

    }

    return (

        <div>

            <div className="flex justify-between items-center mb-8">

                <div>

                    <h1 className="text-4xl font-bold">

                        In Progress

                    </h1>

                    <p className="text-slate-500 mt-2">

                        Issues currently being handled by government officers.

                    </p>

                </div>

                <input

                    type="text"

                    placeholder="Search..."

                    className="w-80 rounded-xl border px-5 py-3"

                    value={search}

                    onChange={(e)=>setSearch(e.target.value)}

                />

            </div>

            <div className="bg-white rounded-2xl shadow p-5 mb-6">

                <div className="flex justify-between">

                    <div>

                        <p className="text-slate-500">

                            Active Issues

                        </p>

                        <h2 className="text-4xl font-bold">

                            {filteredIssues.length}

                        </h2>

                    </div>

                    <div>

                        <p className="text-slate-500">

                            Officers Working

                        </p>

                        <h2 className="text-4xl font-bold">

                            {

                                new Set(

                                    filteredIssues.map(

                                        issue=>issue.assigned_to

                                    )

                                ).size

                            }

                        </h2>

                    </div>

                </div>

            </div>

            <IssueTable

                issues={filteredIssues}

                mode="progress"

                refresh={loadIssues}

            />

        </div>

    );

}

export default InProgress;