import localFont from "next/font/local"

export const cnPingFangFonts = localFont({
  src: [
    {
      path: "./fonts/PingFang-SC-Regular.ttf",
      weight: "400",
    },
    {
      path: "./fonts/PingFang-SC-Light.ttf",
      weight: "300",
    },
    {
      path: "./fonts/PingFang-SC-Bold.ttf",
      weight: "700",
    },
  ],
})
