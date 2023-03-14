type Some<T> = {
  _tag: 'some'
  value: T
}

type None = {
  _tag: 'none'
}

/**
 * @desc 성공 및 실패 여부만 나타앰
 * @type {Some<T>} 성공
 * @type {None} 실패
 */
export type Option<T> = Some<T> | None

export const some = <T>(value: T): Some<T> => ({
  _tag: 'some',
  value,
})

export const none = (): None => ({
  _tag: 'none',
})

export const isSome = <T>(o: Option<T>): o is Some<T> => o._tag === 'some'
export const isNone = (o: Option<unknown>): o is None => o._tag === 'none'

export const castOption = <T>(value: T, conditionFn: (v: T) => boolean): Option<T> => {
  if (conditionFn(value)) {
    return some(value)
  }

  return none()
}
