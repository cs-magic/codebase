"use client"
import React from "react"
import { useAtom } from "jotai"
import {
  testPersistedStringStorageArrEmptyAtom,
  testPersistedStringStorageArrNotEmptyAtom,
  testPersistedStringStorageStrEmptyAtom,
  testPersistedStringStorageStrNotEmptyAtom,
  testPersistedStringStorageStrNotEmptyWithDeclarationAtom,
} from "../../../test/state-management/atom"

const HomeMain = () => {
  const [strEmpty] = useAtom(testPersistedStringStorageStrEmptyAtom)
  const [strNotEmpty] = useAtom(testPersistedStringStorageStrNotEmptyAtom)
  const [strNotEmptyWithDeclaration] = useAtom(
    testPersistedStringStorageStrNotEmptyWithDeclarationAtom,
  )
  const [arrEmpty] = useAtom(testPersistedStringStorageArrEmptyAtom)
  const [arrNotEmpty] = useAtom(testPersistedStringStorageArrNotEmptyAtom)
  console.log({
    strEmpty,
    strNotEmpty,
    strNotEmptyWithDeclaration,
    arrEmpty,
    arrNotEmpty,
  })

  return (
    <div
      className={
        "h-full max-w-2xl sm:w-3/5 mx-auto flex flex-col items-center gap-4"
      }
    >
      <div className={"h-1/3 flex flex-col justify-end mb-8"}>
        {/*<BrandTitle />*/}
      </div>

      {/*<TV />*/}

      {/*<HomeSelector />*/}

      {/*<QueryInHomePage />*/}
    </div>
  )
}

export default HomeMain
