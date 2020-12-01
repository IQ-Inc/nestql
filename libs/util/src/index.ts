import { Observable } from 'rxjs';

export type PromiseOrObservable<T> = Promise<T> | Observable<T>;

/** Recursively decays all fields that are of type `never` from `T`.
 * @example DecayNever<number> // yields number
 * @example DecayNever<{ x: number; y: string; z: never }> // yields { x: number; y: string }
 * @example DecayNever<{ x: number; y: { z: never } }> // yields { x: number }
 * @example DecayNever<{ x: number; y: { z: never, w: string } }> // yields { x: number, y: { w: string } }
 * @example DecayNever<{ a: { b: { c: never } } }> // yields never
 */
export type DecayNever<T> = T extends Record<string | number | symbol, unknown>
  ? FilteredKeys<{ [K in keyof T]: DecayNever<T[K]> }> extends never
    ? never
    : Pick<DecayNeverType<T>, FilteredKeys<DecayNeverType<T>>>
  : T;

type DecayNeverType<T> = { [K in keyof T]: DecayNever<T[K]> };

/** Returns a union of all keys of `T` where `T[K]` is not `never` */
type FilteredKeys<T> = {
  [K in keyof T]: T[K] extends never ? never : K;
}[keyof T];
