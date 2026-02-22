import type { NumberComponent } from '../types';
interface Props {
    component: NumberComponent;
    value: string;
    disabled?: boolean;
    error?: string;
    onChange: (value: string) => void;
}
export declare function NumberInput({ component, value, disabled, error, onChange }: Props): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=NumberInput.d.ts.map