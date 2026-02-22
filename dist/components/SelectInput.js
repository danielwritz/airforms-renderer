import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export function SelectInput({ component, value, disabled, error, onChange }) {
    return (_jsxs("label", { children: [_jsx("span", { children: component.label }), _jsxs("select", { value: value, disabled: disabled, "aria-invalid": Boolean(error), onChange: (event) => onChange(event.target.value), children: [_jsx("option", { value: "", children: "Select\u2026" }), component.options.map((option) => (_jsx("option", { value: option.value, children: option.label }, option.value)))] }), error ? _jsx("small", { role: "alert", children: error }) : null] }));
}
