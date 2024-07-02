import { IUploadFile } from "../schema";
export declare const useUploadFiles: ({ onUploadChange, }: {
    onUploadChange?: (index: number, file: IUploadFile) => void;
}) => {
    upload: (files: FileList | File[]) => Promise<void>;
    isUploading: boolean;
};
