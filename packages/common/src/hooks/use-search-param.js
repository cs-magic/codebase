import { useSearchParams } from "next/navigation";
export const useSearchParam = (field) => {
    return useSearchParams().get(field);
};
