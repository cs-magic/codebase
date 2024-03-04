"use client"
import { BrandTitle } from "@/components/branding"
import { HomeSelector } from "@/components/home-selector"
import { QueryInHomePage } from "@/components/query-in-home-page"
import React from "react"

export const HomeMain = () => {
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
