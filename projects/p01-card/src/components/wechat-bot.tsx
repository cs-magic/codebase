"use client";

import { useAtom } from "jotai";
import { useInit } from "../../../../packages/common-hooks/use-init";
import { Button } from "../../../../packages/common-ui-shadcn/components/button";
import { LabelLine } from "../../../../packages/common-ui/components/label-line";
import { env } from "../env";
import { botStateAtom } from "../store/bot.atom";
import { StandardCard } from "./standard-card";

export const WechatBotComp = () => {
  const [state, setState] = useAtom(botStateAtom);

  const ws = useInit<WebSocket>(() => {
    const socket = new WebSocket(env.NEXT_PUBLIC_SOCKET_URL!);

    socket.addEventListener("error", console.error);

    socket.addEventListener("open", function open() {
      socket.send("something");
    });

    socket.addEventListener("message", (event) => {
      console.log({ event });
    });

    return socket;
  });

  return (
    <StandardCard title={"wechat bot"}>
      <LabelLine title={"State"}>{state}</LabelLine>

      <LabelLine title={"Actions"}>
        <Button
          onClick={() => {
            ws?.send("/start 1");
          }}
        >
          start
        </Button>

        <Button
          onClick={() => {
            ws?.send("/stop");
          }}
        >
          stop
        </Button>
      </LabelLine>
    </StandardCard>
  );
};
