interface GoReturnParmas<E, T> {
  isOk: Boolean
  value?: T
  error?: E
}
const isPromise = (fn) => fn?.constructor?.name === 'AsyncFunction'

/////////////////////////////////////////////////// go, asyncGo, mixedGo ////////////////////////////////////////

/**
 * @desc 앞으로 당당히 걸어가자
 * @param {initParam} initParam 초기값
 * @param {...fns} ...fns 조건 함수 들
 */
export const go = <T>(initParam: T, ...fns): T => {
  for (const fn of fns) initParam = fn(initParam)
  return initParam
}

/**
 * @desc 힘들지만 앞으로 당당히 걸어가자
 * @param {initParams} initParams 초기값
 * @param {...fns} ...fns 조건 함수 들
 */
export const asyncGo = async <T>(initParams: T, ...promiseFns): Promise<GoReturnParmas<string, T>> => {
  try {
    for (const promiseFn of promiseFns) initParams = await promiseFn(initParams)
    return {
      isOk: true,
      value: initParams,
    }
  } catch (e) {
    return {
      isOk: false,
      value: e,
    }
  }
}

/**
 * @desc 복잡하지만 앞으로 당당히 걸어가자
 * @param {initParams} initParams 초기값
 * @param {...fns} ...fns 조건 함수 들
 */
export const mixedGo = async <T>(initParams: T, ...funcs): Promise<GoReturnParmas<string, T>> => {
  try {
    for (const func of funcs) {
      if (isPromise(func)) {
        initParams = await func(initParams)
        continue
      }

      initParams = func(initParams)
    }

    return {
      isOk: true,
      value: initParams,
    }
  } catch (e) {
    return {
      isOk: false,
      value: e,
    }
  }
}

/////////////////////////////////////////////////// conditionGo, conditionMixedGo ////////////////////////////////////////
interface ConditionParmas<E, T> {
  func: (num: T) => boolean | Promise<boolean>
  error: E
}

/**
 * @desc 조건을 이겨내보자
 * @param {initParam} initParam 초깃값
 * @param {isCondition} isCondition 조건값
 * @param {conditions} conditions 조건함수들
 */
export function conditionGo<E, T>(initParam: T, isCondition: boolean, ...conditions: ConditionParmas<E, T>[]): GoReturnParmas<E, T> {
  for (const { func, error } of conditions) {
    if (isCondition !== func(initParam)) {
      return {
        isOk: false,
        error,
      }
    }
  }

  return {
    isOk: true,
  }
}

/**
 * @desc 힘든조건도 이겨내보자
 * @param {initParams} initParams 초깃값
 * @param {isCondition} isCondition 조건값
 * @param {condition} condition 조건함수들
 */
export async function conditionMixedGo<E, T>(
  initParams: T,
  isCondition: boolean,
  ...condition: ConditionParmas<E, T>[]
): Promise<GoReturnParmas<E, T>> {
  try {
    for (const { func, error } of condition) {
      // promise
      if (isPromise(func)) {
        if (isCondition !== (await func(initParams))) {
          return {
            isOk: false,
            error,
          }
        }
      }

      if (isCondition !== func(initParams)) {
        return {
          isOk: false,
          error,
        }
      }
    }

    return {
      isOk: true,
    }
  } catch (e) {
    return {
      isOk: false,
      error: e,
    }
  }
}
