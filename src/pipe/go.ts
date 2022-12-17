interface GoReturnParmas<E, T> {
  isOk: Boolean
  value?: T
  error?: E
}
const isPromise = (fn) => fn?.constructor?.name === 'AsyncFunction'

/////////////////////////////////////////////////// go, asyncGo, mixedGo ////////////////////////////////////////
/**
 * 동기식 형태 함수형 프로그래밍
 * go
 */
export const go = <T>(initParam: T, ...fns): T => {
  for (const fn of fns) initParam = fn(initParam)
  return initParam
}

/**
 * 비동기식 형태 함수형 프로그래밍
 * asyncGo
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
 * 동기 + 비동시기 형태 함수형 프로그래밍
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
