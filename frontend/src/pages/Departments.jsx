import { useEffect, useState } from "react";

import api from "../services/api";

import Loading from "../components/Loading";

function Departments() {

    const [loading, setLoading] = useState(true);

    const [issues, setIssues] = useState([]);

    useEffect(() => {

        loadDepartments();

    }, []);

async function loadDepartments() {

    try {

        const [

            pending,

            assigned,

            progress,

            resolved

        ] = await Promise.all([

            api.get("/government/pending"),

            api.get("/government/assigned"),

            api.get("/government/in-progress"),

            api.get("/government/resolved")

        ]);

        setIssues([

            ...pending.data,

            ...assigned.data,

            ...progress.data,

            ...resolved.data

        ]);

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

    const grouped = {};

    issues.forEach(issue => {

        const dept = issue.department || "Unassigned";

        if (!grouped[dept]) {

            grouped[dept] = {

                total: 0,

                pending: 0,

                assigned: 0,

                progress: 0,

                resolved: 0,

                rejected: 0

            };

        }

        grouped[dept].total++;

        if (issue.status === "Pending") grouped[dept].pending++;

        if (issue.status === "Assigned") grouped[dept].assigned++;

        if (issue.status === "In Progress") grouped[dept].progress++;

        if (issue.status === "Resolved") grouped[dept].resolved++;

        if (issue.status === "Rejected") grouped[dept].rejected++;

    });

    return (

        <div className="space-y-8">

            <div className="bg-gradient-to-r from-indigo-700 to-blue-600 rounded-2xl p-8 text-white shadow-xl">

                <h1 className="text-4xl font-bold">

                    Government Departments

                </h1>

                <p className="mt-2 text-blue-100">

                    Monitor workload and performance across every department.

                </p>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

                {

                    Object.entries(grouped).map(

                        ([department, stats]) => (

                            <div

                                key={department}

                                className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition"

                            >

                                <div className="flex justify-between items-center mb-5">

                                    <h2 className="text-2xl font-bold">

                                        {department}

                                    </h2>

                                    <div className="text-5xl">

                                        🏢

                                    </div>

                                </div>

                                <div className="space-y-3">

                                    <div className="flex justify-between">

                                        <span>Total Issues</span>

                                        <strong>{stats.total}</strong>

                                    </div>

                                    <div className="flex justify-between">

                                        <span>Pending</span>

                                        <strong className="text-yellow-600">

                                            {stats.pending}

                                        </strong>

                                    </div>

                                    <div className="flex justify-between">

                                        <span>Assigned</span>

                                        <strong className="text-blue-600">

                                            {stats.assigned}

                                        </strong>

                                    </div>

                                    <div className="flex justify-between">

                                        <span>In Progress</span>

                                        <strong className="text-purple-600">

                                            {stats.progress}

                                        </strong>

                                    </div>

                                    <div className="flex justify-between">

                                        <span>Resolved</span>

                                        <strong className="text-green-600">

                                            {stats.resolved}

                                        </strong>

                                    </div>

                                    <div className="flex justify-between">

                                        <span>Rejected</span>

                                        <strong className="text-red-600">

                                            {stats.rejected}

                                        </strong>

                                    </div>

                                </div>

                                <div className="mt-6">

                                    <div className="w-full bg-slate-200 rounded-full h-3">

                                        <div

                                            className="bg-green-500 h-3 rounded-full"

                                            style={{

                                                width: `${stats.total === 0 ? 0 : (stats.resolved / stats.total) * 100}%`

                                            }}

                                        />

                                    </div>

                                    <p className="text-sm text-slate-500 mt-2">

                                        Resolution Progress

                                    </p>

                                </div>

                            </div>

                        )

                    )

                }

            </div>

        </div>

    );

}

export default Departments;