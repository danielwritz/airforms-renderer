import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const round = (value) => Math.round(value * 1000000) / 1000000;
export function MapPinInput({ component, value, disabled, error, onChange }) {
    const current = value ?? { lat: 0, lng: 0 };
    const handleSelectCenter = () => {
        onChange({ lat: round(current.lat), lng: round(current.lng) });
    };
    return (_jsxs("div", { children: [_jsx("span", { children: component.label }), _jsx("button", { type: "button", disabled: disabled, onClick: handleSelectCenter, "aria-label": `${component.label} select center`, children: "Select center point" }), _jsxs("div", { tabIndex: 0, role: "button", onKeyDown: (event) => (event.key === 'Enter' ? handleSelectCenter() : null), children: ["Map surface (", current.lat.toFixed(6), ", ", current.lng.toFixed(6), ")"] }), error ? _jsx("small", { role: "alert", children: error }) : null] }));
}
