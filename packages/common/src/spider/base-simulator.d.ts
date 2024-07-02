import { Browser as PlaywrightBrowser, BrowserType, LaunchOptions } from "playwright";
import { Page as PlaywrightPage } from "playwright-core";
import { Page as PuppetPage } from "puppeteer";
import { DriverType } from "./schema";
export type Page = PuppetPage & PlaywrightPage;
export declare class BaseSimulator {
    protected driver: BrowserType;
    protected browser: PlaywrightBrowser | null;
    protected page?: Page;
    launchOptions: LaunchOptions;
    constructor(driverType?: DriverType, launchOptions?: LaunchOptions);
    cleanup(): Promise<void>;
    initPage(): Promise<Page>;
}
