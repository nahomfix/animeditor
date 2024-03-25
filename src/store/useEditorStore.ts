import { create } from "zustand";

interface EditorState {
    animationJSON: any | null;
    undos: string[];
    redos: string[];
    colors: any[];
    layers: any[];
}

interface EditorActions {
    setAnimationJSON: (animationJSON: any) => void;
    setUndos: (undos: string[]) => void;
    setRedos: (redos: string[]) => void;
    setColors: (colors: any[]) => void;
    setLayers: (layers: any[]) => void;
}

export const useEditorStore = create<EditorState & EditorActions>((set) => ({
    animationJSON: null,
    undos: [],
    redos: [],
    colors: [],
    layers: [],
    setAnimationJSON: (animationJSON) =>
        set({
            animationJSON,
        }),
    setUndos: (undos) =>
        set({
            undos,
        }),
    setRedos: (redos) =>
        set({
            redos,
        }),
    setColors: (colors) =>
        set({
            colors,
        }),
    setLayers: (layers) =>
        set({
            layers,
        }),
}));
