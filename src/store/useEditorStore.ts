import { create } from "zustand";

interface EditorState {
    animationJSON: any | null;
    frameRate: number;
    duration: number;
    width: number;
    height: number;
    undos: string[];
    redos: string[];
    colors: any[];
    layers: any[];
    selectedLayerId: number | null;
    frames: string[];
}

interface EditorActions {
    setAnimationJSON: (animationJSON: any) => void;
    setUndos: (undos: string[]) => void;
    setRedos: (redos: string[]) => void;
    setColors: (colors: any[]) => void;
    setLayers: (layers: any[]) => void;
    setWidth: (width: number) => void;
    setHeight: (height: number) => void;
    setFrameRate: (frameRate: number) => void;
    setDuration: (duration: number) => void;
    setSelectedLayerId: (layerId: number) => void;
    setFrames: (frames: string[]) => void;
}

export const useEditorStore = create<EditorState & EditorActions>((set) => ({
    animationJSON: null,
    frameRate: 0,
    duration: 0,
    width: 0,
    height: 0,
    undos: [],
    redos: [],
    colors: [],
    layers: [],
    selectedLayerId: null,
    frames: [],
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
    setWidth: (width: number) =>
        set({
            width,
        }),
    setHeight: (height: number) =>
        set({
            height,
        }),
    setFrameRate: (frameRate: number) =>
        set({
            frameRate,
        }),
    setDuration: (duration: number) =>
        set({
            duration,
        }),
    setSelectedLayerId: (layerId: number) =>
        set({
            selectedLayerId: layerId,
        }),
    setFrames: (frames: string[]) =>
        set({
            frames,
        }),
}));
