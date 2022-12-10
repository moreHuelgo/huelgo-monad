/**
 * Option
 */
export namespace MonadOption {
  export type Pass<T> = {
    _tag: 'pass'
    value: T
    error: null
  }

  export type Fail<E> = {
    _tag: 'fail'
    value: null
    error: E
  }

  export const passed = <T>(value: T): Pass<T> => ({
    _tag: 'pass',
    value,
    error: null,
  })

  export const failed = <E>(error: E): Fail<E> => ({
    _tag: 'fail',
    value: null,
    error,
  })

  export type Option<E, T> = Pass<T> | Fail<E>

  export const isPass = <T>(o: Option<never, T>): boolean => o._tag === 'pass'
  export const isFail = <E>(o: Option<E, never>): boolean => o._tag === 'fail'
}
