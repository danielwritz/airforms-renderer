import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export function SliderInput({ component, value, disabled, error, onChange }) {
    return (_jsxs("label", { children: [_jsx("span", { children: component.label }), _jsx("input", { type: "range", min: component.min, max: component.max, step: component.step ?? 1, value: value, disabled: disabled, "aria-invalid": Boolean(error), onChange: (event) => onChange(Number(event.target.value)) }), _jsx("output", { children: value }), error ? _jsx("small", { role: "alert", children: error }) : null] }));
}
