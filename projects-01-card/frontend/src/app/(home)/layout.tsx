import { Footer } from "../../components/footer";
import { Header } from "../../components/header";
import React, { PropsWithChildren } from "react";
import { FlexContainer } from "../../../../../packages-to-classify/ui/components/flex-container";

export default function HomeLayout({ children }: PropsWithChildren) {
  return (
    <FlexContainer orientation={"vertical"} className={"!p-0"}>
      <Header />

      <div className={"w-full grow overflow-auto"}>{children}</div>

      <Footer />
    </FlexContainer>
  );
}
