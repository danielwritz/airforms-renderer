export type PrimitiveValue = string | number | boolean | null;
export type MapValue = {
    lat: number;
    lng: number;
};
export type FieldValue = PrimitiveValue | MapValue | Record<string, unknown>;
import type { ActionButton, Component as UiComponent, DateComponent, MapPinComponent, NumberComponent, ReviewComponent, SelectComponent, SliderComponent, TextComponent, TextareaComponent, UiFrame as SchemaUiFrame, UiSubmit as SchemaUiSubmit } from '@airforms/ui-schema';
export type { ActionButton, DateComponent, MapPinComponent, NumberComponent, ReviewComponent, SelectComponent, SliderComponent, TextComponent, TextareaComponent, UiComponent };
export interface UiFrame extends Omit<SchemaUiFrame, 'state' | 'components' | 'primaryAction'> {
    state: {
        values: Record<string, FieldValue>;
    };
    components: UiComponent[];
    primaryAction: ActionButton;
}
export interface UiSubmit extends Omit<SchemaUiSubmit, 'values'> {
    values: Record<string, FieldValue>;
}
//# sourceMappingURL=types.d.ts.map