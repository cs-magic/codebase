import { getConvRow } from "./get-conv-row";
import { getRobustData, getRobustPreference } from "./get-robust-preference";
export const getConvPreference = async (message) => {
    const row = await getConvRow(message);
    return getRobustPreference(row);
};
export const getConvData = async (message) => {
    const row = await getConvRow(message);
    return getRobustData(row);
};
