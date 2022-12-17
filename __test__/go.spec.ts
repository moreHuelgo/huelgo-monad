import { asyncGo, go, mixedGo } from '../src/pipe/go'

describe('go test', () => {
  it('[TEST] go', (done) => {
    const str = go(
      'leedonggyu',
      (str: string) => str.replace('e', 'K'),
      (str: string) => str.substring(0, 3)
    )

    expect(str).toBe('lKe')
    done()
  })

  it('[TEST] async go', async () => {
    const addP1 = (num: number) => new Promise((res, rej) => res(num + 10))
    const minP1 = (num: number) => new Promise((res, rej) => res(num - 5))
    const mulP1 = (num: number) => new Promise((res, rej) => res(num * 100))

    const value = await asyncGo(10, addP1, minP1, mulP1)

    expect(value.isOk).toBe(true)
    expect(value.value).toBe(1500)
  })

  it('[TEST] async go fail', async () => {
    const addP1 = (num: number) => new Promise((res, rej) => res(num + 10))
    const minP1 = (num: number) => new Promise((res, rej) => res(num - 5))
    const mulP1 = (num: number) => new Promise((res, rej) => rej(`${num} is too low`))

    const value = await asyncGo(10, addP1, minP1, mulP1)

    expect(value.isOk).toBe(false)
    expect(value.value).toBe(`15 is too low`)
  })

  it('[TEST] mixed go pass', async () => {
    const mul = async (num) => num * 10

    const passValue = await mixedGo(
      10,
      (num: number) => num + 10,
      mul,
      (num: number) => num + 20,
      mul
    )

    expect(passValue.isOk).toBe(true)
    expect(passValue.value).toBe(2200)
  })

  it('[TEST] mixed go fail', async () => {
    const mul = async (num) => {
      throw Error('err')
    }

    const failValue = await mixedGo(
      10,
      (num: number) => num + 10,
      mul,
      (num: number) => num + 20,
      mul
    )
    expect(failValue.isOk).toBe(false)
  })
})
