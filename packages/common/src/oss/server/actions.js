"use server";
import { oss } from "./config";
export const getOssSignatureUrl = async (id) => oss.signatureUrl(id, {
    method: "PUT",
    "Content-Type": "image/png",
    // expires: 0, // default 1800
});
export const checkOssObjectExists = async (id) => {
    try {
        await oss.head(id);
        return true;
    }
    catch (e) {
        return false;
    }
};
