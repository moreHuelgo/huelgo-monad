interface conditionIfParams<T> {
  isProfit: (v: T) => boolean
  executeFn: (v: T) => T
}

/**
 * @desc 기존 if문의 대해서 가독성 높은 코드로 visualization한 함수입니다.
 * @params {isParallel} isParallel 다른 구문도 통과시킬건지 여부
 */
export function visualIF<T>(isParallel: boolean, v: T, a: conditionIfParams<T>): { result: T; correct: boolean; correctCount: number }
export function visualIF<T>(
  isParallel: boolean,
  v: T,
  a: conditionIfParams<T>,
  b?: conditionIfParams<T>
): { result: T; correct: boolean; correctCount: number }
export function visualIF<T>(
  isParallel: boolean,
  v: T,
  a: conditionIfParams<T>,
  b?: conditionIfParams<T>,
  c?: conditionIfParams<T>
): { result: T; correct: boolean; correctCount: number }
export function visualIF<T>(
  isParallel: boolean,
  v: T,
  a: conditionIfParams<T>,
  b?: conditionIfParams<T>,
  c?: conditionIfParams<T>,
  d?: conditionIfParams<T>
): { result: T; correct: boolean; correctCount: number }
export function visualIF<T>(
  isParallel: boolean,
  v: T,
  a: conditionIfParams<T>,
  b?: conditionIfParams<T>,
  c?: conditionIfParams<T>,
  d?: conditionIfParams<T>,
  e?: conditionIfParams<T>
): { result: T; correct: boolean; correctCount: number }
export function visualIF<T>(
  isParallel: boolean,
  v: T,
  a: conditionIfParams<T>,
  b?: conditionIfParams<T>,
  c?: conditionIfParams<T>,
  d?: conditionIfParams<T>,
  e?: conditionIfParams<T>,
  f?: conditionIfParams<T>
): { result: T; correct: boolean; correctCount: number }
export function visualIF<T>(
  isParallel: boolean,
  v: T,
  a: conditionIfParams<T>,
  b?: conditionIfParams<T>,
  c?: conditionIfParams<T>,
  d?: conditionIfParams<T>,
  e?: conditionIfParams<T>,
  f?: conditionIfParams<T>,
  g?: conditionIfParams<T>
): { result: T; correct: boolean; correctCount: number } {
  let [correct, correctCount] = [false, 0]
  for (const { isProfit, executeFn } of [a, b, c, d, e, f, g].filter((it) => it)) {
    if (isProfit(v)) {
      correct = true
      correctCount++

      v = executeFn(v)

      if (!isParallel)
        return {
          result: v,
          correct,
          correctCount,
        }
    }
  }

  return {
    result: v,
    correct,
    correctCount,
  }
}
