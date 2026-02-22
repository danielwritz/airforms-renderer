import type { TextareaComponent } from '../types';
interface Props {
    component: TextareaComponent;
    value: string;
    disabled?: boolean;
    error?: string;
    onChange: (value: string) => void;
}
export declare function TextArea({ component, value, disabled, error, onChange }: Props): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=TextArea.d.ts.map