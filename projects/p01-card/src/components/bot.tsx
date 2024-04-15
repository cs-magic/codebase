"use client";

import { IWechatBotTransfer } from "@cs-magic/wechaty/schema";
import { useAtom } from "jotai";
import { QRCodeSVG } from "qrcode.react";
import { useInit } from "../../../../packages/common-hooks/use-init";
import { socketStatusMap } from "../../../../packages/common-transport/schema";
import { Button } from "../../../../packages/common-ui-shadcn/components/button";
import { cn } from "../../../../packages/common-ui-shadcn/utils";
import { FlexContainer } from "../../../../packages/common-ui/components/flex-container";
import { LabelLine } from "../../../../packages/common-ui/components/label-line";
import { env } from "../env";
import {
  botLoggedInAtom,
  botScanStatusAtom,
  botScanValueAtom,
  botSocketOpenedAtom,
  botUserAtom,
  ScanStatus,
} from "../store/bot.atom";
import { StandardCard } from "./standard-card";

export const Bot = () => {
  const [botScanValue, setBotScanValue] = useAtom(botScanValueAtom);
  const [botScanStatus, setBotScanStatus] = useAtom(botScanStatusAtom);
  const [botUser, setBotUser] = useAtom(botUserAtom);
  const [botSocketOpened, setBotSocketOpened] = useAtom(botSocketOpenedAtom);
  const [botLoggedIn, setBotLoggedIn] = useAtom(botLoggedInAtom);

  const socket = useInit<WebSocket>(() => {
    const socket = new WebSocket(env.NEXT_PUBLIC_SOCKET_URL!);

    socket.addEventListener("error", console.error);

    socket.addEventListener("open", () => {
      setBotSocketOpened(true);
    });

    socket.addEventListener("close", () => {
      setBotSocketOpened(false);
    });

    socket.addEventListener("message", (event: MessageEvent<string>) => {
      // console.log({ event });

      try {
        const data = JSON.parse(event.data) as IWechatBotTransfer;

        console.log("-- data: ", data);
        switch (data.type) {
          case "scan":
            setBotScanValue(data.data.value);
            setBotScanStatus(data.data.status);
            break;

          case "login":
            setBotUser(data.data);
            setBotLoggedIn(true);
            break;

          case "loggedIn":
            setBotLoggedIn(data.data);
            break;
        }
      } catch (e) {
        // prettyError(e);
      }
    });

    return socket;
  });

  console.log({ botUser });

  return (
    <FlexContainer
      orientation={"vertical"}
      className={
        cn()
        // "bg-cyan-950"
      }
    >
      <StandardCard title={"socket"}>
        {!socket ? (
          "Socket初始化中……"
        ) : (
          <>
            <LabelLine title={"readyState"}>
              {socketStatusMap[socket.readyState]}
            </LabelLine>
          </>
        )}
      </StandardCard>

      {botSocketOpened && (
        <>
          <StandardCard title={"bot-actions"}>
            <div className={"flex items-center gap-2"}>
              <Button
                disabled={botLoggedIn}
                onClick={() => {
                  socket?.send("/start 1");
                }}
              >
                Log In
              </Button>

              <Button
                disabled={!botUser || !botLoggedIn}
                onClick={() => {
                  socket?.send("/stop");
                }}
              >
                Pause
              </Button>

              <Button
                disabled={!botUser || !botLoggedIn}
                onClick={() => {
                  socket?.send("/logout");
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

          {botUser && (
            <StandardCard title={"bot-info"}>
              <div>id: {botUser?.id}</div>
              <div>name: {botUser?.name}</div>
            </StandardCard>
          )}
        </>
      )}
    </FlexContainer>
  );
};
