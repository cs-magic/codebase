"use client";

import { IUserSummary } from "@cs-magic/prisma/schema/user.summary";
import { useSetAtom } from "jotai";
import { useEffect } from "react";
import { Label } from "../../../../packages/ui-shadcn/components/label";

import { config } from "../config";
import { cardUserRenderedAtom } from "../store/card.atom";
import { UserAvatar } from "./user-avatar";

export const CardHeader = ({ user }: { user?: IUserSummary | null }) => {
  const setUserRendered = useSetAtom(cardUserRenderedAtom);
  useEffect(() => {
    setUserRendered(false);
  }, [user?.image]);

  return (
    <div className={"flex items-center justify-between px-4 pb-2 pt-6 text-xs"}>
      <div className={"flex h-8 items-center justify-end gap-2"}>
        {user ? (
          <>
            <UserAvatar
              user={user}
              imageProps={{
                onLoad: () => {
                  setUserRendered(true);
                },
              }}
            />

            <Label
              className={
                "flex w-full items-center gap-2 text-primary-foreground"
              }
            >
              <span className={"mr-1 truncate text-lg font-bold"}>
                {user.name}
              </span>
              <span className={"text-nowrap"}>分享给你一张卡片</span>
              {/*{card?.id && `#${card.id}`}*/}
            </Label>
          </>
        ) : (
          "no user"
        )}
      </div>

      <div className={"flex items-center gap-2"}>
        {/*<span>{moment(card.updatedAt).format("MMMDo h:mm")}</span>*/}

        <div className={"shrink-0 text-lg font-medium text-primary-foreground"}>
          {config.name}
        </div>
      </div>
    </div>
  );
};
