export type IBaseResponse = {
    id?: string;
    tStart?: Date | null;
    tEnd?: Date | null;
    content?: string | null;
    error?: string | null;
    updatedAt?: Date;
};
export type IArticleSummaryParsed = {
    title?: string;
    description?: string;
    mindmap?: string;
    comment?: string;
    tags?: string[];
};
