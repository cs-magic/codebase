import { useSession } from "next-auth/react";
export const useUserSummary = () => {
    const user = useSession().data?.user;
    if (!!user && user.name && user.image)
        return user;
    return null;
};
export const useUserIsAdmin = () => {
    const user = useSession().data?.user;
    return user?.id === "mark";
};
