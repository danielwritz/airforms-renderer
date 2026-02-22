import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo, useState } from 'react';
import { DateInput } from './components/DateInput';
import { MapPinInput } from './components/MapPinInput';
import { NumberInput } from './components/NumberInput';
import { Review } from './components/Review';
import { SelectInput } from './components/SelectInput';
import { SliderInput } from './components/SliderInput';
import { TextArea } from './components/TextArea';
import { TextInput } from './components/TextInput';
import { validateComponent } from './validation';
export function ChatUIRenderer({ frame, onSubmit, onBack, onReplace, disabled }) {
    const [values, setValues] = useState(() => ({ ...frame.state.values }));
    const [errors, setErrors] = useState({});
    const renderedComponents = useMemo(() => frame.components.map((component) => {
        const value = values[component.id];
        const error = errors[component.id];
        const update = (nextValue) => {
            setValues((prev) => ({ ...prev, [component.id]: nextValue }));
            setErrors((prev) => ({ ...prev, [component.id]: '' }));
        };
        switch (component.type) {
            case 'text':
                return _jsx(TextInput, { component: component, value: String(value ?? ''), disabled: disabled, error: error, onChange: update }, component.id);
            case 'textarea':
                return _jsx(TextArea, { component: component, value: String(value ?? ''), disabled: disabled, error: error, onChange: update }, component.id);
            case 'date':
                return _jsx(DateInput, { component: component, value: String(value ?? ''), disabled: disabled, error: error, onChange: update }, component.id);
            case 'number':
                return _jsx(NumberInput, { component: component, value: String(value ?? ''), disabled: disabled, error: error, onChange: update }, component.id);
            case 'select':
                return _jsx(SelectInput, { component: component, value: String(value ?? ''), disabled: disabled, error: error, onChange: update }, component.id);
            case 'slider': {
                return _jsx(SliderInput, { component: component, value: Number(value ?? component.min), disabled: disabled, error: error, onChange: update }, component.id);
            }
            case 'map_pin':
                return _jsx(MapPinInput, { component: component, value: value ?? undefined, disabled: disabled, error: error, onChange: update }, component.id);
            case 'review':
                return _jsx(Review, { component: component, values: values }, component.id);
            default:
                return null;
        }
    }), [disabled, errors, frame.components, values]);
    const handlePrimaryAction = () => {
        const nextErrors = frame.components.reduce((accumulator, component) => {
            const error = validateComponent(component, values[component.id]);
            if (error) {
                accumulator[component.id] = error;
            }
            return accumulator;
        }, {});
        if (Object.keys(nextErrors).length > 0) {
            setErrors(nextErrors);
            return;
        }
        if (frame.primaryAction.action.type === 'ui_back') {
            onBack?.(frame.frameId);
            return;
        }
        if (frame.primaryAction.action.type === 'ui_replace') {
            onReplace?.(frame.frameId);
            return;
        }
        onSubmit({
            type: 'ui_submit',
            frameId: frame.frameId,
            values
        });
    };
    return (_jsxs("form", { "aria-label": frame.title, onSubmit: (event) => {
            event.preventDefault();
            handlePrimaryAction();
        }, children: [_jsx("h2", { children: frame.title }), renderedComponents, _jsx("button", { type: "submit", disabled: disabled, children: frame.primaryAction.label })] }));
}
