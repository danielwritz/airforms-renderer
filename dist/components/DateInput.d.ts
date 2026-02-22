import type { DateComponent } from '../types';
interface Props {
    component: DateComponent;
    value: string;
    disabled?: boolean;
    error?: string;
    onChange: (value: string) => void;
}
export declare function DateInput({ component, value, disabled, error, onChange }: Props): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=DateInput.d.ts.map