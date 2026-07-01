import { useState } from "react";
import api from "../../services/api";

function TrackIssue() {

    const [issueId, setIssueId] = useState("");

    const [issue, setIssue] = useState(null);

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    async function trackIssue() {

        if (!issueId.trim()) {

            setError("Please enter a tracking ID");

            return;

        }

        try {

            setLoading(true);

            setError("");

            const res = await api.get(

                `/issues/${issueId}`

            );

            setIssue(res.data);

        }

        catch (err) {

            console.error(err);

            setError(

                "Issue not found or invalid ID"

            );

            setIssue(null);

        }

        finally {

            setLoading(false);

        }

    }

    function getStatusColor(status) {

        switch (status) {

            case "Pending":

                return "text-yellow-600 bg-yellow-100";

            case "In Progress":

                return "text-blue-600 bg-blue-100";

            case "Resolved":

                return "text-green-600 bg-green-100";

            case "Rejected":

                return "text-red-600 bg-red-100";

            default:

                return "text-slate-600 bg-slate-100";

        }

    }

    return (

        <div className="min-h-screen bg-slate-100 py-12">

            <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl p-8">

                {/* Header */}

                <h1 className="text-3xl font-bold">

                    Track Your Issue

                </h1>

                <p className="text-slate-500 mt-2">

                    Enter your tracking ID to see real-time status updates.

                </p>

                {/* Input */}

                <div className="mt-8 flex gap-3">

                    <input

                        value={issueId}

                        onChange={(e) => setIssueId(e.target.value)}

                        placeholder="Enter Issue ID (e.g. 12)"

                        className="flex-1 border p-4 rounded-xl"

                    />

                    <button

                        onClick={trackIssue}

                        className="bg-blue-600 text-white px-6 rounded-xl font-semibold"

                    >

                        {loading ? "Loading..." : "Track"}

                    </button>

                </div>

                {/* Error */}

                {error && (

                    <p className="text-red-500 mt-4">

                        {error}

                    </p>

                )}

                {/* Result */}

                {issue && (

                    <div className="mt-10 space-y-5">

                        {/* Status */}

                        <div className="flex justify-between items-center">

                            <h2 className="text-xl font-bold">

                                Issue #{issue.id}

                            </h2>

                            <span

                                className={`px-4 py-1 rounded-full font-semibold ${getStatusColor(issue.status)}`}

                            >

                                {issue.status}

                            </span>

                        </div>

                        {/* Info Card */}

                        <div className="bg-slate-50 p-6 rounded-2xl space-y-3">

                            <p><strong>Title:</strong> {issue.title}</p>

                            <p><strong>Category:</strong> {issue.category}</p>

                            <p><strong>Severity:</strong> {issue.severity}</p>

                            <p><strong>Department:</strong> {issue.department}</p>

                            <p><strong>Location:</strong> {issue.location}</p>

                        </div>

                        {/* Description */}

                        <div>

                            <h3 className="font-bold mb-2">

                                Description

                            </h3>

                            <p className="text-slate-600">

                                {issue.description}

                            </p>

                        </div>

                        {/* Resolution */}

                        {issue.resolution_notes && (

                            <div className="bg-green-50 border border-green-200 p-6 rounded-2xl">

                                <h3 className="font-bold text-green-700">

                                    Resolution Notes

                                </h3>

                                <p className="text-green-600 mt-2">

                                    {issue.resolution_notes}

                                </p>

                            </div>

                        )}

                        {/* Timeline feel */}

                        <div className="border-l-2 border-slate-300 pl-4 space-y-4">

                            <div>

                                <p className="font-semibold">

                                    Submitted

                                </p>

                                <p className="text-sm text-slate-500">

                                    {new Date(issue.created_at).toLocaleString()}

                                </p>

                            </div>

                            <div>

                                <p className="font-semibold">

                                    Last Updated

                                </p>

                                <p className="text-sm text-slate-500">

                                    {new Date(issue.updated_at).toLocaleString()}

                                </p>

                            </div>

                        </div>

                    </div>

                )}

            </div>

        </div>

    );

}

export default TrackIssue;