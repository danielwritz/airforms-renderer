import type { SliderComponent } from '../types';
interface Props {
    component: SliderComponent;
    value: number;
    disabled?: boolean;
    error?: string;
    onChange: (value: number) => void;
}
export declare function SliderInput({ component, value, disabled, error, onChange }: Props): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=SliderInput.d.ts.map