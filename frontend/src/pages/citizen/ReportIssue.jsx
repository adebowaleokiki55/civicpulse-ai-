import { useState } from "react";
import { Upload, X, MapPin, Camera } from "lucide-react";
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

    // 📷 Take photo (camera)
    function takePhoto(e) {

        const file = e.target.files[0];

        if (file) setImages([file]);

    }

    // 🖼 Gallery
    function chooseGallery(e) {

        const files = Array.from(e.target.files);

        setImages(files);

    }

    function removeImage(index) {

        setImages(images.filter((_, i) => i !== index));

    }

    // 📍 Location
    function detectLocation() {

        if (!navigator.geolocation) {

            alert("Geolocation not supported");

            return;

        }

        navigator.geolocation.getCurrentPosition(

            (pos) => {

                const lat = pos.coords.latitude;

                const lng = pos.coords.longitude;

                setLocation(`${lat}, ${lng}`);

            },

            () => alert("Failed to get location")

        );

    }

    // 🚀 Submit
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

                headers: {

                    "Content-Type": "multipart/form-data"

                }

            });

            setSuccessData(res.data);

        }

        catch (err) {

            console.error(err);

            alert(

                err.response?.data?.detail ||

                "Submission failed"

            );

        }

        finally {

            setLoading(false);

        }

    }

    return (

        <div className="min-h-screen bg-slate-100 py-12">

            <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">

                {/* Header */}

                <div className="bg-gradient-to-r from-blue-700 to-cyan-500 p-10 text-white">

                    <h1 className="text-4xl font-bold">

                        Report Community Issue

                    </h1>

                    <p className="mt-3 text-blue-100">

                        Snap, describe and submit. CivicPulse AI handles the rest.

                    </p>

                </div>

                <form onSubmit={submit} className="p-8 space-y-8">

                    {/* PHOTO OPTIONS */}

                    <div className="grid md:grid-cols-2 gap-6">

                        {/* Camera */}

                        <label className="border-2 border-dashed rounded-2xl p-10 flex flex-col items-center cursor-pointer hover:border-blue-500">

                            <Camera size={50} className="text-blue-600" />

                            <p className="mt-3 font-bold">Take Photo</p>

                            <input

                                type="file"

                                accept="image/*"

                                capture="environment"

                                className="hidden"

                                onChange={takePhoto}

                            />

                        </label>

                        {/* Gallery */}

                        <label className="border-2 border-dashed rounded-2xl p-10 flex flex-col items-center cursor-pointer hover:border-blue-500">

                            <Upload size={50} className="text-blue-600" />

                            <p className="mt-3 font-bold">Choose Gallery</p>

                            <input

                                type="file"

                                accept="image/*"

                                multiple

                                className="hidden"

                                onChange={chooseGallery}

                            />

                        </label>

                    </div>

                    {/* IMAGE PREVIEW */}

                    {images.length > 0 && (

                        <div className="grid md:grid-cols-3 gap-4">

                            {images.map((img, i) => (

                                <div key={i} className="relative">

                                    <img

                                        src={URL.createObjectURL(img)}

                                        className="rounded-xl h-48 w-full object-cover"

                                    />

                                    <button

                                        type="button"

                                        onClick={() => removeImage(i)}

                                        className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full"

                                    >

                                        <X size={16} />

                                    </button>

                                </div>

                            ))}

                        </div>

                    )}

                    {/* TITLE */}

                    <input

                        value={title}

                        onChange={(e) => setTitle(e.target.value)}

                        placeholder="Issue title"

                        className="w-full border p-4 rounded-xl"

                        required

                    />

                    {/* DESCRIPTION */}

                    <textarea

                        value={description}

                        onChange={(e) => setDescription(e.target.value)}

                        placeholder="Describe the issue..."

                        className="w-full border p-4 rounded-xl h-32"

                        required

                    />

                    {/* LOCATION */}

                    <div className="bg-slate-50 p-6 rounded-2xl">

                        <div className="flex justify-between items-center">

                            <div className="flex items-center gap-2">

                                <MapPin />

                                <span className="font-bold">Location</span>

                            </div>

                            <button

                                type="button"

                                onClick={detectLocation}

                                className="text-blue-600 font-semibold"

                            >

                                Detect

                            </button>

                        </div>

                        <p className="mt-3 text-slate-600">

                            {location || "No location detected"}

                        </p>

                    </div>

                    {/* AI INFO */}

                    <div className="bg-slate-900 text-white p-6 rounded-2xl">

                        <p className="font-bold text-lg">

                            🤖 AI will automatically:

                        </p>

                        <ul className="mt-3 space-y-2 text-slate-300">

                            <li>• Classify issue</li>

                            <li>• Assign severity</li>

                            <li>• Route department</li>

                            <li>• Generate tracking ID</li>

                        </ul>

                    </div>

                    {/* SUBMIT */}

                    <button

                        disabled={loading}

                        className="w-full bg-blue-600 text-white p-4 rounded-xl font-bold hover:bg-blue-700"

                    >

                        {loading ? "Submitting..." : "Submit Report"}

                    </button>

                </form>

            </div>

            {/* SUCCESS MODAL */}

            {successData && (

                <div className="fixed inset-0 bg-black/60 flex items-center justify-center">

                    <div className="bg-white p-8 rounded-2xl max-w-md w-full">

                        <h2 className="text-2xl font-bold">

                            Report Submitted 🎉

                        </h2>

                        <p className="mt-3">

                            ID: #{successData.id}

                        </p>

                        <p>Category: {successData.category}</p>

                        <p>Severity: {successData.severity}</p>

                        <p>Department: {successData.department}</p>

                        <button

                           onClick={() => navigate("/my-reports")}

                            className="mt-6 bg-blue-600 text-white w-full p-3 rounded-xl"

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