import { useEffect, useState } from "react";
import api from "../services/api";

import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import L from "leaflet";
import "leaflet.heat";

function Heatmap() {

    const [points, setPoints] = useState([]);

    useEffect(() => {
        loadIssues();
    }, []);

    async function loadIssues() {

        try {

            const res = await api.get("/issues/");

            const heatPoints = res.data
                .map(issue => {

                    if (!issue.location) return null;

                    const parts = issue.location.split(",");

                    if (parts.length < 2) return null;

                    const lat = parseFloat(parts[0]);
                    const lng = parseFloat(parts[1]);

                    if (isNaN(lat) || isNaN(lng)) return null;

                    // intensity based on severity
                    let intensity = 0.5;

                    if (issue.severity === "High") intensity = 1;
                    if (issue.severity === "Medium") intensity = 0.7;

                    return [lat, lng, intensity];
                })
                .filter(Boolean);

            setPoints(heatPoints);

        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {

        if (!points.length) return;

        const map = L.map("heatmap").setView([6.5244, 3.3792], 11);

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: "© OpenStreetMap"
        }).addTo(map);

        const heat = L.heatLayer(points, {
            radius: 25,
            blur: 15,
            maxZoom: 17,
        }).addTo(map);

        return () => {
            map.remove();
        };

    }, [points]);

    return (
        <div className="p-6">

            <h1 className="text-xl font-bold mb-4">
                Civic Issue Heatmap
            </h1>

            <div
                id="heatmap"
                className="h-[80vh] w-full rounded-xl"
            />

        </div>
    );
}

export default Heatmap;