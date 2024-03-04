"use client"
import React from "react"
import { Header } from "@/components/header"
import { BrandingFooter } from "@/components/footer"
import { HomeMain } from "@/components/home-main"

export default function HomePage() {
  return (
    <>
      <Header />

      <div className={"grow"}>
        <HomeMain />
      </div>

      <BrandingFooter />
    </>
  )
}
