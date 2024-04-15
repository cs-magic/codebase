"use client";

import { useAtom } from "jotai";
import { QRCodeSVG } from "qrcode.react";
import { prettyError } from "../../../../packages/common-common/pretty-error";
import { useInit } from "../../../../packages/common-hooks/use-init";
import { Button } from "../../../../packages/common-ui-shadcn/components/button";
import { cn } from "../../../../packages/common-ui-shadcn/utils";
import { FlexContainer } from "../../../../packages/common-ui/components/flex-container";
import { LabelLine } from "../../../../packages/common-ui/components/label-line";
import { env } from "../env";
import {
  botScanStatusAtom,
  botScanValueAtom,
  botStatusAtom,
  botUserAtom,
  ScanStatus,
} from "../store/bot.atom";
import { StandardCard } from "./standard-card";

export type WechatEventType = "scan" | "logged-in" | "logged-out";

export const WechatBotComp = () => {
  const [botScanValue, setBotScanValue] = useAtom(botScanValueAtom);
  const [botScanStatus, setBotScanStatus] = useAtom(botScanStatusAtom);
  const [botUser, setBotUser] = useAtom(botUserAtom);
  const [botStatus, setBotStatus] = useAtom(botStatusAtom);

  const ws = useInit<WebSocket>(() => {
    const socket = new WebSocket(env.NEXT_PUBLIC_SOCKET_URL!);

    socket.addEventListener("error", console.error);

    socket.addEventListener("open", function open() {
      socket.send("something");
    });

    socket.addEventListener("message", (event: MessageEvent<string>) => {
      // console.log({ event });

      try {
        const data = JSON.parse(event.data) as
          | {
              type: "scan";
              data: { value: string; status: number };
            }
          | {
              type: "logged-in" | "logged-out";
              data: "todo";
            };

        console.log("-- data: ", data);
        switch (data.type) {
          case "scan":
            setBotScanValue(data.data.value);
            setBotScanStatus(data.data.status);
          case "logged-in":
          case "logged-out":
            console.log({ data });
            break;
        }
      } catch (e) {
        prettyError(e);
      }
    });

    return socket;
  });

  return (
    <FlexContainer
      orientation={"vertical"}
      className={
        cn()
        // "bg-cyan-950"
      }
    >
      <StandardCard title={"bot-info"}>
        <div>id: {botUser?.id}</div>
        <div>name: {botUser?.name}</div>
      </StandardCard>

      <StandardCard title={"bot-actions"}>
        <div className={"flex items-center gap-2"}>
          <Button
            onClick={() => {
              ws?.send("/start 1");
            }}
          >
            Start
          </Button>

          <Button
            onClick={() => {
              ws?.send("/stop");
            }}
          >
            Stop
          </Button>

          <Button
            onClick={() => {
              ws?.send("/logout");
            }}
          >
            Log Out
          </Button>
        </div>
      </StandardCard>

      {botScanStatus !== ScanStatus.Unknown && (
        <>
          <LabelLine title={"scan status"}>
            {ScanStatus[botScanStatus]}
          </LabelLine>

          <QRCodeSVG value={botScanValue} />
        </>
      )}
    </FlexContainer>
  );
};
