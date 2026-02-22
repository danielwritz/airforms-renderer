import type { SelectComponent } from '../types';
interface Props {
    component: SelectComponent;
    value: string;
    disabled?: boolean;
    error?: string;
    onChange: (value: string) => void;
}
export declare function SelectInput({ component, value, disabled, error, onChange }: Props): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=SelectInput.d.ts.map