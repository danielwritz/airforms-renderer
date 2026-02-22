import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export function TextArea({ component, value, disabled, error, onChange }) {
    return (_jsxs("label", { children: [_jsx("span", { children: component.label }), _jsx("textarea", { value: value, placeholder: component.placeholder, disabled: disabled, "aria-invalid": Boolean(error), onChange: (event) => onChange(event.target.value) }), error ? _jsx("small", { role: "alert", children: error }) : null] }));
}
