import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { CircleMarker, MapContainer, TileLayer, useMap, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
const round = (value) => Math.round(value * 1000000) / 1000000;
const defaultCenter = { lat: 0, lng: 0 };
const defaultZoom = 2;
const selectedZoom = 13;
function MapClickSelector({ onSelect }) {
    useMapEvents({
        click(event) {
            onSelect({
                lat: round(event.latlng.lat),
                lng: round(event.latlng.lng)
            });
        }
    });
    return null;
}
function MapViewportTracker({ onViewportChange }) {
    const map = useMapEvents({
        moveend() {
            const center = map.getCenter();
            onViewportChange({
                lat: round(center.lat),
                lng: round(center.lng)
            }, map.getZoom());
        }
    });
    return null;
}
function MapController({ center, zoom, onMapReady }) {
    const map = useMap();
    useEffect(() => {
        map.setView([center.lat, center.lng], zoom, { animate: false });
    }, [map, center.lat, center.lng, zoom]);
    useEffect(() => {
        onMapReady(map);
    }, [map, onMapReady]);
    return null;
}
export function MapPinInput({ component, value, disabled, error, onChange }) {
    const [center, setCenter] = useState(() => value ?? defaultCenter);
    const [zoom, setZoom] = useState(() => (value ? selectedZoom : defaultZoom));
    const [map, setMap] = useState(null);
    useEffect(() => {
        if (value) {
            setCenter(value);
            setZoom(selectedZoom);
            return;
        }
        if (typeof navigator === 'undefined' || !navigator.geolocation) {
            return;
        }
        navigator.geolocation.getCurrentPosition((position) => {
            setCenter({
                lat: round(position.coords.latitude),
                lng: round(position.coords.longitude)
            });
            setZoom(selectedZoom);
        }, () => undefined, {
            enableHighAccuracy: true,
            timeout: 5000
        });
    }, [value]);
    const handleSelectPoint = (next) => {
        onChange({ lat: round(next.lat), lng: round(next.lng) });
        setCenter(next);
        setZoom((currentZoom) => Math.max(currentZoom, selectedZoom));
    };
    const handleSelectCenter = () => {
        if (map) {
            const currentCenter = map.getCenter();
            handleSelectPoint({ lat: currentCenter.lat, lng: currentCenter.lng });
            return;
        }
        handleSelectPoint(center);
    };
    const marker = value ?? null;
    return (_jsxs("div", { style: { display: 'grid', gap: 8 }, children: [_jsx("span", { children: component.label }), _jsx("div", { style: {
                    height: 280,
                    marginTop: 4,
                    border: '1px solid #d1d5db',
                    borderRadius: 12,
                    overflow: 'hidden',
                    backgroundColor: '#f8fafc'
                }, children: _jsxs(MapContainer, { center: [center.lat, center.lng], zoom: zoom, style: { height: '100%', width: '100%', display: 'block' }, scrollWheelZoom: !disabled, keyboard: !disabled, children: [_jsx(TileLayer, { attribution: '\u00A9 <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors', url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" }), _jsx(MapController, { center: center, zoom: zoom, onMapReady: setMap }), _jsx(MapClickSelector, { onSelect: handleSelectPoint }), _jsx(MapViewportTracker, { onViewportChange: (nextCenter, nextZoom) => {
                                setCenter(nextCenter);
                                setZoom(nextZoom);
                            } }), marker ? _jsx(CircleMarker, { center: [marker.lat, marker.lng], radius: 8, pathOptions: { color: '#2563eb' } }) : null] }) }), _jsx("button", { type: "button", disabled: disabled, onClick: handleSelectCenter, "aria-label": `${component.label} use center`, style: {
                    justifySelf: 'start',
                    border: '1px solid #2563eb',
                    backgroundColor: disabled ? '#e5e7eb' : '#2563eb',
                    color: disabled ? '#6b7280' : '#ffffff',
                    borderRadius: 8,
                    padding: '8px 12px',
                    fontWeight: 600,
                    cursor: disabled ? 'not-allowed' : 'pointer'
                }, children: "Use map center" }), _jsx("div", { style: { color: '#374151' }, children: marker ? `Selected: ${marker.lat.toFixed(6)}, ${marker.lng.toFixed(6)}` : `Center: ${center.lat.toFixed(6)}, ${center.lng.toFixed(6)}` }), error ? _jsx("small", { role: "alert", children: error }) : null] }));
}
