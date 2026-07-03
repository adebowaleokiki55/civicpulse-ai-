import { useState } from "react";
import api from "../../services/api";
import { Search, MapPin, Building2, AlertTriangle, Clock, Calendar, CheckCircle, HelpCircle } from "lucide-react";

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
            const res = await api.get(`/issues/${issueId}`);
            setIssue(res.data);
        } catch (err) {
            console.error(err);
            setError("Issue reference not found inside active registers.");
            setIssue(null);
        } finally {
            setLoading(false);
        }
    }

    function getStatusColor(status) {
        switch (status) {
            case "Pending":
                return "text-yellow-700 bg-yellow-100 border-yellow-300";
            case "In Progress":
                return "text-blue-700 bg-blue-100 border-blue-300";
            case "Resolved":
                return "text-green-700 bg-green-100 border-green-300";
            case "Rejected":
                return "text-red-700 bg-red-100 border-red-300";
            default:
                return "text-slate-700 bg-slate-100 border-slate-300";
        }
    }

    return (
        <div className="min-h-screen bg-slate-100 text-slate-900 font-sans py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto space-y-6">
                
                {/* INTERACTIVE TRACKING BAR CARD */}
                <div className="bg-white rounded-2xl border-2 border-slate-200 p-6 md:p-8 space-y-4">
                    <div className="space-y-1">
                        <h1 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-slate-900">
                            Track Core Incident Logs
                        </h1>
                        <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">
                            Query regional administrative networks in real-time.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 pt-2">
                        <div className="relative flex-1">
                            <input
                                type="text"
                                value={issueId}
                                onChange={(e) => setIssueId(e.target.value)}
                                placeholder="Enter system reference ID (e.g. 12)"
                                className="w-full border-2 border-slate-200 rounded-xl p-4 font-bold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10 transition"
                                disabled={loading}
                            />
                        </div>
                        <button
                            onClick={trackIssue}
                            disabled={loading}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-black uppercase tracking-wider text-sm transition border-b-4 border-blue-900 active:translate-y-0.5 disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                "Searching..."
                            ) : (
                                <>
                                    <Search size={16} className="stroke-[3]" />
                                    <span>Query</span>
                                </>
                            )}
                        </button>
                    </div>

                    {error && (
                        <div className="p-4 bg-red-50 border-2 border-red-200 rounded-xl text-sm font-bold text-red-700 uppercase tracking-wide">
                            ⚠️ {error}
                        </div>
                    )}
                </div>

                {/* TRACKING DISPATCH VIEWPORT */}
                {issue && (
                    <div className="bg-white rounded-2xl border-2 border-slate-200 p-6 md:p-8 space-y-8 animate-fade-in">
                        
                        {/* VIEWPORT STATUS HEADER */}
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b-2 border-slate-100 pb-5">
                            <div className="space-y-0.5">
                                <h2 className="text-xl font-black uppercase tracking-tight text-slate-900">
                                    Incident Block #{issue.id}
                               </h2>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                                    Active Telemetry Payload
                                </p>
                            </div>
                            <span className={`px-4 py-1.5 border-2 rounded-xl text-xs font-black uppercase tracking-wider ${getStatusColor(issue.status)}`}>
                                {issue.status}
                            </span>
                        </div>

                        {/* STRUCTURAL INFO LAYOUT BLOCK */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="border-2 border-slate-200 bg-slate-50 rounded-xl p-4 flex items-center gap-3">
                                <HelpCircle size={20} className="text-slate-500 stroke-[2.5] flex-shrink-0" />
                                <div className="truncate"><span className="text-[10px] font-black uppercase tracking-wide text-slate-400 block">Report Label</span><span className="text-sm font-black text-slate-900">{issue.title}</span></div>
                            </div>
                            <div className="border-2 border-slate-200 bg-slate-50 rounded-xl p-4 flex items-center gap-3">
                                <Layers size={20} className="text-slate-500 stroke-[2.5] flex-shrink-0" />
                                <div className="truncate"><span className="text-[10px] font-black uppercase tracking-wide text-slate-400 block">Classification</span><span className="text-sm font-black text-slate-900 uppercase">{issue.category}</span></div>
                            </div>
                            <div className="border-2 border-slate-200 bg-slate-50 rounded-xl p-4 flex items-center gap-3">
                                <AlertTriangle size={20} className="text-slate-500 stroke-[2.5] flex-shrink-0" />
                                <div className="truncate"><span className="text-[10px] font-black uppercase tracking-wide text-slate-400 block">Severity Level</span><span className="text-sm font-black text-slate-900 uppercase">{issue.severity}</span></div>
                            </div>
                            <div className="border-2 border-slate-200 bg-slate-50 rounded-xl p-4 flex items-center gap-3">
                                <Building2 size={20} className="text-slate-500 stroke-[2.5] flex-shrink-0" />
                                <div className="truncate"><span className="text-[10px] font-black uppercase tracking-wide text-slate-400 block">Target Dispatch Agency</span><span className="text-sm font-black text-slate-900 uppercase">{issue.department}</span></div>
                            </div>
                            <div className="border-2 border-slate-200 bg-slate-50 rounded-xl p-4 sm:col-span-2 flex items-center gap-3">
                                <MapPin size={20} className="text-slate-500 stroke-[2.5] flex-shrink-0" />
                                <div className="break-all"><span className="text-[10px] font-black uppercase tracking-wide text-slate-400 block">Coordinates Registry</span><span className="text-sm font-black text-slate-900 uppercase">{issue.location}</span></div>
                            </div>
                        </div>

                        {/* CONTENT DISPATCH SEGMENT */}
                        <div className="space-y-2">
                            <h3 className="text-xs font-black uppercase tracking-wider text-slate-400">
                                Context Parameters
                            </h3>
                            <div className="border-2 border-slate-200 rounded-xl p-4 bg-white text-sm font-bold text-slate-700 leading-relaxed">
                                {issue.description}
                            </div>
                        </div>

                        {/* CONDITIONAL ACTION EXTENSION */}
                        {issue.resolution_notes && (
                            <div className="bg-green-50 border-2 border-green-200 p-5 rounded-xl space-y-2">
                                <div className="flex items-center gap-2 text-green-800 font-black text-xs uppercase tracking-wider">
                                    <CheckCircle size={16} className="stroke-[2.5]" />
                                    <span>Resolution Log Verified</span>
                                </div>
                                <p className="text-sm font-bold text-green-700 leading-relaxed">
                                    {issue.resolution_notes}
                                </p>
                            </div>
                        )}

                        {/* INTERACTIVE TIMELINE PATH */}
                        <div className="space-y-4 pt-4 border-t-2 border-slate-100">
                            <h3 className="text-xs font-black uppercase tracking-wider text-slate-400">
                                History Tracking Nodes
                            </h3>
                            
                            <div className="relative border-l-4 border-slate-200 pl-6 ml-2 space-y-6">
                                {/* NODE 1 */}
                                <div className="relative">
                                    <div className="absolute -left-[30px] top-1 w-3 h-3 rounded-full bg-slate-400 border-4 border-white ring-2 ring-slate-400" />
                                    <div className="text-sm font-black uppercase text-slate-800 flex items-center gap-2">
                                        <Calendar size={14} className="text-slate-400" />
                                        <span>Initial Intake Manifest Logged</span>
                                    </div>
                                    <p className="text-xs font-bold text-slate-400 mt-0.5">
                                        {new Date(issue.created_at).toLocaleString()}
                                    </p>
                                </div>

                                {/* NODE 2 */}
                                <div className="relative">
                                    <div className="absolute -left-[30px] top-1 w-3 h-3 rounded-full bg-blue-600 border-4 border-white ring-2 ring-blue-600" />
                                    <div className="text-sm font-black uppercase text-slate-900 flex items-center gap-2">
                                        <Clock size={14} className="text-blue-600" />
                                        <span>Terminal State Modification Update</span>
                                    </div>
                                    <p className="text-xs font-bold text-slate-400 mt-0.5">
                                        {new Date(issue.updated_at).toLocaleString()}
                                    </p>
                                </div>
                            </div>
                        </div>

                    </div>
                )}
            </div>
        </div>
    );
}

export default TrackIssue;