//////////////////////////////////////////////// interface ////////////////////////////////////////////

const isPromise = (fn) => fn?.constructor?.name === 'AsyncFunction'
//////////////////////////////////////////////// interface ////////////////////////////////////////////

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
export const asyncGo = async <T>(initParams: T, ...promiseFns): Promise<{ isOk: boolean; value: T }> => {
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
export const mixedGo = async <T>(initParams: T, ...funcs): Promise<{ isOk: boolean; value: T }> => {
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

/**
 * condition go
 */
