import { useEffect, useState } from "react";
import api from "../../services/api";

function Profile() {

    const [user, setUser] = useState(null);

    const [stats, setStats] = useState({

        total: 0,

        pending: 0,

        progress: 0,

        resolved: 0

    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadProfile();

    }, []);

    async function loadProfile() {

        try {

            const [userRes, issuesRes] = await Promise.all([

                api.get("/auth/me"),

                api.get("/issues/")

            ]);

            setUser(userRes.data);

            const issues = issuesRes.data;

            setStats({

                total: issues.length,

                pending: issues.filter(

                    i => i.status === "Pending"

                ).length,

                progress: issues.filter(

                    i => i.status === "In Progress"

                ).length,

                resolved: issues.filter(

                    i => i.status === "Resolved"

                ).length

            });

        }

        catch (err) {

            console.error(err);

        }

        finally {

            setLoading(false);

        }

    }

    if (loading) {

        return (

            <div className="min-h-screen flex justify-center items-center">

                Loading...

            </div>

        );

    }

    return (

        <div className="min-h-screen bg-slate-100 py-12">

            <div className="max-w-6xl mx-auto px-6">

                {/* HERO */}

                <div className="bg-gradient-to-r from-blue-700 to-cyan-500 rounded-3xl p-10 text-white">

                    <div className="flex items-center gap-6">

                        <div className="w-24 h-24 rounded-full bg-white text-blue-700 flex items-center justify-center text-4xl font-bold">

                            {user?.full_name?.charAt(0) || "U"}

                        </div>

                        <div>

                            <h1 className="text-4xl font-bold">

                                {user?.full_name || "Citizen"}

                            </h1>

                            <p className="text-blue-100 mt-2">

                                {user?.email}

                            </p>

                            <p className="mt-3">

                                🌍 Helping build a better community with CivicPulse AI.

                            </p>

                        </div>

                    </div>

                </div>

                {/* STATS */}

                <div className="grid md:grid-cols-4 gap-6 mt-10">

                    <StatCard

                        title="Reports"

                        value={stats.total}

                        color="blue"

                    />

                    <StatCard

                        title="Pending"

                        value={stats.pending}

                        color="yellow"

                    />

                    <StatCard

                        title="In Progress"

                        value={stats.progress}

                        color="purple"

                    />

                    <StatCard

                        title="Resolved"

                        value={stats.resolved}

                        color="green"

                    />

                </div>

                {/* TWO COLUMNS */}

                <div className="grid lg:grid-cols-3 gap-8 mt-10">

                    {/* PROFILE */}

                    <div className="lg:col-span-2 bg-white rounded-3xl shadow p-8">

                        <h2 className="text-2xl font-bold">

                            Personal Information

                        </h2>

                        <div className="mt-8 space-y-6">

                            <InfoRow

                                label="Full Name"

                                value={user?.full_name}

                            />

                            <InfoRow

                                label="Email"

                                value={user?.email}

                            />

                            <InfoRow

                                label="Role"

                                value={user?.role}

                            />

                        </div>

                    </div>

                    {/* IMPACT */}

                    <div className="bg-white rounded-3xl shadow p-8">

                        <h2 className="text-2xl font-bold">

                            Community Impact

                        </h2>

                        <div className="mt-8">

                            <div className="h-4 rounded-full bg-slate-200 overflow-hidden">

                                <div

                                    className="h-full bg-green-500"

                                    style={{

                                        width: `${Math.min(

                                            stats.resolved * 10,

                                            100

                                        )}%`

                                    }}

                                />

                            </div>

                            <p className="mt-4 text-slate-600">

                                {stats.resolved}

                                {" "}resolved reports contributing to a safer community.

                            </p>

                        </div>

                        <div className="mt-10 bg-green-50 rounded-2xl p-5">

                            <h3 className="font-bold text-green-700">

                                🏆 Community Contributor

                            </h3>

                            <p className="text-sm text-green-600 mt-2">

                                Thank you for reporting issues and helping improve public services.

                            </p>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}

function StatCard({ title, value, color }) {

    const colors = {

        blue: "bg-blue-100 text-blue-700",

        yellow: "bg-yellow-100 text-yellow-700",

        purple: "bg-purple-100 text-purple-700",

        green: "bg-green-100 text-green-700"

    };

    return (

        <div className="bg-white rounded-2xl shadow p-6">

            <div className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${colors[color]}`}>

                {title}

            </div>

            <h2 className="text-4xl font-bold mt-6">

                {value}

            </h2>

        </div>

    );

}

function InfoRow({ label, value }) {

    return (

        <div className="border-b pb-4">

            <p className="text-slate-500 text-sm">

                {label}

            </p>

            <p className="text-lg font-semibold mt-1">

                {value || "-"}

            </p>

        </div>

    );

}

export default Profile;