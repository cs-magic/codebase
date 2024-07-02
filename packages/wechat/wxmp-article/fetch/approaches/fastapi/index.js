import { backendApi } from "@cs-magic/common/api-client/backend-api";
export const fetchWxmpArticleViaFastapi = async (url, options) => {
    const { data } = await backendApi.get(`/spider/parse-url`, {
        params: {
            url,
            summary_model: options?.model,
            md_with_img: options?.withImage,
        },
    });
    data.time = new Date(data.time);
    return data;
};
