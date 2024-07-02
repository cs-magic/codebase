import type { PuppetOptions } from '../schemas/mod.js';
/**
 * Huan(202111): validateMixin can not put in the piped list,
 *  because it import-ed the `PuppetInterface` which is depended on `PuppetImpl`
 *  which caused circle-dependency.
 *
 * TODO: put `validateMixin` back in to piped list
 */
declare const MixinBase: any;
/**
 *
 * Puppet Base Class
 *
 * See: https://github.com/wechaty/wechaty/wiki/Puppet
 *
 */
declare abstract class Puppet extends MixinBase {
    /**
     * Must overwrite by child class to identify their version
     *
     * Huan(202111): we must put the `VERSION` in the outter side of all the Mixins
     *  because we do not know which Mixin will override the `VERSION`
     */
    static readonly VERSION: any;
    constructor(options?: PuppetOptions);
    /**
     * The child puppet provider should put all start code inside `onStart()`
     *  becasue the `onStart()` with be called by `start()` inside state management.
     *
     * The `try {} catch () {}` is not necessary inside `onStart()`
     *  because it will be handled by the framework.
     *
     * `onStop()` is the same as the `onStart()`
     *
     *  @see https://github.com/wechaty/puppet/issues/163
     */
    abstract onStart(): Promise<void>;
    abstract onStop(): Promise<void>;
}
export { Puppet, };
