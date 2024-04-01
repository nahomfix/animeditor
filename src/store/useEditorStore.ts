import { create } from "zustand";
import { extractColors, extractUniqueColors } from "../utils/editor";

interface Action {
    id: string;
    data: any;
    timestamp: number;
}

interface EditorState {
    animationJSON: any | null;
    frameRate: number;
    duration: number;
    width: number;
    height: number;
    undos: Action[];
    redos: Action[];
    colors: any[];
    uniqueColors: any[];
    layers: any[];
    selectedLayerId: number | null;
    frames: string[];
    animationItem: any;
    opacity: number;
    scaleX: number;
    scaleY: number;
    positionX: number;
    positionY: number;
    rotation: number;
    timeline: any[];
}

interface EditorActions {
    setAnimationJSON: (animationJSON: any) => void;
    setUndos: (undos: Action[]) => void;
    setRedos: (redos: Action[]) => void;
    setColors: (colors: any[]) => void;
    setUniqueColors: (uniqueColors: any[]) => void;
    setLayers: (layers: any[]) => void;
    setWidth: (width: number) => void;
    setHeight: (height: number) => void;
    setFrameRate: (frameRate: number) => void;
    setDuration: (duration: number) => void;
    setSelectedLayerId: (layerId: number) => void;
    setFrames: (frames: string[]) => void;
    setAnimationItem: (animationItem: any) => void;
    resetSelectedLayerId: () => void;
    setOpacity: (opacity: number) => void;
    setScale: (scale: number[]) => void;
    setPosition: (position: number[]) => void;
    setRotation: (rotation: number) => void;
    setTimeline: (timeline: any[]) => void;
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
    uniqueColors: [],
    layers: [],
    selectedLayerId: null,
    frames: [],
    animationItem: null,
    opacity: 0,
    scaleX: 0,
    scaleY: 0,
    positionX: 0,
    positionY: 0,
    rotation: 0,
    timeline: [],
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
    setUniqueColors: (uniqueColors) =>
        set({
            uniqueColors,
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
    setAnimationItem: (animationItem: any) =>
        set({
            animationItem,
        }),
    resetSelectedLayerId: () =>
        set((prevState) => ({
            selectedLayerId: null,
            colors: extractColors(prevState.layers),
            uniqueColors: extractUniqueColors(prevState.layers),
        })),
    setOpacity: (opacity: number) =>
        set({
            opacity,
        }),
    setPosition: (position: number[]) =>
        set({
            positionX: position[0],
            positionY: position[1],
        }),
    setScale: (scale: number[]) =>
        set({
            scaleX: scale[0],
            scaleY: scale[1],
        }),
    setRotation: (rotation: number) =>
        set({
            rotation,
        }),
    setTimeline: (timeline: any[]) =>
        set({
            timeline,
        }),
}));
