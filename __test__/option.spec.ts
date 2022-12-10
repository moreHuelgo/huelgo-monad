import { MonadOption as O } from '../src/type'
describe('option test', () => {
  it('[TEST] option', () => {
    const option: O.Option<null, string> = {
      _tag: 'pass',
      value: 'hello world',
      error: null,
    }

    expect(option._tag).toBe('pass')
  })
})
