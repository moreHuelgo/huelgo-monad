import { castTry, failed, isFail, isPass, passed } from '../src/type/index'

describe('try test', () => {
  it('pass', (done) => {
    const { _tag, value, error } = passed(10)
    expect(_tag).toBe('pass')
    expect(value).toBe(10)
    expect(error).toBe(null)
    done()
  })

  it('failed', (done) => {
    const { _tag, value, error } = failed('error')
    expect(_tag).toBe('fail')
    expect(value).toBe(null)
    expect(error).toBe('error')
    done()
  })

  it('isFailed', (done) => {
    const v = failed('error')
    expect(isFail(v)).toBe(true)
    done()
  })

  it('isSuccess', (done) => {
    const v = passed(10)
    expect(isPass(v)).toBe(true)
    done()
  })

  it('castring pass', (done) => {
    const num = castTry(10, null, (num) => num === 10)
    console.log(num)
    expect(isPass(num)).toBe(true)
    done()
  })

  it('casting fail', (done) => {
    const result = castTry(null, 'error', (err) => !!err)
    expect(isFail(result)).toBe(true)
    done()
  })
})
