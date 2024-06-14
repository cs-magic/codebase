import dynamic from "next/dynamic"

export const ReactPlayerNoSSR = dynamic(() => import("react-player"), {
  ssr: false,
})

export const VideoReactNoSSR = dynamic(
  async () => (await import("video-react")).Player,
  {
    ssr: false,
  },
)
