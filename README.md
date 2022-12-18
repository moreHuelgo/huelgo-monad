# Huelgo-Monad

## Desc

- No More Variables !!
- No More Try-Catch !!
- No More side effect !!

## Install

```
npm i huelgo-monad
```

## Go

### Go, AsyncGo, MixedGo

- Simple Functional Method

> go

```ts
///////////////////////////////////////// Go ////////////////////////////////////////

export const go = <T>(initParam: T, ...fns): T => {
  for (const fn of fns) initParam = fn(initParam)
  return initParam
}

// Example
const str = go(
  'leedonggyu',
  (str: string) => str.replace('e', 'K'),
  (str: string) => str.substring(0, 3)
)
```

> asyncGo

```ts
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

// Example
const addP1 = (num: number) => new Promise((res, rej) => res(num + 10))
const minP1 = (num: number) => new Promise((res, rej) => res(num - 5))
const mulP1 = (num: number) => new Promise((res, rej) => rej(`${num} is too low`))

const value = await asyncGo(10, addP1, minP1, mulP1)

expect(value.isOk).toBe(false)
expect(value.value).toBe(`15 is too low`)
```

> mixedGo

```ts
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

// Example
const mul = async (num) => num \* 10
const passValue = await mixedGo(
  10,
  (num: number) => num + 10,
  mul,
  (num: number) => num + 20,
  mul
)
```

### ConditionGo, ConditionMixedGo

- validation Functional Method

> conditionGo

```ts
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

// Example
const params = {
  salonKey: 'salonKey',
  employeeKey: 'employeeKey',
  customerKey: 'customerKey',
  eventKey: 'eventKey',
  price: 0,
}

const isTrue = conditionGo<string, typeof params>(
  params,
  true,
  { func: ({ salonKey }) => !!salonKey, error: 'not exites salonKey' },
  { func: ({ employeeKey }) => !!employeeKey, error: 'not exites employeeKey' },
  { func: ({ customerKey }) => !!customerKey, error: 'not exites customerKey' },
  { func: ({ eventKey }) => !!eventKey, error: 'not exites eventKey' },
  { func: ({ price }) => price >= 0, error: 'price is not -' }
)
```

## Types

- help use Functional Programming well

- Try

```ts
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

type Try<E, T> = Pass<T> | Fail<E>

// Example
const option: T.Try<null, string> = {
  _tag: 'pass',
  value: 'hello world',
  error: null,
}
```
