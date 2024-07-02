import { useState } from "react";
import { uploadFile } from "../upload";
export const useUploadFile = () => {
    const [status, setStatus] = useState({ status: "idle" });
    const upload = async (file) => {
        setStatus({ status: "running", input: file });
        const result = await uploadFile(file);
        setStatus({ status: "finished", input: file, ...result });
    };
    return { status, upload };
};
