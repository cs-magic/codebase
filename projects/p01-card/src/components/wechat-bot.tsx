"use client";

import { useAtom } from "jotai";
import { WebSocket } from "ws";
import { useInit } from "../../../../packages/common-hooks/use-init";
import { Button } from "../../../../packages/common-ui-shadcn/components/button";
import { LabelLine } from "../../../../packages/common-ui/components/label-line";
import { botStateAtom } from "../store/bot.atom";
import { StandardCard } from "./standard-card";

export const WechatBotComp = () => {
  const [state, setState] = useAtom(botStateAtom);

  const ws = useInit<WebSocket>(() => {
    const client = new WebSocket("ws://localhost:40414/bot");

    client.on("error", console.error);

    client.on("open", function open() {
      client.send("something");
    });

    client.on("message", function message(message: string) {
      console.log({ message });
    });

    return client;
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
