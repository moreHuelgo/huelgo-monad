/////////////////////////////////////////// fallThrough ///////////////////////////////////////////////
interface fallThroughParams<T, E> {
  value: T
  failBox: E[]
  isErrorCond: (v: E) => boolean
}

/**
 * @desc 모든 함수들의대해서 검증한 후 결과값을 리턴합니다.
 * @returns {failReasons} 실패 이유들
 * @returns {totalCount} 전체 시도 함수 개수
 * @returns {successCount} 성공 함수 개수
 * @returns {failCount} 실패 함수 개수
 */
export function fallThrough<A, E>(
  { value }: fallThroughParams<A, E>,
  fn1?: (value: A) => E
): { failReasons: E[]; totalCount: number; successCount: number; failCount: number }
export function fallThrough<A, E>(
  { value }: fallThroughParams<A, E>,
  fn1?: (value: A) => E,
  fn2?: (value: A) => E
): { failReasons: E[]; totalCount: number; successCount: number; failCount: number }
export function fallThrough<A, E>(
  { value }: fallThroughParams<A, E>,
  fn1?: (value: A) => E,
  fn2?: (value: A) => E,
  fn3?: (value: A) => E
): { failReasons: E[]; totalCount: number; successCount: number; failCount: number }
export function fallThrough<A, E>(
  { value }: fallThroughParams<A, E>,
  fn1?: (value: A) => E,
  fn2?: (value: A) => E,
  fn3?: (value: A) => E,
  fn4?: (value: A) => E
): { failReasons: E[]; totalCount: number; successCount: number; failCount: number }
export function fallThrough<A, E>(
  { value }: fallThroughParams<A, E>,
  fn1?: (value: A) => E,
  fn2?: (value: A) => E,
  fn3?: (value: A) => E,
  fn4?: (value: A) => E,
  fn5?: (value: A) => E
): { failReasons: E[]; totalCount: number; successCount: number; failCount: number }
export function fallThrough<A, E>(
  { value }: fallThroughParams<A, E>,
  fn1?: (value: A) => E,
  fn2?: (value: A) => E,
  fn3?: (value: A) => E,
  fn4?: (value: A) => E,
  fn5?: (value: A) => E,
  fn6?: (value: A) => E
): { failReasons: E[]; totalCount: number; successCount: number; failCount: number }
export function fallThrough<A, E>(
  { value }: fallThroughParams<A, E>,
  fn1?: (value: A) => E,
  fn2?: (value: A) => E,
  fn3?: (value: A) => E,
  fn4?: (value: A) => E,
  fn5?: (value: A) => E,
  fn6?: (value: A) => E,
  fn7?: (value: A) => E
): { failReasons: E[]; totalCount: number; successCount: number; failCount: number }
export function fallThrough<A, E>(
  { value, failBox, isErrorCond }: fallThroughParams<A, E>,
  fn1?: (value: A) => E,
  fn2?: (value: A) => E,
  fn3?: (value: A) => E,
  fn4?: (value: A) => E,
  fn5?: (value: A) => E,
  fn6?: (value: A) => E,
  fn7?: (value: A) => E,
  fn8?: (value: A) => E
): { failReasons: E[]; totalCount: number; successCount: number; failCount: number } {
  let [totalCount, successCount, failCount] = [0, 0, 0]

  for (const fn of [fn1, fn2, fn3, fn4, fn5, fn6, fn7, fn8].filter((it) => it)) {
    ++totalCount
    const result = fn(value)

    if (isErrorCond(result)) {
      failCount++
      failBox.push(result)
      continue
    }

    successCount++
  }

  return {
    failReasons: failBox,
    failCount,
    successCount,
    totalCount,
  }
}

/////////////////////////////////////////// breakThrough ///////////////////////////////////////////////

interface breakThroughParams<T, E> {
  value: T
  isErrorCond: (e: E) => boolean
}

/**
 * @desc 중간에 에러 발생 시 해당 에러를 반한홥니다
 */
export function breakThrough<A, E>(breakParams: breakThroughParams<A, E>, fn1?: (a: A) => E): E
export function breakThrough<A, E>(breakParams: breakThroughParams<A, E>, fn1?: (a: A) => E, fn2?: (b: A) => E): E
export function breakThrough<A, E>(breakParams: breakThroughParams<A, E>, fn1?: (a: A) => E, fn2?: (b: A) => E, fn3?: (c: A) => E): E
export function breakThrough<A, E>(
  breakParams: breakThroughParams<A, E>,
  fn1?: (a: A) => E,
  fn2?: (b: A) => E,
  fn3?: (c: A) => E,
  fn4?: (d: A) => E
): E
export function breakThrough<A, E>(
  breakParams: breakThroughParams<A, E>,
  fn1?: (a: A) => E,
  fn2?: (b: A) => E,
  fn3?: (c: A) => E,
  fn4?: (d: A) => E,
  fn5?: (e: A) => E
): E
export function breakThrough<A, E>(
  breakParams: breakThroughParams<A, E>,
  fn1?: (a: A) => E,
  fn2?: (b: A) => E,
  fn3?: (c: A) => E,
  fn4?: (d: A) => E,
  fn5?: (e: A) => E,
  fn6?: (f: A) => E
): E
export function breakThrough<A, E>(
  breakParams: breakThroughParams<A, E>,
  fn1?: (a: A) => E,
  fn2?: (b: A) => E,
  fn3?: (c: A) => E,
  fn4?: (d: A) => E,
  fn5?: (e: A) => E,
  fn6?: (f: A) => E,
  fn7?: (g: A) => E
): E
export function breakThrough<A, E>(
  breakParams: breakThroughParams<A, E>,
  fn1?: (a: A) => E,
  fn2?: (b: A) => E,
  fn3?: (c: A) => E,
  fn4?: (d: A) => E,
  fn5?: (e: A) => E,
  fn6?: (f: A) => E,
  fn7?: (g: A) => E,
  fn8?: (h: A) => E
): E {
  const { value, isErrorCond } = breakParams

  for (const fn of [fn1, fn2, fn3, fn4, fn5, fn6, fn7, fn8].filter((it) => it)) {
    const result = fn(value)
    if (isErrorCond(result)) {
      return result
    }
  }

  return null
}
