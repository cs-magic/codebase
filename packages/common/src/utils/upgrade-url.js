import { isClient } from "@cs-magic/common/env/utils/is-client";
export const upgradeUrl = (url) => isClient && location.href.includes("https")
    ? url.replace(/http:/g, "https:")
    : url;
