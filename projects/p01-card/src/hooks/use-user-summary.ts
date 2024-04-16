import { IUserSummary } from "@cs-magic/prisma/schema/user.summary";
import { useSession } from "next-auth/react";

export const useUserSummary = () => {
  const user = useSession().data?.user;

  if (!!user && user.name && user.image) return user as IUserSummary;
  return null;
};
