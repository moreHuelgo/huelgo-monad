import { go, asyncGo } from '../src/pipe/go'

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
})
