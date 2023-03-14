/**
 * @desc 가족은 항상 붙어있어야 해 (이주영 55세)
 */
export function mergeFamily<A, B>(a: A[], b: B[]): (A | B)[]
export function mergeFamily<A, B, C>(a: A[], b: B[], c?: C[]): (A | B | C)[]
export function mergeFamily<A, B, C, D>(a: A[], b: B[], c?: C[], d?: D[]): (A | B | C | D)[]
export function mergeFamily<A, B, C, D, E>(a: A[], b: B[], c?: C[], d?: D[], e?: E[]): (A | B | C | D | E)[]
export function mergeFamily<A, B, C, D, E, F>(a: A[], b: B[], c?: C[], d?: D[], e?: E[], f?: F[]): (A | B | C | D | E | F)[]
export function mergeFamily<A, B, C, D, E, F, G>(a: A[], b: B[], c?: C[], d?: D[], e?: E[], f?: F[], g?: G[]): (A | B | C | D | E | F | G)[]
export function mergeFamily<A, B, C, D, E, F, G, H>(
  a: A[],
  b: B[],
  c?: C[],
  d?: D[],
  e?: E[],
  f?: F[],
  g?: G[],
  h?: H[]
): (A | B | C | D | E | F | G | H)[] {
  let list: (A | B | C | D | E | F | G | H)[] = []
  for (const v of [a, b, c, d, e, f, g, h]) {
    if (v) {
      list = [...list, ...v]
    }
  }

  return list
}

interface SpreadFnParms<T> {
  fn: (v: T) => boolean
  idx: number
}

/**
 * @desc 가끔은 가족끼리 떨어져있을 시간도 필요하죠 (이동규 30세)
 */
export function spreadFamily<T>(lists: T[], ...spreadFns: SpreadFnParms<T>[]): T[][] {
  let list: T[][] = new Array(spreadFns.length).fill(undefined).map(() => [])

  for (const v of lists) {
    for (const { fn, idx } of spreadFns) {
      if (fn(v)) {
        list[idx].push(v)
      }
    }
  }

  return list
}
