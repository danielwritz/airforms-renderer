import type { UiFrame, UiSubmit } from './types';
export interface ChatUIRendererProps {
    frame: UiFrame;
    onSubmit: (submit: UiSubmit) => void;
    onBack?: (frameId: string) => void;
    onReplace?: (frameId: string) => void;
    disabled?: boolean;
}
export declare function ChatUIRenderer({ frame, onSubmit, onBack, onReplace, disabled }: ChatUIRendererProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=ChatUIRenderer.d.ts.map