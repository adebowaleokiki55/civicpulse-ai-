import { useEffect, useState } from "react";

import {
    FiClipboard,
    FiClock,
    FiUserCheck,
    FiLoader,
    FiCheckCircle,
    FiXCircle,
} from "react-icons/fi";

import api from "../services/api";

import Loading from "../components/Loading";
import StatCard from "../components/StatCard";

function Dashboard() {

    const [loading, setLoading] = useState(true);

    const [trendingIssues, setTrendingIssues] = useState([]);

    const [stats, setStats] = useState({

        total: 0,
        pending: 0,
        assigned: 0,
        in_progress: 0,
        resolved: 0,
        rejected: 0

    });

    useEffect(() => {

        loadDashboard();

    }, []);

    async function loadDashboard() {

        try {

            const res = await api.get("/government/dashboard");

            setStats(res.data);
            setTrendingIssues(res.data.trending_issues || []);

        }

        catch (err) {

            console.error(err);

        }

        finally {

            setLoading(false);

        }

    }

    if (loading) {

        return <Loading />;

    }

    return (

        <div>

            <div className="mb-10">

                <h1 className="text-4xl font-bold text-slate-800">

                    Government Dashboard

                </h1>

                <p className="text-slate-500 mt-2">

                    Live overview of all reported civic issues.

                </p>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

                <StatCard

                    title="Total Issues"

                    value={stats.total}

                    color="bg-gradient-to-r from-blue-700 to-cyan-500"

                    icon={<FiClipboard />}

                />

                <StatCard

                    title="Pending"

                    value={stats.pending}

                    color="bg-gradient-to-r from-yellow-500 to-orange-500"

                    icon={<FiClock />}

                />

                <StatCard

                    title="Assigned"

                    value={stats.assigned}

                    color="bg-gradient-to-r from-purple-600 to-indigo-600"

                    icon={<FiUserCheck />}

                />

                <StatCard

                    title="In Progress"

                    value={stats.in_progress}

                    color="bg-gradient-to-r from-sky-600 to-blue-600"

                    icon={<FiLoader />}

                />

                <StatCard

                    title="Resolved"

                    value={stats.resolved}

                    color="bg-gradient-to-r from-green-600 to-emerald-500"

                    icon={<FiCheckCircle />}

                />

                <StatCard

                    title="Rejected"

                    value={stats.rejected}

                    color="bg-gradient-to-r from-red-600 to-rose-500"

                    icon={<FiXCircle />}

                />

            </div>

            <div className="mt-10 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
                <div className="p-6 border-b border-slate-100">
                    <h2 className="text-2xl font-bold text-slate-800">Trending Issues</h2>
                    <p className="text-slate-500 mt-1">
                        Most reported issue types based on current submissions.
                    </p>
                </div>

                <div className="divide-y divide-slate-100">
                    {trendingIssues.length === 0 ? (
                        <div className="p-6 text-slate-500">
                            No issue data available yet.
                        </div>
                    ) : (
                        trendingIssues.map((issue, index) => (
                            <div key={`${issue.name}-${index}`} className="p-6 flex items-center justify-between gap-4">
                                <div>
                                    <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">
                                        #{index + 1}
                                    </p>
                                    <h3 className="text-lg font-bold text-slate-900 mt-1">
                                        {issue.name}
                                    </h3>
                                </div>

                                <div className="text-right">
                                    <p className="text-3xl font-black text-blue-700">
                                        {issue.count}
                                    </p>
                                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                                        Reports
                                    </p>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

        </div>

    );

}

export default Dashboard;