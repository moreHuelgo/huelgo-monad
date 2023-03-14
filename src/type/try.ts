type Pass<T> = {
  _tag: 'pass'
  value: T
  error: null
}

type Fail<E> = {
  _tag: 'fail'
  value: null
  error: E
}

/**
 * @desc 성공 및 실패의 대한 상세여부를 나타냄
 * @type {Pass<T>} 성공
 * @type {Fail<E>} 실패
 */
export type Try<E, T> = Pass<T> | Fail<E>

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

// CastringTry
export const castTry = <E, T>(value: T, error: E, conditionFn: (v: T) => boolean): Try<E, T> => {
  if (conditionFn(value)) {
    return passed(value)
  }

  return failed(error)
}

// Check to Try Type
export const isPass = <T>(o: Try<unknown, T>): o is Pass<T> => o._tag === 'pass'
export const isFail = <E>(o: Try<E, unknown>): o is Fail<E> => o._tag === 'fail'
