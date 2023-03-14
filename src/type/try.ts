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

export type Try<E, T> = Pass<T> | Fail<E>

// CastringTry
export const castTry = <E, T>(value: T, error: E, errConditionFn: (v: T) => boolean): Try<E, T> => {
  if (errConditionFn(value)) {
    return passed(value)
  }

  return failed(error)
}

// Check to Try Type
export const isPass = <T>(o: Try<unknown, T>): o is Pass<T> => o._tag === 'pass'
export const isFail = <E>(o: Try<E, unknown>): o is Fail<E> => o._tag === 'fail'
