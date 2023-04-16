export function flow<T, K>(p: T, ...fns: ((p: T) => any)[]): K {
  return fns.reduce((acc, fn) => fn(acc), p) as K
}
