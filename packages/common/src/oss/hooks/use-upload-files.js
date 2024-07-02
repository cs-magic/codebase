import { useState } from "react";
import { uploadFile } from "../upload";
export const useUploadFiles = ({ onUploadChange, }) => {
    const [isUploading, setUploading] = useState(false);
    const upload = async (files) => {
        setUploading(true);
        const items = Object.values(files);
        void Promise.all(items.map(async (file, index) => {
            if (onUploadChange)
                onUploadChange(index, { status: "running", input: file });
            const result = await uploadFile(file);
            if (onUploadChange)
                onUploadChange(index, { status: "finished", input: file, ...result });
        })).finally(() => {
            setUploading(false);
        });
    };
    return { upload, isUploading };
};
