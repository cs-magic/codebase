import { FlexContainer } from "@cs-magic/common"

export default function TestCSSWrap() {
  return (
    <FlexContainer orientation={"vertical"}>
      <div className={"h-[180px] w-[240px] bg-cyan-800"}>
        <div
          className={"float-right flex h-full w-12 flex-col justify-end"}
          style={{
            shapeOutside: "inset(48px 0 calc(100% - 96px) 0)",
          }}
        />
        ascs scsccd ccdaxsxs x scscs ccdcdcascs scsccdccda xsx sxs cscs ccdc
        dcascss csc cdccd axsx sxsc scsc c dcdcas csscscc dc cdaxsx sxscs csccd
        cdc asc ssc sccdc cdaxsx sxscscs ccd cdc
      </div>
    </FlexContainer>
  )
}
