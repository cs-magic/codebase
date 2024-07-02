export declare const tvFullScreenAtom: import("jotai").PrimitiveAtom<boolean> & {
    init: boolean;
};
export declare const tvScreenOnAtom: import("jotai").PrimitiveAtom<boolean> & {
    init: boolean;
};
export declare const tvViewportAtom: import("jotai").PrimitiveAtom<IDimension> & {
    init: IDimension;
};
export declare const tvTargetWidthAtom: import("jotai").Atom<number>;
export declare const tvScaleAtom: import("jotai").Atom<number>;
export declare const getTvScale: ({ width, height }: IDimension) => number;
