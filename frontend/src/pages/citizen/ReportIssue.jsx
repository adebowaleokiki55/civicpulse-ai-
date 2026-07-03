import { useState } from "react";
import { Upload, X, MapPin, Camera, Sparkles, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

function ReportIssue() {
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [successData, setSuccessData] = useState(null);

    function takePhoto(e) {
        const file = e.target.files[0];
        if (file) setImages([file]);
    }

    function chooseGallery(e) {
        const files = Array.from(e.target.files);
        setImages(files);
    }

    function removeImage(index) {
        setImages(images.filter((_, i) => i !== index));
    }

    function detectLocation() {
        if (!navigator.geolocation) return alert("Geolocation not supported");

        navigator.geolocation.getCurrentPosition(
            (pos) => {
                setLocation(`${pos.coords.latitude}, ${pos.coords.longitude}`);
            },
            () => alert("Failed to get location")
        );
    }

    async function submit(e) {
        e.preventDefault();

        try {
            setLoading(true);

            const formData = new FormData();
            formData.append("title", title);
            formData.append("description", description);
            formData.append("location", location);

            if (images.length > 0) {
                formData.append("image", images[0]);
            }

            const res = await api.post("/issues/", formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });

            setSuccessData(res.data);
        } catch (err) {
            alert(err.response?.data?.detail || "Submission failed");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-slate-100 text-slate-900 font-sans py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto space-y-6">
                
                {/* HERO HEADER */}
                <div className="rounded-2xl bg-gradient-to-r from-blue-700 to-indigo-800 text-white p-8 md:p-10 shadow-lg border-b-4 border-indigo-950">
                    <h1 className="text-3xl md:text-4xl font-black tracking-tight uppercase">
                        Report Community Issue
                    </h1>
                    <p className="mt-2 text-base md:text-lg text-blue-100 font-bold tracking-wide">
                        Snap it. Describe it. AI routes it instantly.
                    </p>
                </div>

                {/* FORM PANEL */}
                <form onSubmit={submit} className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    
                    {/* LEFT COLUMN: FIELDS */}
                    <div className="lg:col-span-7 bg-white rounded-2xl border-2 border-slate-200 p-6 md:p-8 space-y-6">
                        
                        <div className="space-y-2">
                            <label className="text-sm font-black uppercase tracking-wider text-slate-800 block">
                                Issue Title
                            </label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="e.g., Pothole on Main St or Broken Streetlight"
                                className="w-full border-2 border-slate-200 rounded-xl p-4 font-bold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10 transition"
                                required
                                disabled={loading}
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-black uppercase tracking-wider text-slate-800 block">
                                Description Detail
                            </label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Provide as much accurate detail as possible..."
                                className="w-full border-2 border-slate-200 rounded-xl p-4 h-44 font-bold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10 transition resize-none"
                                required
                                disabled={loading}
                            />
                        </div>

                        {/* LOCATION PICKER */}
                        <div className="space-y-2">
                            <label className="text-sm font-black uppercase tracking-wider text-slate-800 block">
                                Incident Location
                            </label>
                            <div className="border-2 border-slate-200 rounded-xl bg-slate-50 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <div className="flex items-center gap-3 text-slate-900">
                                    <MapPin size={22} className="text-blue-600 flex-shrink-0 stroke-[2.5]" />
                                    <span className="text-sm font-black break-all tracking-tight">
                                        {location || "COORDINATES NOT GENERATED YET"}
                                    </span>
                                </div>
                                <button
                                    type="button"
                                    onClick={detectLocation}
                                    disabled={loading}
                                    className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-black rounded-xl text-xs uppercase tracking-wider transition active:scale-95 disabled:opacity-50"
                                >
                                    Detect
                                </button>
                            </div>
                        </div>

                    </div>

                    {/* RIGHT COLUMN: UPLOADS & METADATA */}
                    <div className="lg:col-span-5 space-y-6">
                        
                        {/* ATTACHMENTS */}
                        <div className="bg-white rounded-2xl border-2 border-slate-200 p-6 space-y-4">
                            <label className="text-sm font-black uppercase tracking-wider text-slate-800 block">
                                Attach Media Evidence
                            </label>
                            <div className="grid grid-cols-2 gap-4">
                                <label className={`group border-2 border-dashed border-slate-300 rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer transition ${loading ? 'opacity-50 pointer-events-none' : 'hover:border-blue-600 hover:bg-blue-50'}`}>
                                    <Camera size={32} className="text-slate-700 group-hover:text-blue-600 stroke-[2.5] transition" />
                                    <p className="mt-2 text-xs font-black uppercase tracking-wider text-slate-800">Take Photo</p>
                                    <input type="file" accept="image/*" capture="environment" hidden onChange={takePhoto} disabled={loading} />
                                </label>

                                <label className={`group border-2 border-dashed border-slate-300 rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer transition ${loading ? 'opacity-50 pointer-events-none' : 'hover:border-blue-600 hover:bg-blue-50'}`}>
                                    <Upload size={32} className="text-slate-700 group-hover:text-blue-600 stroke-[2.5] transition" />
                                    <p className="mt-2 text-xs font-black uppercase tracking-wider text-slate-800">Gallery</p>
                                    <input type="file" accept="image/*" multiple hidden onChange={chooseGallery} disabled={loading} />
                                </label>
                            </div>

                            {/* PREVIEW CONTAINER */}
                            {images.length > 0 && (
                                <div className="grid grid-cols-3 gap-3 pt-3 border-t-2 border-slate-100">
                                    {images.map((img, i) => (
                                        <div key={i} className="relative aspect-square rounded-xl overflow-hidden border-2 border-slate-200 shadow-inner group">
                                            <img
                                                src={URL.createObjectURL(img)}
                                                alt="Preview"
                                                className="h-full w-full object-cover"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => removeImage(i)}
                                                className="absolute top-1.5 right-1.5 bg-slate-900 hover:bg-red-600 text-white p-1 rounded-lg transition"
                                            >
                                                <X size={14} className="stroke-[3]" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* AI PROCESSING PROMISE BANNER */}
                        <div className="bg-slate-900 text-white rounded-2xl p-6 relative overflow-hidden border-b-4 border-slate-950">
                            <div className="flex items-center gap-2 text-amber-400 font-black text-xs tracking-wider uppercase">
                                <Sparkles size={16} className="stroke-[2.5]" />
                                <span>AI Intelligent Routing Active</span>
                            </div>
                            <p className="text-slate-300 text-sm font-medium mt-3 leading-relaxed">
                                Your submission will be instantly scrubbed, categorized, and targeted to regional dispatch servers automatically.
                            </p>
                            <div className="grid grid-cols-2 gap-y-2 gap-x-4 mt-4 text-xs font-bold text-slate-400 uppercase tracking-wide">
                                <div className="flex items-center gap-1.5">✓ Classification</div>
                                <div className="flex items-center gap-1.5">✓ Severity Appraisal</div>
                                <div className="flex items-center gap-1.5">✓ Auto Routing</div>
                                <div className="flex items-center gap-1.5">✓ Tracking ID</div>
                            </div>
                        </div>

                        {/* ACTION BUTTON */}
                        <button
                            disabled={loading}
                            className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:bg-blue-400 text-white py-4.5 px-6 rounded-xl font-black text-base uppercase tracking-wider transition border-b-4 border-blue-900 flex items-center justify-center gap-3 disabled:border-b-0"
                        >
                            {loading ? (
                                <>
                                    <svg className="animate-spin h-5 w-5 text-white stroke-[3]" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                    </svg>
                                    <span>Processing Report...</span>
                                </>
                            ) : (
                                "Submit Incident Report"
                            )}
                        </button>
                    </div>
                </form>
            </div>

            {/* CONFIRMATION MODAL */}
            {successData && (
                <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-2xl p-6 md:p-8 max-w-md w-full border-4 border-slate-900 flex flex-col items-center text-center shadow-2xl">
                        <div className="w-14 h-14 bg-green-100 text-green-700 rounded-full flex items-center justify-center mb-4 border-2 border-green-200">
                            <CheckCircle size={32} className="stroke-[2.5]" />
                        </div>
                        <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Report Logged</h2>
                        <p className="text-slate-600 font-bold text-sm mt-1">Thank you for updating dispatch teams.</p>

                        <div className="w-full mt-6 bg-slate-100 border-2 border-slate-200 rounded-xl p-4 text-left text-sm space-y-3 font-bold text-slate-800">
                            <div className="flex justify-between border-b border-slate-200 pb-2"><span className="text-slate-500 uppercase tracking-wide text-xs">Reference ID</span><span className="font-mono font-black text-slate-900">#{successData.id}</span></div>
                            <div className="flex justify-between border-b border-slate-200 pb-2"><span className="text-slate-500 uppercase tracking-wide text-xs">Category</span><span className="font-black text-slate-900 uppercase">{successData.category}</span></div>
                            <div className="flex justify-between border-b border-slate-200 pb-2"><span className="text-slate-500 uppercase tracking-wide text-xs">Severity</span><span className="font-black text-slate-900 uppercase">{successData.severity}</span></div>
                            <div className="flex justify-between"><span className="text-slate-500 uppercase tracking-wide text-xs">Assignment</span><span className="font-black text-slate-900 uppercase">{successData.department}</span></div>
                        </div>

                        <button
                            onClick={() => navigate("/my-reports")}
                            className="mt-6 w-full bg-slate-900 hover:bg-slate-800 text-white py-3.5 px-4 rounded-xl font-black uppercase tracking-wider text-sm transition"
                        >
                            View My Reports
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ReportIssue;