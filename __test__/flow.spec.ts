import { flow } from '../src/flow/index'

describe('flow test', () => {
  it('[TEST] Calculator', (done) => {
    const v = flow<number, number>(
      10,
      (num) => num + 20,
      (num) => num * 20,
      (num) => num / 10
    )

    expect(v).toBe(60)
    done()
  })

  it('[TEST] Attach String', (done) => {
    const v = flow<string, number>(
      'hello',
      (str: string) => str.concat(' my name is leedonggyu'),
      (str: string) => str.substring(0, 5),
      (str: string) => str.length
    )

    expect(v).toBe(5)

    done()
  })
})
