import { IUploadFile } from "../schema";
export declare const useUploadFile: () => {
    status: IUploadFile;
    upload: (file: File) => Promise<void>;
};
