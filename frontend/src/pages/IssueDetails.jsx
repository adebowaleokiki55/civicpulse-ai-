import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import api, { API_BASE_URL } from "../services/api";

import Loading from "../components/Loading";
import StatusBadge from "../components/StatusBadge";

function IssueDetails() {

    const { id } = useParams();

    const [loading, setLoading] = useState(true);

    const [issue, setIssue] = useState(null);
    const BACKEND_URL =
    import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

    useEffect(() => {

        loadIssue();

    }, [id]);

    async function loadIssue() {

        try {

            const endpoints = [

                "/government/pending",

                "/government/assigned",

                "/government/in-progress",

                "/government/resolved"

            ];

            let found = null;

            for (const endpoint of endpoints) {

                const response = await api.get(endpoint);

                const match = response.data.find(

                    item => String(item.id) === String(id)

                );

                if (match) {

                    found = match;

                    break;

                }

            }

            setIssue(found);

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

    if (!issue) {

        return (

            <div className="bg-white rounded-2xl shadow-lg p-16 text-center">

                <div className="text-7xl">

                    📄

                </div>

                <h2 className="text-3xl font-bold mt-6">

                    Issue Not Found

                </h2>

                <p className="text-slate-500 mt-3">

                    The requested issue could not be located.

                </p>

            </div>

        );

    }
    console.log(issue);

    return (

        <div className="space-y-8">

            <div className="bg-gradient-to-r from-slate-800 to-slate-700 rounded-2xl p-8 text-white shadow-xl">

                <h1 className="text-4xl font-bold">

                    Issue #{issue.id}

                </h1>

                <p className="mt-2 text-slate-300">

                    Complete issue information and government workflow.

                </p>

            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">                <div className="lg:col-span-2 space-y-6">

                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

                        <div className="h-80 bg-slate-200 flex items-center justify-center">

                            {

                                issue.image ? 

                                (

                                    <img

                                        src={`${API_BASE_URL}/uploads/${issue.image}`}

                                        alt={issue.title}

                                        className="w-full h-full object-cover"

                                        

                                    />

                                )

                                :

                                (

                                    <div className="text-center">

                                        <div className="text-7xl">

                                            📷

                                        </div>

                                        <p className="text-slate-500 mt-4">

                                            No image available

                                        </p>

                                    </div>

                                )

                            }

                        </div>

                    </div>

                    <div className="bg-white rounded-2xl shadow-lg p-8">

                        <h2 className="text-3xl font-bold mb-6">

                            {issue.title}

                        </h2>

                        <div className="prose max-w-none">

                            <p className="text-slate-600 leading-8 text-lg">

                                {

                                    issue.description ||

                                    "No description provided."

                                }

                            </p>

                        </div>

                    </div>

                    <div className="bg-white rounded-2xl shadow-lg p-8">

                        <h2 className="text-2xl font-bold mb-6">

                            AI Summary

                        </h2>

                        <div className="bg-blue-50 border-l-4 border-blue-600 rounded-xl p-6">

                            <p className="leading-8 text-slate-700">

                                {

                                    issue.ai_summary ||

                                    "No AI summary available for this issue yet."

                                }

                            </p>

                        </div>

                    </div>

                    <div className="bg-white rounded-2xl shadow-lg p-8">

                        <h2 className="text-2xl font-bold mb-6">

                            Resolution Notes

                        </h2>

                        <div className="bg-green-50 rounded-xl p-6">

                            <p className="leading-8 text-slate-700">

                                {

                                    issue.resolution_notes ||

                                    "This issue has not been resolved yet."

                                }

                            </p>

                        </div>

                    </div>

                </div>

                <div className="space-y-6">

                    <div className="bg-white rounded-2xl shadow-lg p-8">

                        <h2 className="text-2xl font-bold mb-6">

                            Issue Information

                        </h2>

                        <div className="space-y-5">

                            <div className="flex justify-between">

                                <span className="text-slate-500">

                                    Status

                                </span>

                                <StatusBadge

                                    status={issue.status}

                                />

                            </div>

                            <div className="flex justify-between">

                                <span className="text-slate-500">

                                    Severity

                                </span>

                                <span className="font-semibold">

                                    {issue.severity}

                                </span>

                            </div>

                            <div className="flex justify-between">

                                <span className="text-slate-500">

                                    Category

                                </span>

                                <span className="font-semibold">

                                    {issue.category}

                                </span>

                            </div>

                            <div className="flex justify-between">

                                <span className="text-slate-500">

                                    Department

                                </span>

                                <span className="font-semibold">

                                    {issue.department}

                                </span>

                            </div>

                            <div className="flex justify-between">

                                <span className="text-slate-500">

                                    Assigned Officer

                                </span>

                                <span className="font-semibold">

                                    {

                                        issue.assigned_to ||

                                        "Not Assigned"

                                    }

                                </span>

                            </div>

                            <div className="flex justify-between">

                                <span className="text-slate-500">

                                    Reporter

                                </span>

                                <span className="font-semibold">

                                    {

                                        issue.reporter ||

                                        "Anonymous"

                                    }

                                </span>

                            </div>

                            <div className="flex justify-between">

                                <span className="text-slate-500">

                                    Location

                                </span>

                                <span className="font-semibold text-right">

                                    {

                                        issue.location ||

                                        "Unknown"

                                    }

                                </span>

                            </div>

                            <div className="flex justify-between">

                                <span className="text-slate-500">

                                    Date Reported

                                </span>

                                <span className="font-semibold">

                                    {

                                        issue.created_at ?

                                        new Date(issue.created_at).toLocaleString()

                                        :

                                        "-"

                                    }

                                </span>

                            </div>

                        </div>

                    </div>                    <div className="bg-white rounded-2xl shadow-lg p-8">

                        <h2 className="text-2xl font-bold mb-6">

                            Government Workflow

                        </h2>

                        <div className="space-y-6">

                            <div className="flex items-center gap-4">

                                <div className="w-5 h-5 rounded-full bg-green-500"></div>

                                <div>

                                    <h3 className="font-semibold">

                                        Issue Reported

                                    </h3>

                                    <p className="text-sm text-slate-500">

                                        Citizen submitted the report.

                                    </p>

                                </div>

                            </div>

                            <div className="flex items-center gap-4">

                                <div className={`w-5 h-5 rounded-full ${
                                    issue.assigned_to
                                        ? "bg-green-500"
                                        : "bg-slate-300"
                                }`}></div>

                                <div>

                                    <h3 className="font-semibold">

                                        Assigned

                                    </h3>

                                    <p className="text-sm text-slate-500">

                                        Officer assigned to investigate.

                                    </p>

                                </div>

                            </div>

                            <div className="flex items-center gap-4">

                                <div className={`w-5 h-5 rounded-full ${
                                    issue.status === "In Progress" ||
                                    issue.status === "Resolved"
                                        ? "bg-green-500"
                                        : "bg-slate-300"
                                }`}></div>

                                <div>

                                    <h3 className="font-semibold">

                                        Investigation

                                    </h3>

                                    <p className="text-sm text-slate-500">

                                        Government department is handling the issue.

                                    </p>

                                </div>

                            </div>

                            <div className="flex items-center gap-4">

                                <div className={`w-5 h-5 rounded-full ${
                                    issue.status === "Resolved"
                                        ? "bg-green-500"
                                        : "bg-slate-300"
                                }`}></div>

                                <div>

                                    <h3 className="font-semibold">

                                        Resolved

                                    </h3>

                                    <p className="text-sm text-slate-500">

                                        Issue successfully completed.

                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>

                    <div className="bg-white rounded-2xl shadow-lg p-8">

                        <h2 className="text-2xl font-bold mb-6">

                            Quick Actions

                        </h2>

                        <div className="flex flex-col gap-4">

                            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition">

                                Assign Officer

                            </button>

                            <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl font-semibold transition">

                                Start Investigation

                            </button>

                            <button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold transition">

                                Mark Resolved

                            </button>

                            <button className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-semibold transition">

                                Reject Issue

                            </button>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default IssueDetails;