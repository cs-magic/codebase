"use client";

import { useAtom } from "jotai";
import { QRCodeSVG } from "qrcode.react";
import { prettyError } from "../../../../packages/common-common/pretty-error";
import { useInit } from "../../../../packages/common-hooks/use-init";
import { socketStatusMap } from "../../../../packages/common-transport/schema";
import { Button } from "../../../../packages/common-ui-shadcn/components/button";
import { cn } from "../../../../packages/common-ui-shadcn/utils";
import { FlexContainer } from "../../../../packages/common-ui/components/flex-container";
import { LabelLine } from "../../../../packages/common-ui/components/label-line";
import { env } from "../env";
import {
  botScanStatusAtom,
  botScanValueAtom,
  botSocketOpenedAtom,
  botStatusAtom,
  botUserAtom,
  ScanStatus,
} from "../store/bot.atom";
import { StandardCard } from "./standard-card";

export const WechatBotComp = () => {
  const [botScanValue, setBotScanValue] = useAtom(botScanValueAtom);
  const [botScanStatus, setBotScanStatus] = useAtom(botScanStatusAtom);
  const [botUser, setBotUser] = useAtom(botUserAtom);
  const [botStatus, setBotStatus] = useAtom(botStatusAtom);
  const [botSocketOpened, setBotSocketOpened] = useAtom(botSocketOpenedAtom);

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
        // prettyError(e);
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
                onClick={() => {
                  socket?.send("/start 1");
                }}
              >
                Log In
              </Button>

              <Button
                disabled={!botUser}
                onClick={() => {
                  socket?.send("/stop");
                }}
              >
                Pause
              </Button>

              <Button
                disabled={!botUser}
                onClick={() => {
                  socket?.send("/start");
                }}
              >
                Continue
              </Button>

              <Button
                disabled={!botUser}
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
