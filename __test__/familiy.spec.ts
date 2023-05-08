import { mergeFamily, spreadFamily } from '../src/array/index'

describe('family', () => {
  it('merge', (done) => {
    const list = mergeFamily<number, string, boolean>([1, 2, 3], ['a', 'b', 'c'], [true, true])

    expect(list.length).toBe(8)
    done()
  })

  it('spread', (done) => {
    const list = mergeFamily<number, string, boolean>([1, 2, 3], ['a', 'b', 'c'], [true, true])
    const spreadList = spreadFamily<number | string | boolean>(
      list,
      { fn: (v) => typeof v === 'number', idx: 0 },
      { fn: (v) => typeof v === 'string', idx: 1 },
      { fn: (v) => typeof v === 'boolean', idx: 2 }
    )

    expect(spreadList.length).toBe(3)
    expect(spreadList[0].length).toBe(3)
    expect(spreadList[1].length).toBe(3)

    done()
  })
})
