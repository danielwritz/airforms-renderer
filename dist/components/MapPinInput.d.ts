import 'leaflet/dist/leaflet.css';
import type { MapPinComponent, MapValue } from '../types';
interface Props {
    component: MapPinComponent;
    value?: MapValue;
    disabled?: boolean;
    error?: string;
    onChange: (value: MapValue) => void;
}
export declare function MapPinInput({ component, value, disabled, error, onChange }: Props): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=MapPinInput.d.ts.map