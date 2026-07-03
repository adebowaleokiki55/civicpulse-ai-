import { useEffect, useState } from "react";

import api from "../services/api";

import Loading from "../components/Loading";
import IssueTable from "../components/IssueTable";

function Resolved() {

    const [loading, setLoading] = useState(true);

    const [issues, setIssues] = useState([]);

    useEffect(() => {

        loadResolved();

    }, []);

    async function loadResolved() {

        try {

            const response = await api.get("/government/resolved");

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

            <div className="bg-gradient-to-r from-green-600 to-emerald-500 rounded-2xl p-8 text-white shadow-xl">

                <h1 className="text-4xl font-bold">

                    ✅ Resolved Issues

                </h1>

                <p className="mt-2 text-green-100">

                    Issues successfully completed by government institutions.

                </p>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

                <div className="bg-white rounded-xl shadow-md p-6">

                    <p className="text-slate-500">

                        Total Resolved

                    </p>

                    <h2 className="text-4xl font-bold text-green-600">

                        {issues.length}

                    </h2>

                </div>

                <div className="bg-white rounded-xl shadow-md p-6">

                    <p className="text-slate-500">

                        Completion Rate

                    </p>

                    <h2 className="text-4xl font-bold text-blue-600">

                        100%

                    </h2>

                </div>

                <div className="bg-white rounded-xl shadow-md p-6">

                    <p className="text-slate-500">

                        Institutions

                    </p>

                    <h2 className="text-4xl font-bold text-purple-600">

                        {

                            new Set(

                                issues.map(

                                    i => i.department

                                )

                            ).size

                        }

                    </h2>

                </div>

                <div className="bg-white rounded-xl shadow-md p-6">

                    <p className="text-slate-500">

                        Officers

                    </p>

                    <h2 className="text-4xl font-bold text-orange-600">

                        {

                            new Set(

                                issues.map(

                                    i => i.assigned_to

                                )

                            ).size

                        }

                    </h2>

                </div>

            </div>

            {

                issues.length === 0 ?

                (

                    <div className="bg-white rounded-2xl shadow-lg p-16 text-center">

                        <div className="text-7xl">

                            🎉

                        </div>

                        <h2 className="text-3xl font-bold mt-6">

                            No Resolved Issues

                        </h2>

                        <p className="text-slate-500 mt-3">

                            Issues that have been completed will appear here.

                        </p>

                    </div>

                )

                :

                (

                    <IssueTable

                        issues={issues}

                        mode="resolved"

                        refresh={loadResolved}

                    />

                )

            }

        </div>

    );

}

export default Resolved;
