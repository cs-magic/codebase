declare const miscMixin: <MixinBase extends unknown>(mixinBase: MixinBase) => abstract new (...args: any[]) => {
    toString(): string;
    /**
     * Check whether the puppet is work property.
     *  - If the puppet is work, it will emit a 'dong' event.
     *  - If the puppet is not work, it will not emit any 'dong' event.
     */
    ding(data?: string): void;
    /**
      * Get the NPM name of the Puppet
      */
    name(): string;
    /**
      * Get version from the Puppet Implementation
      */
    version(): string;
    /**
      * will be used by semver.satisfied(version, range)
      */
    wechatyVersionRange(strict?: boolean): string;
};
export { miscMixin };
