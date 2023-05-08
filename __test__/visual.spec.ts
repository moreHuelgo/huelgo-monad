import { visualIF } from '../src/visual/index'

describe('visual test', () => {
  describe('if test', () => {
    it('[TEST] visual if correct 1', (done) => {
      const { result, correct, correctCount } = visualIF(
        false,
        100,
        {
          isProfit: (v) => v > 100,
          executeFn: (v) => v * 100,
        },
        {
          isProfit: (v) => v > 50,
          executeFn: (v) => v * 50,
        },
        {
          isProfit: (v) => v > 10,
          executeFn: (v) => v * 10,
        },
        {
          isProfit: (v) => v < 10,
          executeFn: (v) => v / 10,
        },
        {
          isProfit: (v) => v < 1,
          executeFn: (v) => v / 1,
        }
      )

      expect(result).toBe(5000)
      expect(correct).toBe(true)
      expect(correctCount).toBe(1)
      done()
    })

    it('[TEST] visual if correct multiple', (done) => {
      const { result, correct, correctCount } = visualIF(
        true,
        100,
        {
          isProfit: (v) => v >= 100,
          executeFn: (v) => v * 100,
        },
        {
          isProfit: (v) => v >= 100,
          executeFn: (v) => v * 50,
        },
        {
          isProfit: (v) => v >= 100,
          executeFn: (v) => v * 10,
        },
        {
          isProfit: (v) => v < 10,
          executeFn: (v) => v / 10,
        },
        {
          isProfit: (v) => v < 1,
          executeFn: (v) => v / 1,
        }
      )

      expect(result).toBe(500_0000)
      expect(correct).toBe(true)
      expect(correctCount).toBe(3)
      done()
    })

    it('[TEST] visual not correct', (done) => {
      const { result, correct, correctCount } = visualIF(
        true,
        1,
        {
          isProfit: (v) => v >= 100,
          executeFn: (v) => v * 100,
        },
        {
          isProfit: (v) => v >= 100,
          executeFn: (v) => v * 50,
        },
        {
          isProfit: (v) => v >= 100,
          executeFn: (v) => v * 10,
        },
        {
          isProfit: (v) => v > 10,
          executeFn: (v) => v / 10,
        },
        {
          isProfit: (v) => v > 1,
          executeFn: (v) => v / 1,
        }
      )

      expect(result).toBe(1)
      expect(correct).toBe(false)
      expect(correctCount).toBe(0)
      done()
    })
  })
})
