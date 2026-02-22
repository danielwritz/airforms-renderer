import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export function Review({ component, values }) {
    return (_jsxs("section", { "aria-label": component.label, children: [_jsx("h3", { children: component.label }), _jsx("pre", { children: JSON.stringify(values, null, 2) })] }));
}
