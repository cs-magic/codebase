import { FlexContainer } from "../../../../../packages/common-ui/components/flex-container"

export default function TestCSSWrap() {
  return (
    <FlexContainer orientation={"vertical"}>
      <div className={"w-[240px] h-[180px] bg-cyan-800"}>
        <div
          className={"w-12 float-right h-full flex flex-col justify-end"}
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
