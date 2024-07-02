import { logger } from "@cs-magic/log/logger";
import { chromium, } from "playwright";
export class BaseSimulator {
    driver;
    browser = null;
    page;
    launchOptions;
    constructor(driverType = "playwright", launchOptions) {
        logger.info("-- init UniParserBot: ", { driverType });
        // Or 'firefox' or 'webkit'.
        this.driver = chromium;
        this.launchOptions = launchOptions ?? {};
        process.on("exit", () => this.cleanup());
        process.on("SIGINT", () => this.cleanup());
        process.on("SIGTERM", () => this.cleanup());
    }
    async cleanup() {
        if (this.browser)
            await this.browser.close();
        process.exit();
    }
    async initPage() {
        if (!this.page) {
            logger.info("-- opening browser");
            this.browser = await this.driver.launch({
                downloadsPath: "/tmp",
                ...this.launchOptions,
            });
            this.page = (await this.browser.newPage({
                screen: {
                    width: 1080,
                    height: 720,
                },
            }));
        }
        return this.page;
    }
}
