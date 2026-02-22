import type { TextComponent } from '../types';
interface Props {
    component: TextComponent;
    value: string;
    disabled?: boolean;
    error?: string;
    onChange: (value: string) => void;
}
export declare function TextInput({ component, value, disabled, error, onChange }: Props): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=TextInput.d.ts.map