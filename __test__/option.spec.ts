import * as T from '../src/type/try'
describe('option test', () => {
  it('[TEST] option', () => {
    const option: T.Try<null, string> = {
      _tag: 'pass',
      value: 'hello world',
      error: null,
    }

    expect(option._tag).toBe('pass')
  })
})
