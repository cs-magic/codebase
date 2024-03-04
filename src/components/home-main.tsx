"use client"
import { BrandTitle } from "@/components/branding"
import { HomeSelector } from "@/components/home-selector"
import { QueryInHomePage } from "@/components/query-in-home-page"
import React from "react"
import { useAtom } from "jotai"
import {
  testPersistedStringStorageStrNotEmptyAtom,
  testPersistedStringStorageArrEmptyAtom,
  testPersistedStringStorageArrNotEmptyAtom,
  testPersistedStringStorageStrEmptyAtom,
  testPersistedStringStorageStrNotEmptyWithDeclarationAtom,
} from "../../test/state-management/atom"

export const HomeMain = () => {
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
        <BrandTitle />
      </div>

      {/*<TV />*/}

      <HomeSelector />

      <QueryInHomePage />
    </div>
  )
}
