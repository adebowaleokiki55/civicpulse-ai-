import { useEffect, useState } from "react";
import api from "../../services/api";

function MyReports() {

    const [reports, setReports] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    async function fetchReports() {

        try {

            setLoading(true);

            setError("");

            // NOTE: adjust if your backend uses user filtering later
            const res = await api.get("/issues/");

            setReports(res.data);

        }

        catch (err) {

            console.error(err);

            setError("Failed to load reports");

        }

        finally {

            setLoading(false);

        }

    }

    useEffect(() => {

        fetchReports();

    }, []);

    function getStatusColor(status) {

        switch (status) {

            case "Pending":

                return "bg-yellow-100 text-yellow-700";

            case "In Progress":

                return "bg-blue-100 text-blue-700";

            case "Resolved":

                return "bg-green-100 text-green-700";

            case "Rejected":

                return "bg-red-100 text-red-700";

            default:

                return "bg-slate-100 text-slate-600";

        }

    }

    return (

        <div className="min-h-screen bg-slate-100 py-12">

            <div className="max-w-5xl mx-auto px-6">

                <h1 className="text-4xl font-bold">

                    My Reports

                </h1>

                <p className="text-slate-500 mt-2">

                    Track all your submitted civic issues in one place.

                </p>

                {/* Loading */}

                {loading && (

                    <p className="mt-10 text-slate-500">

                        Loading reports...

                    </p>

                )}

                {/* Error */}

                {error && (

                    <p className="mt-10 text-red-500">

                        {error}

                    </p>

                )}

                {/* Empty State */}

                {!loading && reports.length === 0 && (

                    <div className="mt-10 bg-white p-10 rounded-2xl text-center">

                        <p className="text-slate-500">

                            You haven't submitted any reports yet.

                        </p>

                    </div>

                )}

                {/* Reports Grid */}

                <div className="grid md:grid-cols-2 gap-6 mt-10">

                    {reports.map((report) => (

                        <div

                            key={report.id}

                            className="bg-white rounded-2xl shadow p-6 hover:shadow-lg transition"

                        >

                            {/* Header */}

                            <div className="flex justify-between items-start">

                                <div>

                                    <h2 className="font-bold text-lg">

                                        {report.title}

                                    </h2>

                                    <p className="text-slate-500 text-sm">

                                        #{report.id}

                                    </p>

                                </div>

                                <span

                                    className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(report.status)}`}

                                >

                                    {report.status}

                                </span>

                            </div>

                            {/* Details */}

                            <div className="mt-4 space-y-2 text-sm text-slate-600">

                                <p>

                                    <strong>Category:</strong> {report.category}

                                </p>

                                <p>

                                    <strong>Department:</strong> {report.department}

                                </p>

                                <p>

                                    <strong>Severity:</strong> {report.severity}

                                </p>

                                <p>

                                    <strong>Location:</strong> {report.location || "N/A"}

                                </p>

                            </div>

                            {/* Footer */}

                            <div className="mt-5 text-xs text-slate-400">

                                Created:{" "}

                                {new Date(report.created_at).toLocaleString()}

                            </div>

                        </div>

                    ))}

                </div>

            </div>

        </div>

    );

}

export default MyReports;