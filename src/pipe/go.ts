/**
 * go
 */
export const go = <T>(initParam: T, ...fns): T => {
  for (const fn of fns) initParam = fn(initParam)
  return initParam
}

/**
 * asyncGo
 */
export const asyncGo = async <E, T>(initParams: T, ...promiseFns): Promise<{ isOk: boolean; value: T }> => {
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
