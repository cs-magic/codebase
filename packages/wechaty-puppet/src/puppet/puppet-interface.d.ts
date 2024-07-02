import type { Constructor } from 'clone-class';
import type { MixinProtectedProperty } from '../mixins/mod.js';
import type { PuppetSkeletonProtectedProperty } from './puppet-skeleton.js';
import type { Puppet } from './puppet-abstract.js';
type PuppetProtectedProperty = MixinProtectedProperty | PuppetSkeletonProtectedProperty;
type PuppetInterface = Omit<Puppet, PuppetProtectedProperty | `_${string}`>;
type PuppetConstructor = Constructor<PuppetInterface>;
export type { PuppetProtectedProperty, PuppetConstructor, PuppetInterface, };
