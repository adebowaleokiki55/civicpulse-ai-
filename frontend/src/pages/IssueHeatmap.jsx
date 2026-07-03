import { useEffect, useMemo, useRef, useState } from "react";
import { Activity, AlertTriangle, MapPin, RadioTower } from "lucide-react";
import { CircleMarker, MapContainer, Popup, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import api from "../services/api";
import Loading from "../components/Loading";

const NIGERIA_BOUNDS = L.latLngBounds([
    [4.2, 2.6],
    [13.9, 14.9]
]);

const NIGERIA_CENTER = [9.082, 8.6753];

const MAP_CONTAINER_STYLE = {
    width: "100%",
    height: "560px"
};

const locationCache = new Map();

function NigeriaMapController({ selectedIssue }) {
    const map = useMap();

    useEffect(() => {
        map.fitBounds(NIGERIA_BOUNDS, { padding: [24, 24] });
        map.setMaxBounds(NIGERIA_BOUNDS);
    }, [map]);

    useEffect(() => {
        if (!selectedIssue) return;

        map.flyTo(selectedIssue.position, 12, {
            animate: true,
            duration: 0.7
        });
    }, [map, selectedIssue]);

    return null;
}

function IssuePointMarker({ issue, isSelected, onSelect }) {
    const markerRef = useRef(null);

    useEffect(() => {
        if (isSelected) {
            markerRef.current?.openPopup();
        } else {
            markerRef.current?.closePopup?.();
        }
    }, [isSelected]);

    return (
        <CircleMarker
            ref={markerRef}
            center={issue.position}
            radius={isSelected ? 12 : issue.severity === "High" ? 8 : 6}
            pathOptions={{
                color: isSelected ? "#0f172a" : "#ffffff",
                fillColor: issue.severity === "High" ? "#dc2626" : issue.severity === "Medium" ? "#f97316" : "#2563eb",
                fillOpacity: 1,
                weight: isSelected ? 3 : 2
            }}
            eventHandlers={{
                click: () => onSelect(issue.id)
            }}
        >
            <Popup autoPan closeOnEscapeKey>
                <div className="space-y-2 min-w-[200px]">
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Issue</p>
                        <p className="font-semibold text-slate-900">{issue.title}</p>
                    </div>
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Department</p>
                        <p className="text-sm font-semibold text-slate-700">{issue.department}</p>
                    </div>
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Location</p>
                        <p className="text-xs text-slate-500 break-all">{issue.location}</p>
                    </div>
                </div>
            </Popup>
        </CircleMarker>
    );
}

function parseCoordinates(location) {
    if (!location) return null;

    const matches = String(location).match(/-?\d+(\.\d+)?/g);
    if (!matches || matches.length < 2) return null;

    const latitude = Number(matches[0]);
    const longitude = Number(matches[1]);

    if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) return null;

    const insideNigeria =
        latitude >= 4.2 &&
        latitude <= 13.9 &&
        longitude >= 2.6 &&
        longitude <= 14.9;

    if (!insideNigeria) return null;

    return { latitude, longitude };
}

async function geocodeNigeriaLocation(location) {
    const query = String(location || "").trim();

    if (!query) return null;

    const cached = locationCache.get(query);
    if (cached !== undefined) return cached;

    try {
        const response = await fetch(
            `https://nominatim.openstreetmap.org/search?format=jsonv2&limit=1&countrycodes=ng&q=${encodeURIComponent(`${query}, Nigeria`)}`,
            {
                headers: {
                    Accept: "application/json"
                }
            }
        );

        if (!response.ok) {
            locationCache.set(query, null);
            return null;
        }

        const data = await response.json();
        const firstMatch = Array.isArray(data) ? data[0] : null;

        if (!firstMatch) {
            locationCache.set(query, null);
            return null;
        }

        const latitude = Number(firstMatch.lat);
        const longitude = Number(firstMatch.lon);

        if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
            locationCache.set(query, null);
            return null;
        }

        const coordinates = { latitude, longitude };
        locationCache.set(query, coordinates);

        return coordinates;
    } catch (error) {
        locationCache.set(query, null);
        return null;
    }
}

