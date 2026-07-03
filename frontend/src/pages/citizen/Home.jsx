import { Link } from "react-router-dom";
import { 
    AlertTriangle, 
    Search, 
    ShieldCheck, 
    Zap, 
    MapPin, 
    Clock, 
    Layers, 
    Star, 
    ArrowRight, 
    Mail, 
    Phone, 
    Globe, 
    Building2,
    CheckCircle2
} from "lucide-react";

function Home() {
    return (
        <>
            {/* HERO */}
            <section className="relative overflow-hidden bg-gradient-to-br from-blue-700 to-indigo-900 border-b-4 border-slate-950 py-20 lg:py-32 px-4 sm:px-8">
                <div className="absolute inset-0 bg-black/10" />
                <div className="relative max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                        
                        {/* HERO LEFT */}
                        <div className="lg:col-span-7 space-y-6">
                            <div className="inline-flex items-center gap-3 bg-slate-950 text-white rounded-xl border border-white/20 px-4 py-2 font-black text-xs uppercase tracking-wider">
                                <span>🇳🇬</span>
                                <span className="text-blue-400">AI Powered Civic Reporting</span>
                            </div>
                            
                            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-none uppercase tracking-tight">
                                Report Problems. <br />
                                <span className="text-cyan-400">Improve Your Community.</span>
                            </h1>
                            
                            <p className="text-lg md:text-xl font-bold leading-relaxed text-blue-100 max-w-2xl">
                                CivicPulse AI lets citizens instantly report potholes, flooding, damaged roads, and public utility faults. Our infrastructure categorizes and dispatches files directly to regional agency servers.
                            </p>
                            
                            <div className="flex flex-wrap gap-4 pt-4">
                                <Link
                                    to="/report"
                                    className="inline-flex items-center gap-2 bg-white text-slate-950 font-black uppercase text-sm tracking-wider px-8 py-4 rounded-xl border-b-4 border-slate-300 hover:border-b-2 active:translate-y-0.5 transition-all shadow-md"
                                >
                                    <AlertTriangle size={18} className="text-red-500 stroke-[2.5]" />
                                    Report an Issue
                                </Link>
                                <Link
                                    to="/track"
                                    className="inline-flex items-center gap-2 border-2 border-white bg-slate-950/20 text-white font-black uppercase text-sm tracking-wider px-8 py-4 rounded-xl hover:bg-white hover:text-slate-950 transition"
                                >
                                    <Search size={18} className="stroke-[2.5]" />
                                    Track Report
                                </Link>
                            </div>
                            
                            {/* INSTANT ACCENT COUNTER ROW */}
                            <div className="grid grid-cols-3 gap-4 pt-8 max-w-md text-white">
                                <div className="border-l-4 border-cyan-400 pl-4">
                                    <h3 className="text-2xl font-black tracking-tight">15K+</h3>
                                    <p className="text-xs uppercase font-black tracking-wider text-blue-200">Reports</p>
                                </div>
                                <div className="border-l-4 border-green-400 pl-4">
                                    <h3 className="text-2xl font-black tracking-tight">12K+</h3>
                                    <p className="text-xs uppercase font-black tracking-wider text-blue-200">Resolved</p>
                                </div>
                                <div className="border-l-4 border-amber-400 pl-4">
                                    <h3 className="text-2xl font-black tracking-tight">36</h3>
                                    <p className="text-xs uppercase font-black tracking-wider text-blue-200">Agencies</p>
                                </div>
                            </div>
                        </div>

                        {/* HERO RIGHT: SIMULATED PHONE OVERVIEW */}
                        <div className="lg:col-span-5 flex justify-center lg:justify-end">
                            <div className="bg-slate-950 rounded-3xl p-4 shadow-2xl border-2 border-slate-800 w-full max-w-[360px]">
                                <div className="bg-white rounded-2xl border border-slate-100 p-5 space-y-4">
                                    <div className="flex justify-between items-center border-b pb-3">
                                        <h3 className="font-black text-sm uppercase tracking-wide text-slate-900">
                                            Telemetry Parser
                                        </h3>
                                        <span className="bg-green-100 text-green-700 text-[10px] font-black uppercase px-2 py-0.5 rounded-md border border-green-200">
                                            AI Active
                                        </span>
                                    </div>
                                    
                                    <div className="space-y-2.5 text-xs font-bold text-slate-700">
                                        <div className="bg-slate-100 rounded-xl p-3 border border-slate-200 flex items-center gap-2.5">
                                            <MapPin size={16} className="text-blue-600 flex-shrink-0" />
                                            <span className="truncate">Large crater pothole blocking access</span>
                                        </div>
                                        <div className="bg-slate-100 rounded-xl p-3 border border-slate-200 flex items-center gap-2.5">
                                            <ShieldCheck size={16} className="text-indigo-600 flex-shrink-0" />
                                            <span>Payload Security Verification</span>
                                        </div>
                                        <div className="bg-slate-100 rounded-xl p-3 border border-slate-200 flex items-center gap-2.5">
                                            <Zap size={16} className="text-amber-500 flex-shrink-0" />
                                            <span className="text-slate-900 font-black uppercase text-[10px]">Route Target: Road Maintenance</span>
                                        </div>
                                    </div>
                                    
                                    <div className="bg-slate-950 text-white rounded-xl py-3.5 px-4 font-black text-xs text-center uppercase tracking-wider">
                                        Pipeline Stack Verified
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* WHY CIVICPULSE */}
            <section className="py-20 md:py-28 bg-slate-50 border-b-2 border-slate-200 px-4 sm:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center space-y-3">
                        <span className="text-blue-600 font-black uppercase text-xs tracking-widest block">
                            Core Capabilities
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-black text-slate-900 uppercase tracking-tight">
                            Reporting Re-engineered
                        </h2>
                        <p className="text-base sm:text-lg font-bold text-slate-600 max-w-2xl mx-auto">
                            CivicPulse AI couples precise telemetry pipelines with direct backend enterprise dispatch structures to safely clear manual latency processing lines.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
                        {/* Box 1 */}
                        <div className="bg-white rounded-2xl border-2 border-slate-200 p-6 space-y-4 hover:border-slate-900 transition">
                            <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
                                <Zap size={24} className="stroke-[2.5]" />
                            </div>
                            <h3 className="text-lg font-black uppercase tracking-tight text-slate-900">AI Classification</h3>
                            <p className="text-sm font-bold text-slate-600 leading-relaxed">
                                Automated infrastructure extracts metadata payloads, logs core metrics, and formats category groups instantly.
                            </p>
                        </div>
                        {/* Box 2 */}
                        <div className="bg-white rounded-2xl border-2 border-slate-200 p-6 space-y-4 hover:border-slate-900 transition">
                            <div className="w-12 h-12 rounded-xl bg-green-100 text-green-700 flex items-center justify-center">
                                <Building2 size={24} className="stroke-[2.5]" />
                            </div>
                            <h3 className="text-lg font-black uppercase tracking-tight text-slate-900">Instant Routing</h3>
                            <p className="text-sm font-bold text-slate-600 leading-relaxed">
                                Avoid traditional backlogged processing files. Incidents forward straight into active sector systems.
                            </p>
                        </div>
                        {/* Box 3 */}
                        <div className="bg-white rounded-2xl border-2 border-slate-200 p-6 space-y-4 hover:border-slate-900 transition">
                            <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center">
                                <MapPin size={24} className="stroke-[2.5]" />
                            </div>
                            <h3 className="text-lg font-black uppercase tracking-tight text-slate-900">GPS Validation</h3>
                            <p className="text-sm font-bold text-slate-600 leading-relaxed">
                                Precise geolocation coordinate stamps secure situational accuracy bounds for field crews.
                            </p>
                        </div>
                        {/* Box 4 */}
                        <div className="bg-white rounded-2xl border-2 border-slate-200 p-6 space-y-4 hover:border-slate-900 transition">
                            <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
                                <Clock size={24} className="stroke-[2.5]" />
                            </div>
                            <h3 className="text-lg font-black uppercase tracking-tight text-slate-900">Live Tracing</h3>
                            <p className="text-sm font-bold text-slate-600 leading-relaxed">
                                Keep a constant direct interface link on validation progress pipelines up to active confirmation closures.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* HOW IT WORKS */}
            <section className="py-20 md:py-28 bg-white border-b-2 border-slate-200 px-4 sm:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center space-y-3 mb-16">
                        <span className="text-blue-600 font-black uppercase text-xs tracking-widest block">
                            Execution Protocol
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-black text-slate-900 uppercase tracking-tight">
                            Four Simple Milestones
                        </h2>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="space-y-4 border-l-4 border-blue-600 pl-4">
                            <div className="text-slate-300 font-black text-4xl">01</div>
                            <h3 className="text-xl font-black uppercase text-slate-900">Capture</h3>
                            <p className="text-sm font-bold text-slate-600 leading-relaxed">Take a photo and fill out basic environmental fields securely.</p>
                        </div>
                        <div className="space-y-4 border-l-4 border-cyan-500 pl-4">
                            <div className="text-slate-300 font-black text-4xl">02</div>
                            <h3 className="text-xl font-black uppercase text-slate-900">Analysis</h3>
                            <p className="text-sm font-bold text-slate-600 leading-relaxed">The internal pipeline reads parameters and evaluates operational severity ratings.</p>
                        </div>
                        <div className="space-y-4 border-l-4 border-purple-600 pl-4">
                            <div className="text-slate-300 font-black text-4xl">03</div>
                            <h3 className="text-xl font-black uppercase text-slate-900">Dispatch</h3>
                            <p className="text-sm font-bold text-slate-600 leading-relaxed">Direct telemetry lines link parameters and post reports straight to agencies.</p>
                        </div>
                        <div className="space-y-4 border-l-4 border-green-600 pl-4">
                            <div className="text-slate-300 font-black text-4xl">04</div>
                            <h3 className="text-xl font-black uppercase text-slate-900">Resolution</h3>
                            <p className="text-sm font-bold text-slate-600 leading-relaxed">Receive instant live tracing system hooks straight through execution closure.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* RECENT COMMUNITY REPORTS */}
            <section className="py-20 bg-slate-100 border-b-2 border-slate-200 px-4 sm:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-12">
                        <div className="space-y-2">
                            <span className="text-blue-600 font-black uppercase text-xs tracking-widest block">实时 Activity Logs</span>
                            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 uppercase tracking-tight">Recent Incidents</h2>
                        </div>
                        <Link to="/track" className="inline-flex items-center gap-1.5 text-blue-600 font-black uppercase text-xs tracking-wider border-b-2 border-blue-600 pb-0.5 hover:text-blue-800 hover:border-blue-800 transition">
                            View Live Console <ArrowRight size={14} />
                        </Link>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-6">
                        {/* Card 1 */}
                        <div className="bg-white rounded-2xl border-2 border-slate-200 p-6 flex flex-col justify-between hover:border-slate-900 transition shadow-sm">
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="bg-red-50 text-red-700 border border-red-200 px-3 py-1 rounded-md text-xs font-black uppercase tracking-wide">High CRIT</span>
                                    <span className="bg-amber-50 text-amber-700 border border-amber-200 px-3 py-1 rounded-md text-xs font-bold uppercase">Pending</span>
                                </div>
                                <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight">Pothole Hazard on Expressway</h3>
                                <p className="text-sm font-bold text-slate-600 leading-relaxed">Severe structural failure spreading rapidly across dual-carriageway center paths, inducing hard brake cycles.</p>
                            </div>
                            <div className="mt-6 pt-4 border-t border-slate-100 flex justify-between items-center text-xs font-black uppercase tracking-wide text-slate-400">
                                <span className="text-slate-700 font-extrabold">📍 Yaba, Lagos</span>
                                <span>2 hrs ago</span>
                            </div>
                        </div>
                        {/* Card 2 */}
                        <div className="bg-white rounded-2xl border-2 border-slate-200 p-6 flex flex-col justify-between hover:border-slate-900 transition shadow-sm">
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="bg-amber-50 text-amber-700 border border-amber-200 px-3 py-1 rounded-md text-xs font-black uppercase tracking-wide">Medium severity</span>
                                    <span className="bg-blue-50 text-blue-700 border border-blue-200 px-3 py-1 rounded-md text-xs font-bold uppercase">Assigned</span>
                                </div>
                                <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight">Main Street Grid Shortout</h3>
                                <p className="text-sm font-bold text-slate-600 leading-relaxed">Multiple consecutive lighting terminals are out, decreasing layout structural visibility over standard intersection arcs.</p>
                            </div>
                            <div className="mt-6 pt-4 border-t border-slate-100 flex justify-between items-center text-xs font-black uppercase tracking-wide text-slate-400">
                                <span className="text-slate-700 font-extrabold">📍 Surulere</span>
                                <span>Yesterday</span>
                            </div>
                        </div>
                        {/* Card 3 */}
                        <div className="bg-white rounded-2xl border-2 border-slate-200 p-6 flex flex-col justify-between hover:border-slate-900 transition shadow-sm">
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="bg-slate-100 text-slate-700 border border-slate-200 px-3 py-1 rounded-md text-xs font-black uppercase tracking-wide">Low priority</span>
                                    <span className="bg-green-50 text-green-700 border border-green-200 px-3 py-1 rounded-md text-xs font-bold uppercase">Resolved</span>
                                </div>
                                <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight">Blocked Conduit Run</h3>
                                <p className="text-sm font-bold text-slate-600 leading-relaxed">Public waste run overflow successfully managed and targeted by area environmental operations units.</p>
                            </div>
                            <div className="mt-6 pt-4 border-t border-slate-100 flex justify-between items-center text-xs font-black uppercase tracking-wide text-slate-400">
                                <span className="text-slate-700 font-extrabold">📍 Ikeja</span>
                                <span>3 days ago</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CALL TO ACTION */}
            <section className="bg-slate-950 border-b-4 border-slate-900 py-20 px-4 sm:px-8 relative overflow-hidden text-white">
                <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-blue-600/10 blur-3xl pointer-events-none" />
                <div className="relative max-w-4xl mx-auto text-center space-y-6">
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-xl bg-white/10 border border-white/10 font-black text-xs uppercase tracking-wider text-cyan-400">
                        System Launch Matrix
                    </span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight leading-none">
                        Deploy Real-time <br className="hidden sm:inline" /> Environmental Changes
                    </h2>
                    <p className="text-base sm:text-lg font-medium text-slate-400 max-w-2xl mx-auto leading-relaxed">
                        Every single submission logs critical telemetry metrics to enhance government accountability pipelines across administrative boundaries.
                    </p>
                    
                    <div className="flex flex-wrap justify-center gap-4 pt-4">
                        <Link
                            to="/report"
                            className="bg-blue-600 hover:bg-blue-700 text-white font-black uppercase text-sm tracking-wider px-8 py-4 rounded-xl border-b-4 border-blue-900 flex items-center gap-2 shadow-lg"
                        >
                            <AlertTriangle size={16} className="stroke-[3]" />
                            File Incident Entry
                        </Link>
                        <Link
                            to="/track"
                            className="bg-slate-900 hover:bg-slate-800 border-2 border-slate-700 text-slate-200 font-black uppercase text-sm tracking-wider px-8 py-4 rounded-xl transition"
                        >
                            Open Tracker Console
                        </Link>
                    </div>
                </div>
            </section>

            {/* FOOTER */}
            <footer className="bg-slate-950 text-slate-400 border-t border-slate-900 px-4 sm:px-8">
                <div className="max-w-7xl mx-auto py-16 space-y-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 items-start">
                        
                        {/* Footer Branding Block */}
                        <div className="lg:col-span-4 space-y-4">
                            <h2 className="text-2xl font-black tracking-tight text-white uppercase">CivicPulse AI</h2>
                            <p className="text-sm font-medium leading-relaxed text-slate-500">
                                Architecting technical telemetry solutions to bridge civil reporting loops with localized public sector operations infrastructure flawlessly.
                            </p>
                        </div>
                        
                        {/* Quick Links Column */}
                        <div className="lg:col-span-2 space-y-4">
                            <h3 className="text-white text-xs font-black uppercase tracking-widest">Platform Map</h3>
                            <ul className="space-y-2.5 text-sm font-bold">
                                <li><Link to="/" className="hover:text-white transition">Index Routing</Link></li>
                                <li><Link to="/report" className="hover:text-white transition">File Incident</Link></li>
                                <li><Link to="/track" className="hover:text-white transition">System Logs</Link></li>
                                <li><Link to="/my-reports" className="hover:text-white transition">Local Profile</Link></li>
                            </ul>
                        </div>

                        {/* Government Dashboard Routing */}
                        <div className="lg:col-span-3 space-y-4">
                            <h3 className="text-white text-xs font-black uppercase tracking-widest">Node Extensions</h3>
                            <ul className="space-y-2.5 text-sm font-bold text-slate-500">
                                <li><Link to="/admin" className="text-blue-400 hover:underline">Administrative Console →</Link></li>
                                <li>Road Operations Terminal</li>
                                <li>Hydrological Asset Management</li>
                                <li>Emergency Direct Dispatches</li>
                            </ul>
                        </div>

                        {/* Infrastructure Endpoints */}
                        <div className="lg:col-span-3 space-y-4">
                            <h3 className="text-white text-xs font-black uppercase tracking-widest">Terminal Endpoints</h3>
                            <div className="space-y-2.5 text-sm font-bold text-slate-500">
                                <p className="flex items-center gap-2"><MapPin size={14} className="text-slate-600" /> Lagos Core Hub, NG</p>
                                <p className="flex items-center gap-2"><Mail size={14} className="text-slate-600" /> core@civicpulse.ai</p>
                                <p className="flex items-center gap-2"><Phone size={14} className="text-slate-600" /> +234 800 000 0000</p>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Attribution Line */}
                    <div className="border-t border-slate-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-bold text-slate-600 uppercase tracking-wider">
                        <p>© 2026 CivicPulse AI Core. Secure Stack Confirmed.</p>
                        <div className="flex gap-6">
                            <a href="#" className="hover:text-slate-400">Privacy Policy</a>
                            <a href="#" className="hover:text-slate-400">Terms of Use</a>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}

export default Home;