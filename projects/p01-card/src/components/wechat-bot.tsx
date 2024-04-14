"use client";

import { useAtom } from "jotai";
import { Button } from "../../../../packages/common-ui-shadcn/components/button";
import { LabelLine } from "../../../../packages/common-ui/components/label-line";
import { checkBot, startBot, stopBot } from "../bot.func";
import { botStateAtom } from "../store/bot.atom";
import { StandardCard } from "./standard-card";

export const WechatBotComp = () => {
  const [state, setState] = useAtom(botStateAtom);

  return (
    <StandardCard title={"wechat bot"}>
      <LabelLine title={"state"}>{state}</LabelLine>

      <Button
        onClick={async () => {
          setState(JSON.stringify(await checkBot()));
        }}
      >
        refresh
      </Button>

      <Button onClick={() => startBot()}>start</Button>

      <Button onClick={() => stopBot()}>stop</Button>
    </StandardCard>
  );
};
