import { Link } from "react-router-dom";

function Home() {

    return (

        <>

            {/* HERO */}

            <section className="relative overflow-hidden bg-gradient-to-br from-blue-700 via-blue-600 to-cyan-500">

                <div className="absolute inset-0 bg-black/10"></div>

                <div className="relative max-w-7xl mx-auto px-8 py-24 lg:py-36">

                    <div className="grid lg:grid-cols-2 gap-16 items-center">

                        <div>

                            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md rounded-full px-5 py-2 text-white">

                                🇳🇬

                                <span>

                                    AI Powered Civic Reporting

                                </span>

                            </div>

                            <h1 className="mt-8 text-5xl md:text-7xl font-extrabold text-white leading-tight">

                                Report Problems.

                                <br />

                                Improve Your Community.

                            </h1>

                            <p className="mt-8 text-xl leading-9 text-blue-100 max-w-xl">

                                CivicPulse AI lets citizens report potholes,

                                flooding, damaged roads, broken streetlights,

                                waste disposal issues and many more.

                                Artificial Intelligence automatically analyzes

                                every report and routes it to the correct

                                government department.

                            </p>

                            <div className="flex flex-wrap gap-5 mt-10">

                                <Link

                                    to="/report"

                                    className="bg-white text-blue-700 font-bold px-8 py-4 rounded-xl shadow-xl hover:scale-105 transition"

                                >

                                    🚀 Report an Issue

                                </Link>

                                <Link

                                    to="/track"

                                    className="border-2 border-white text-white px-8 py-4 rounded-xl hover:bg-white hover:text-blue-700 transition"

                                >

                                    🔍 Track Report

                                </Link>

                            </div>

                            <div className="flex gap-10 mt-12 text-white">

                                <div>

                                    <h2 className="text-3xl font-bold">

                                        15K+

                                    </h2>

                                    <p className="text-blue-100">

                                        Reports

                                    </p>

                                </div>

                                <div>

                                    <h2 className="text-3xl font-bold">

                                        12K+

                                    </h2>

                                    <p className="text-blue-100">

                                        Resolved

                                    </p>

                                </div>

                                <div>

                                    <h2 className="text-3xl font-bold">

                                        36

                                    </h2>

                                    <p className="text-blue-100">

                                        Agencies

                                    </p>

                                </div>

                            </div>

                        </div>

                        <div>

                            <div className="bg-white rounded-3xl shadow-2xl p-8">

                                <div className="bg-slate-100 rounded-2xl p-6">

                                    <div className="flex justify-between">

                                        <h3 className="font-bold text-lg">

                                            New Report

                                        </h3>

                                        <span className="text-green-600 font-semibold">

                                            AI Ready

                                        </span>

                                    </div>

                                    <div className="mt-6 space-y-4">

                                        <div className="bg-white rounded-xl p-4 shadow">

                                            📍

                                            Large pothole blocking traffic

                                        </div>

                                        <div className="bg-white rounded-xl p-4 shadow">

                                            📷

                                            3 Images Uploaded

                                        </div>

                                        <div className="bg-white rounded-xl p-4 shadow">

                                            🤖

                                            AI detected Road Damage

                                        </div>

                                        <div className="bg-white rounded-xl p-4 shadow">

                                            🏛️

                                            Department: Road Maintenance

                                        </div>

                                        <button className="w-full bg-blue-600 text-white rounded-xl py-4 font-bold hover:bg-blue-700 transition">

                                            Submit Report

                                        </button>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </section>
                        {/* WHY CIVICPULSE */}

            <section className="py-24 bg-slate-50">

                <div className="max-w-7xl mx-auto px-8">

                    <div className="text-center">

                        <span className="text-blue-600 font-semibold uppercase tracking-wider">

                            Why CivicPulse AI

                        </span>

                        <h2 className="mt-4 text-5xl font-extrabold text-slate-900">

                            Reporting Problems Has Never Been Easier

                        </h2>

                        <p className="mt-6 text-xl text-slate-600 max-w-3xl mx-auto leading-8">

                            CivicPulse AI combines Artificial Intelligence,

                            location awareness and government workflows to make

                            sure every report reaches the right department

                            faster than traditional reporting systems.

                        </p>

                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-20">

                        <div className="bg-white rounded-3xl shadow-lg p-8 hover:-translate-y-2 transition duration-300">

                            <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center text-4xl">

                                🤖

                            </div>

                            <h3 className="mt-6 text-2xl font-bold">

                                AI Classification

                            </h3>

                            <p className="mt-4 text-slate-600 leading-7">

                                AI automatically identifies the issue category,

                                severity and the correct government department.

                            </p>

                        </div>

                        <div className="bg-white rounded-3xl shadow-lg p-8 hover:-translate-y-2 transition duration-300">

                            <div className="w-16 h-16 rounded-2xl bg-green-100 flex items-center justify-center text-4xl">

                                ⚡

                            </div>

                            <h3 className="mt-6 text-2xl font-bold">

                                Instant Routing

                            </h3>

                            <p className="mt-4 text-slate-600 leading-7">

                                Reports are instantly forwarded to the responsible

                                government department without unnecessary delays.

                            </p>

                        </div>

                        <div className="bg-white rounded-3xl shadow-lg p-8 hover:-translate-y-2 transition duration-300">

                            <div className="w-16 h-16 rounded-2xl bg-purple-100 flex items-center justify-center text-4xl">

                                📍

                            </div>

                            <h3 className="mt-6 text-2xl font-bold">

                                GPS Location

                            </h3>

                            <p className="mt-4 text-slate-600 leading-7">

                                Every report includes accurate location data,

                                making it easier for field officers to respond.

                            </p>

                        </div>

                        <div className="bg-white rounded-3xl shadow-lg p-8 hover:-translate-y-2 transition duration-300">

                            <div className="w-16 h-16 rounded-2xl bg-red-100 flex items-center justify-center text-4xl">

                                🔔

                            </div>

                            <h3 className="mt-6 text-2xl font-bold">

                                Live Tracking

                            </h3>

                            <p className="mt-4 text-slate-600 leading-7">

                                Citizens can monitor every stage of their report,

                                from submission to final resolution.

                            </p>

                        </div>

                    </div>

                </div>

            </section>
                        {/* HOW IT WORKS */}

            <section className="py-28 bg-white">

                <div className="max-w-7xl mx-auto px-8">

                    <div className="text-center mb-20">

                        <span className="text-blue-600 font-semibold uppercase tracking-widest">

                            How It Works

                        </span>

                        <h2 className="mt-4 text-5xl font-extrabold text-slate-900">

                            Four Simple Steps

                        </h2>

                        <p className="mt-6 text-xl text-slate-600 max-w-3xl mx-auto">

                            Reporting civic issues should be simple. CivicPulse AI
                            takes care of the complicated part.

                        </p>

                    </div>

                    <div className="grid lg:grid-cols-4 gap-10">

                        <div className="relative">

                            <div className="w-20 h-20 rounded-full bg-blue-600 text-white flex items-center justify-center text-4xl shadow-xl">

                                📷

                            </div>

                            <h3 className="mt-8 text-2xl font-bold">

                                Capture

                            </h3>

                            <p className="mt-4 text-slate-600 leading-7">

                                Take a photo of the issue and describe what is
                                happening in your community.

                            </p>

                        </div>

                        <div>

                            <div className="w-20 h-20 rounded-full bg-cyan-600 text-white flex items-center justify-center text-4xl shadow-xl">

                                🤖

                            </div>

                            <h3 className="mt-8 text-2xl font-bold">

                                AI Analysis

                            </h3>

                            <p className="mt-4 text-slate-600 leading-7">

                                Artificial Intelligence identifies the category,
                                severity and appropriate government agency.

                            </p>

                        </div>

                        <div>

                            <div className="w-20 h-20 rounded-full bg-purple-600 text-white flex items-center justify-center text-4xl shadow-xl">

                                🏛️

                            </div>

                            <h3 className="mt-8 text-2xl font-bold">

                                Government Response

                            </h3>

                            <p className="mt-4 text-slate-600 leading-7">

                                The responsible department receives the report
                                immediately and begins processing it.

                            </p>

                        </div>

                        <div>

                            <div className="w-20 h-20 rounded-full bg-green-600 text-white flex items-center justify-center text-4xl shadow-xl">

                                ✅

                            </div>

                            <h3 className="mt-8 text-2xl font-bold">

                                Resolution

                            </h3>

                            <p className="mt-4 text-slate-600 leading-7">

                                Receive live updates until the issue has been
                                successfully resolved.

                            </p>

                        </div>

                    </div>

                </div>

            </section>
                        {/* RECENT COMMUNITY REPORTS */}

            <section className="py-24 bg-slate-100">

                <div className="max-w-7xl mx-auto px-8">

                    <div className="flex justify-between items-center mb-14">

                        <div>

                            <span className="text-blue-600 font-semibold uppercase tracking-widest">

                                Community Activity

                            </span>

                            <h2 className="mt-3 text-5xl font-extrabold">

                                Recent Reports

                            </h2>

                        </div>

                        <Link

                            to="/track"

                            className="text-blue-600 font-semibold hover:underline"

                        >

                            View All →

                        </Link>

                    </div>

                    <div className="grid lg:grid-cols-3 gap-8">

                        {/* Card 1 */}

                        <div className="bg-white rounded-3xl shadow-lg p-8 hover:-translate-y-2 transition">

                            <div className="flex justify-between">

                                <span className="bg-red-100 text-red-700 px-4 py-2 rounded-full text-sm font-semibold">

                                    High

                                </span>

                                <span className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full text-sm">

                                    Pending

                                </span>

                            </div>

                            <h3 className="mt-8 text-2xl font-bold">

                                Large Pothole Blocking Traffic

                            </h3>

                            <p className="mt-4 text-slate-600 leading-7">

                                A large pothole has developed near the main road,

                                causing heavy traffic and accidents.

                            </p>

                            <div className="mt-8 flex justify-between text-slate-500">

                                <span>

                                    📍 Yaba

                                </span>

                                <span>

                                    2 hours ago

                                </span>

                            </div>

                        </div>

                        {/* Card 2 */}

                        <div className="bg-white rounded-3xl shadow-lg p-8 hover:-translate-y-2 transition">

                            <div className="flex justify-between">

                                <span className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full text-sm font-semibold">

                                    Medium

                                </span>

                                <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm">

                                    Assigned

                                </span>

                            </div>

                            <h3 className="mt-8 text-2xl font-bold">

                                Broken Streetlight

                            </h3>

                            <p className="mt-4 text-slate-600 leading-7">

                                Streetlights have stopped working making the road

                                unsafe during the night.

                            </p>

                            <div className="mt-8 flex justify-between text-slate-500">

                                <span>

                                    📍 Surulere

                                </span>

                                <span>

                                    Yesterday

                                </span>

                            </div>

                        </div>

                        {/* Card 3 */}

                        <div className="bg-white rounded-3xl shadow-lg p-8 hover:-translate-y-2 transition">

                            <div className="flex justify-between">

                                <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold">

                                    Low

                                </span>

                                <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm">

                                    Resolved

                                </span>

                            </div>

                            <h3 className="mt-8 text-2xl font-bold">

                                Overflowing Waste Bin

                            </h3>

                            <p className="mt-4 text-slate-600 leading-7">

                                Waste management team has successfully cleared the

                                overflowing public bin.

                            </p>

                            <div className="mt-8 flex justify-between text-slate-500">

                                <span>

                                    📍 Ikeja

                                </span>

                                <span>

                                    3 days ago

                                </span>

                            </div>

                        </div>

                    </div>

                </div>

            </section>
                        {/* LIVE AI DEMO */}

            <section className="py-32 bg-white">

                <div className="max-w-7xl mx-auto px-8">

                    <div className="text-center">

                        <span className="uppercase tracking-[0.3em] text-blue-600 font-semibold">

                            Live Demo

                        </span>

                        <h2 className="mt-5 text-5xl font-extrabold text-slate-900">

                            See CivicPulse AI Working

                        </h2>

                        <p className="mt-6 text-xl text-slate-600 max-w-3xl mx-auto leading-8">

                            Watch how a simple photo becomes an actionable
                            government report in seconds.

                        </p>

                    </div>

                    <div className="grid lg:grid-cols-2 gap-20 items-center mt-20">

                        {/* LEFT */}

                        <div>

                            <div className="space-y-8">

                                <div className="flex gap-5">

                                    <div className="w-16 h-16 rounded-2xl bg-blue-600 text-white flex items-center justify-center text-3xl">

                                        📷

                                    </div>

                                    <div>

                                        <h3 className="text-2xl font-bold">

                                            Step 1

                                        </h3>

                                        <p className="text-slate-600 mt-2">

                                            Citizen uploads a picture of the issue.

                                        </p>

                                    </div>

                                </div>

                                <div className="flex gap-5">

                                    <div className="w-16 h-16 rounded-2xl bg-purple-600 text-white flex items-center justify-center text-3xl">

                                        🤖

                                    </div>

                                    <div>

                                        <h3 className="text-2xl font-bold">

                                            Step 2

                                        </h3>

                                        <p className="text-slate-600 mt-2">

                                            AI recognizes the problem, estimates
                                            severity and identifies the category.

                                        </p>

                                    </div>

                                </div>

                                <div className="flex gap-5">

                                    <div className="w-16 h-16 rounded-2xl bg-cyan-600 text-white flex items-center justify-center text-3xl">

                                        🏛️

                                    </div>

                                    <div>

                                        <h3 className="text-2xl font-bold">

                                            Step 3

                                        </h3>

                                        <p className="text-slate-600 mt-2">

                                            The report is automatically routed to
                                            the responsible government agency.

                                        </p>

                                    </div>

                                </div>

                                <div className="flex gap-5">

                                    <div className="w-16 h-16 rounded-2xl bg-green-600 text-white flex items-center justify-center text-3xl">

                                        ✅

                                    </div>

                                    <div>

                                        <h3 className="text-2xl font-bold">

                                            Step 4

                                        </h3>

                                        <p className="text-slate-600 mt-2">

                                            Citizens receive live progress updates
                                            until the issue is resolved.

                                        </p>

                                    </div>

                                </div>

                            </div>

                        </div>

                        {/* PHONE */}

                        <div className="flex justify-center">

                            <div className="bg-slate-900 rounded-[40px] p-5 shadow-2xl w-[360px]">

                                <div className="bg-white rounded-[30px] p-6">

                                    <div className="flex justify-between items-center">

                                        <h3 className="font-bold text-lg">

                                            AI Analysis

                                        </h3>

                                        <span className="text-green-600 font-bold">

                                            Complete

                                        </span>

                                    </div>

                                    <div className="mt-8 bg-slate-100 rounded-2xl p-5">

                                        <h4 className="font-bold">

                                            Uploaded Image

                                        </h4>

                                        <div className="mt-4 h-36 rounded-xl bg-slate-300 flex items-center justify-center text-6xl">

                                            🛣️

                                        </div>

                                    </div>

                                    <div className="mt-6 space-y-4">

                                        <div className="flex justify-between">

                                            <span>Category</span>

                                            <span className="font-semibold">

                                                Road Damage

                                            </span>

                                        </div>

                                        <div className="flex justify-between">

                                            <span>Severity</span>

                                            <span className="text-red-600 font-bold">

                                                High

                                            </span>

                                        </div>

                                        <div className="flex justify-between">

                                            <span>Department</span>

                                            <span className="font-semibold">

                                                Road Maintenance

                                            </span>

                                        </div>

                                        <div className="flex justify-between">

                                            <span>Location</span>

                                            <span className="font-semibold">

                                                Yaba, Lagos

                                            </span>

                                        </div>

                                    </div>

                                    <button className="mt-8 w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-bold transition">

                                        Report Submitted ✓

                                    </button>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </section>
                        {/* COMMUNITY IMPACT */}

            <section className="py-28 bg-slate-950 text-white">

                <div className="max-w-7xl mx-auto px-8">

                    <div className="text-center">

                        <span className="uppercase tracking-[0.35em] text-cyan-400 font-semibold">

                            Community Impact

                        </span>

                        <h2 className="mt-5 text-5xl font-extrabold">

                            Trusted By Citizens Across Nigeria

                        </h2>

                        <p className="mt-6 text-xl text-slate-400 max-w-3xl mx-auto leading-8">

                            Thousands of reports have already helped improve
                            roads, drainage systems, waste collection,
                            street lighting and public safety.

                        </p>

                    </div>

                    <div className="grid lg:grid-cols-3 gap-10 mt-20">

                        {/* Testimonial */}

                        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 hover:border-blue-500 transition duration-300">

                            <div className="flex items-center gap-2 text-yellow-400 text-xl">

                                ★★★★★

                            </div>

                            <p className="mt-6 text-slate-300 leading-8">

                                I reported a flooded drainage close to my street.

                                Two days later the drainage was cleared and the

                                road became passable again.

                            </p>

                            <div className="mt-8 flex items-center gap-4">

                                <div className="w-14 h-14 rounded-full bg-blue-600 flex items-center justify-center font-bold text-xl">

                                    A

                                </div>

                                <div>

                                    <h3 className="font-bold">

                                        Adebayo T.

                                    </h3>

                                    <p className="text-slate-500">

                                        Lagos State

                                    </p>

                                </div>

                            </div>

                        </div>

                        {/* Testimonial */}

                        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 hover:border-cyan-500 transition duration-300">

                            <div className="flex items-center gap-2 text-yellow-400 text-xl">

                                ★★★★★

                            </div>

                            <p className="mt-6 text-slate-300 leading-8">

                                The AI correctly identified my report as road

                                damage and sent it directly to the Road

                                Maintenance Agency without me doing anything.

                            </p>

                            <div className="mt-8 flex items-center gap-4">

                                <div className="w-14 h-14 rounded-full bg-cyan-600 flex items-center justify-center font-bold text-xl">

                                    C

                                </div>

                                <div>

                                    <h3 className="font-bold">

                                        Chinedu O.

                                    </h3>

                                    <p className="text-slate-500">

                                        Abuja

                                    </p>

                                </div>

                            </div>

                        </div>

                        {/* Testimonial */}

                        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 hover:border-green-500 transition duration-300">

                            <div className="flex items-center gap-2 text-yellow-400 text-xl">

                                ★★★★★

                            </div>

                            <p className="mt-6 text-slate-300 leading-8">

                                I loved being able to track every stage of my

                                report instead of wondering whether anybody had

                                seen it.

                            </p>

                            <div className="mt-8 flex items-center gap-4">

                                <div className="w-14 h-14 rounded-full bg-green-600 flex items-center justify-center font-bold text-xl">

                                    M

                                </div>

                                <div>

                                    <h3 className="font-bold">

                                        Mary E.

                                    </h3>

                                    <p className="text-slate-500">

                                        Ibadan

                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>

                    <div className="grid md:grid-cols-4 gap-8 mt-24">

                        <div className="text-center">

                            <h3 className="text-5xl font-extrabold text-blue-400">

                                15K+

                            </h3>

                            <p className="mt-3 text-slate-400">

                                Reports Submitted

                            </p>

                        </div>

                        <div className="text-center">

                            <h3 className="text-5xl font-extrabold text-green-400">

                                12K+

                            </h3>

                            <p className="mt-3 text-slate-400">

                                Successfully Resolved

                            </p>

                        </div>

                        <div className="text-center">

                            <h3 className="text-5xl font-extrabold text-cyan-400">

                                36

                            </h3>

                            <p className="mt-3 text-slate-400">

                                Government Agencies

                            </p>

                        </div>

                        <div className="text-center">

                            <h3 className="text-5xl font-extrabold text-yellow-400">

                                98%

                            </h3>

                            <p className="mt-3 text-slate-400">

                                Citizen Satisfaction

                            </p>

                        </div>

                    </div>

                </div>

            </section>
                        {/* CALL TO ACTION */}

            <section className="relative overflow-hidden bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-500">

                {/* Decorative circles */}

                <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-white/10 blur-3xl"></div>

                <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-cyan-300/10 blur-3xl"></div>

                <div className="relative max-w-7xl mx-auto px-8 py-28">

                    <div className="max-w-4xl mx-auto text-center">

                        <span className="inline-block px-5 py-2 rounded-full bg-white/20 backdrop-blur-md text-white font-semibold tracking-wider">

                            🚀 Join The Movement

                        </span>

                        <h2 className="mt-8 text-5xl lg:text-6xl font-extrabold text-white leading-tight">

                            Help Build

                            <br />

                            Better Communities

                        </h2>

                        <p className="mt-8 text-xl text-blue-100 leading-9">

                            Every report matters.

                            Whether it's a pothole, flooding,

                            broken streetlight or illegal dumping,

                            your report helps government agencies

                            respond faster and improve public services.

                        </p>

                        <div className="flex flex-wrap justify-center gap-6 mt-12">

                            <Link

                                to="/report"

                                className="bg-white text-blue-700 font-bold px-10 py-5 rounded-2xl shadow-2xl hover:scale-105 transition duration-300"

                            >

                                🚀 Report an Issue

                            </Link>

                            <Link

                                to="/track"

                                className="border-2 border-white text-white px-10 py-5 rounded-2xl hover:bg-white hover:text-blue-700 transition duration-300"

                            >

                                🔍 Track My Report

                            </Link>

                        </div>

                    </div>

                    {/* Bottom stats */}

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-24">

                        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-center border border-white/10">

                            <h3 className="text-4xl font-extrabold text-white">

                                15K+

                            </h3>

                            <p className="mt-3 text-blue-100">

                                Reports Submitted

                            </p>

                        </div>

                        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-center border border-white/10">

                            <h3 className="text-4xl font-extrabold text-white">

                                12K+

                            </h3>

                            <p className="mt-3 text-blue-100">

                                Issues Resolved

                            </p>

                        </div>

                        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-center border border-white/10">

                            <h3 className="text-4xl font-extrabold text-white">

                                8K+

                            </h3>

                            <p className="mt-3 text-blue-100">

                                Active Citizens

                            </p>

                        </div>

                        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-center border border-white/10">

                            <h3 className="text-4xl font-extrabold text-white">

                                36

                            </h3>

                            <p className="mt-3 text-blue-100">

                                Government Agencies

                            </p>

                        </div>

                    </div>

                </div>

            </section>
                        {/* FOOTER */}

            <footer className="bg-slate-950 text-white">

                <div className="max-w-7xl mx-auto px-8 py-20">

                    <div className="grid lg:grid-cols-4 gap-16">

                        {/* Brand */}

                        <div>

                            <h2 className="text-3xl font-extrabold">

                                CivicPulse AI

                            </h2>

                            <p className="mt-6 text-slate-400 leading-8">

                                Empowering citizens to improve their communities
                                through Artificial Intelligence, real-time issue
                                tracking and smarter collaboration with government.

                            </p>

                            <div className="flex gap-4 mt-8">

                                <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center hover:scale-110 transition cursor-pointer">

                                    📘

                                </div>

                                <div className="w-12 h-12 rounded-full bg-sky-500 flex items-center justify-center hover:scale-110 transition cursor-pointer">

                                    🐦

                                </div>

                                <div className="w-12 h-12 rounded-full bg-pink-600 flex items-center justify-center hover:scale-110 transition cursor-pointer">

                                    📸

                                </div>

                                <div className="w-12 h-12 rounded-full bg-green-600 flex items-center justify-center hover:scale-110 transition cursor-pointer">

                                    💬

                                </div>

                            </div>

                        </div>

                        {/* Quick Links */}

                        <div>

                            <h3 className="text-xl font-bold">

                                Quick Links

                            </h3>

                            <ul className="space-y-4 mt-8 text-slate-400">

                                <li>

                                    <Link
                                        to="/"
                                        className="hover:text-white"
                                    >

                                        Home

                                    </Link>

                                </li>

                                <li>

                                    <Link
                                        to="/report"
                                        className="hover:text-white"
                                    >

                                        Report an Issue

                                    </Link>

                                </li>

                                <li>

                                    <Link
                                        to="/track"
                                        className="hover:text-white"
                                    >

                                        Track Report

                                    </Link>

                                </li>

                                <li>

                                    <Link
                                        to="/my-reports"
                                        className="hover:text-white"
                                    >

                                        My Reports

                                    </Link>

                                </li>

                            </ul>

                        </div>

                        {/* Government */}

                        <div>

                            <h3 className="text-xl font-bold">

                                Government

                            </h3>

                            <ul className="space-y-4 mt-8 text-slate-400">

                                <li>

                                    <Link
                                        to="/admin"
                                        className="hover:text-white"
                                    >

                                        Government Dashboard

                                    </Link>

                                </li>

                                <li>

                                    Road Maintenance

                                </li>

                                <li>

                                    Waste Management

                                </li>

                                <li>

                                    Emergency Services

                                </li>

                                <li>

                                    Environmental Agency

                                </li>

                            </ul>

                        </div>

                        {/* Contact */}

                        <div>

                            <h3 className="text-xl font-bold">

                                Contact

                            </h3>

                            <div className="mt-8 space-y-5 text-slate-400">

                                <p>

                                    📍 Lagos, Nigeria

                                </p>

                                <p>

                                    📧 support@civicpulse.ai

                                </p>

                                <p>

                                    ☎ +234 800 000 0000

                                </p>

                                <p>

                                    🌍 www.civicpulse.ai

                                </p>

                            </div>

                        </div>

                    </div>

                    <div className="border-t border-slate-800 mt-16 pt-8 flex flex-col lg:flex-row justify-between items-center">

                        <p className="text-slate-500">

                            © 2026 CivicPulse AI. All Rights Reserved.

                        </p>

                        <div className="flex gap-8 mt-6 lg:mt-0 text-slate-500">

                            <a href="#" className="hover:text-white">

                                Privacy Policy

                            </a>

                            <a href="#" className="hover:text-white">

                                Terms of Service

                            </a>

                            <a href="#" className="hover:text-white">

                                Cookie Policy

                            </a>

                        </div>

                    </div>
                    
                </div>

            </footer>

        </>

    );

}

export default Home;