function IssueHeatmap() {
    const [loading, setLoading] = useState(true);
    const [issues, setIssues] = useState([]);
    const [selectedIssueId, setSelectedIssueId] = useState(null);

    useEffect(() => {
        loadIssues();
    }, []);

    async function loadIssues() {
        setLoading(true);

        try {
            const response = await api.get("/issues/");
            const resolvedIssues = await Promise.all(
                response.data.map(async (issue) => {
                    const coordinates = parseCoordinates(issue.location) || await geocodeNigeriaLocation(issue.location);

                    if (!coordinates) return null;

                    return {
                        ...issue,
                        coordinates,
                        position: [coordinates.latitude, coordinates.longitude]
                    };
                })
            );

            setIssues(resolvedIssues.filter(Boolean));
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    const mappedIssues = useMemo(
        () => issues,
        [issues]
    );

    const heatmapPoints = useMemo(
        () =>
            mappedIssues.map((issue) => ({
                ...issue,
                weight: issue.severity === "High" ? 3 : issue.severity === "Medium" ? 2 : 1,
                radius: issue.severity === "High" ? 42 : issue.severity === "Medium" ? 34 : 28,
                fillColor:
                    issue.severity === "High"
                        ? "#dc2626"
                        : issue.severity === "Medium"
                            ? "#f97316"
                            : "#2563eb"
            })),
        [mappedIssues]
    );

    const selectedIssue = useMemo(
        () => mappedIssues.find((issue) => issue.id === selectedIssueId) || null,
        [mappedIssues, selectedIssueId]
    );

    const stats = useMemo(() => {
        const institutions = new Set(
            mappedIssues.map((issue) => issue.department).filter(Boolean)
        );

        return {
            total: issues.length,
            mapped: mappedIssues.length,
            high: mappedIssues.filter((issue) => issue.severity === "High").length,
            institutions: institutions.size
        };
    }, [issues, mappedIssues]);

    if (loading) return <Loading />;

    return (
        <div className="space-y-8">
            <div className="bg-slate-900 text-white rounded-2xl p-8 shadow-xl">
                <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
                    <div>
                        <h1 className="text-4xl font-bold">Issue Heatmap</h1>
                        <p className="mt-2 text-slate-300">
                            Geographic concentration of reported civic issues across Nigeria.
                        </p>
                    </div>

                    <button
                        onClick={loadIssues}
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700 transition"
                    >
                        <Activity size={18} />
                        Refresh
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
                <div className="bg-white rounded-xl shadow p-5">
                    <p className="text-sm text-slate-500">Total Issues</p>
                    <h2 className="text-3xl font-bold text-slate-900">{stats.total}</h2>
                </div>

                <div className="bg-white rounded-xl shadow p-5">
                    <p className="text-sm text-slate-500">Mapped Issues</p>
                    <h2 className="text-3xl font-bold text-blue-700">{stats.mapped}</h2>
                </div>

                <div className="bg-white rounded-xl shadow p-5">
                    <p className="text-sm text-slate-500">High Severity</p>
                    <h2 className="text-3xl font-bold text-red-600">{stats.high}</h2>
                </div>

                <div className="bg-white rounded-xl shadow p-5">
                    <p className="text-sm text-slate-500">Institutions</p>
                    <h2 className="text-3xl font-bold text-emerald-700">{stats.institutions}</h2>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
                <div className="xl:col-span-8 bg-white rounded-2xl shadow-xl overflow-hidden">
                    <div className="p-6 border-b border-slate-200 flex items-center justify-between gap-4">
                        <div>
                            <h2 className="text-2xl font-bold text-slate-900">Nigeria Map</h2>
                            <p className="text-slate-500 mt-1">
                                Zoom in to inspect individual issue locations across Nigeria.
                            </p>
                        </div>
                        <RadioTower className="text-blue-700" size={28} />
                    </div>

                    <div className="bg-slate-100 p-4 md:p-8">
                        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
                            <MapContainer
                                center={NIGERIA_CENTER}
                                zoom={6}
                                scrollWheelZoom
                                style={MAP_CONTAINER_STYLE}
                                maxBounds={NIGERIA_BOUNDS}
                                maxBoundsViscosity={1.0}
                                minZoom={5}
                                maxZoom={13}
                            >
                                <NigeriaMapController selectedIssue={selectedIssue} />
                                <TileLayer
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />

                                {heatmapPoints.map((issue) => (
                                    <CircleMarker
                                        key={`heat-${issue.id}`}
                                        center={issue.position}
                                        radius={issue.radius}
                                        pathOptions={{
                                            color: issue.fillColor,
                                            fillColor: issue.fillColor,
                                            fillOpacity: issue.severity === "High" ? 0.28 : issue.severity === "Medium" ? 0.22 : 0.18,
                                            weight: 1
                                        }}
                                    >
                                        <Popup>
                                            <div className="space-y-1">
                                                <p className="font-semibold text-slate-900">#{issue.id} {issue.title}</p>
                                                <p className="text-sm text-slate-600">{issue.department}</p>
                                                <p className="text-xs text-slate-500">{issue.location}</p>
                                            </div>
                                        </Popup>
                                    </CircleMarker>
                                ))}

                                {mappedIssues.map((issue) => (
                                    <IssuePointMarker
                                        key={issue.id}
                                        issue={issue}
                                        isSelected={selectedIssueId === issue.id}
                                        onSelect={setSelectedIssueId}
                                    />
                                ))}
                            </MapContainer>
                        </div>
                    </div>
                </div>

                <div className="xl:col-span-4 bg-white rounded-2xl shadow-xl overflow-hidden">
                    <div className="p-6 border-b border-slate-200">
                        <h2 className="text-2xl font-bold text-slate-900">Mapped Reports</h2>
                        <p className="text-slate-500 mt-1">
                            Issues without valid Nigeria coordinates are excluded from the map.
                        </p>
                    </div>

                    <div className="max-h-[560px] overflow-y-auto divide-y divide-slate-100">
                        {mappedIssues.length === 0 ? (
                            <div className="p-8 text-center text-slate-500">
                                <MapPin className="mx-auto mb-3 text-slate-400" size={34} />
                                No issues with valid coordinates yet.
                            </div>
                        ) : (
                            mappedIssues.map((issue) => (
                                <button
                                    key={`row-${issue.id}`}
                                    type="button"
                                    onClick={() => setSelectedIssueId(issue.id)}
                                    className={`w-full text-left p-5 transition border-l-4 ${
                                        selectedIssueId === issue.id
                                            ? "bg-blue-50 border-blue-600"
                                            : "hover:bg-slate-50 border-transparent"
                                    }`}
                                >
                                    <div className="flex items-start justify-between gap-3">
                                        <div>
                                            <h3 className="font-bold text-slate-900">
                                                #{issue.id} {issue.title}
                                            </h3>
                                            <p className="text-sm text-slate-500 mt-1">
                                                {issue.department}
                                            </p>
                                        </div>
                                        {issue.severity === "High" && (
                                            <AlertTriangle className="text-red-600 shrink-0" size={20} />
                                        )}
                                    </div>

                                    <div className="mt-3 flex flex-wrap gap-2 text-xs font-semibold">
                                        <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-700">
                                            {issue.category}
                                        </span>
                                        <span className="rounded-full bg-blue-50 px-3 py-1 text-blue-700">
                                            {issue.location}
                                        </span>
                                    </div>
                                </button>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default IssueHeatmap;
