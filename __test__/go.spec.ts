import { asyncGo, conditionGo, go, mixedGo } from '../src/pipe/go'

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

  it('[TEST] condition Go Pass Case 1', (done) => {
    const isTrue = conditionGo<string, string>(
      'leedonggyu',
      true,
      { func: (_name) => _name.includes('lee'), error: 'not include lee' },
      { func: (_name) => _name.includes('dong'), error: 'not include dong' },
      { func: (_name) => _name.includes('gyu'), error: 'not include gyu' }
    )
    expect(isTrue.isOk).toBe(true)
    done()
  })

  it('[TEST] condition Pass Case 2', (done) => {
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

    expect(isTrue.isOk).toBe(true)
    done()
  })

  it('[TEST] condition Fail Case 1', (done) => {
    const params = {
      salonKey: null,
      employeeKey: 'employeeKey',
      customerKey: 'customerKey',
      eventKey: 'eventKey',
      price: 0,
    }

    const isFail = conditionGo<string, typeof params>(
      params,
      true,
      { func: ({ salonKey }) => !!salonKey, error: 'not exites salonKey' },
      { func: ({ employeeKey }) => !!employeeKey, error: 'not exites employeeKey' },
      { func: ({ customerKey }) => !!customerKey, error: 'not exites customerKey' },
      { func: ({ eventKey }) => !!eventKey, error: 'not exites eventKey' },
      { func: ({ price }) => price >= 0, error: 'price is not -' }
    )

    expect(isFail.isOk).toBe(false)
    expect(isFail.error).toBe('not exites salonKey')
    done()
  })
})
