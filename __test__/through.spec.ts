import { breakThrough, fallThrough } from '../src/through/index'
import { failed, isFail, passed, Try } from '../src/type/index'

describe('through test', () => {
  describe('Through flat test', () => {
    const validNumber = (v: any) => {
      if (typeof v === 'number') {
        // console.log(`${v} is number`)
        return
      }

      return `${v} is not number`
    }

    const validString = (v: any) => {
      if (typeof v === 'string') {
        // console.log(`${v} is string`)
        return
      }

      return `${v} is not string`
    }

    it('[TEST] fallThrough test all pass', (done) => {
      const { failReasons, totalCount, successCount, failCount } = fallThrough<number, string | undefined>(
        {
          value: 10,
          failBox: [],
          isErrorCond: (v) => !!v,
        },
        (v) => validNumber(v),
        (v) => validNumber(v),
        (v) => validNumber(v),
        (v) => validNumber(v),
        (v) => validNumber(v),
        (v) => validNumber(v),
        (v) => validNumber(v)
      )

      expect(failReasons.length).toBe(0)
      expect(totalCount).toBe(7)
      expect(successCount).toBe(7)
      expect(failCount).toBe(0)
      done()
    })

    it('[TEST] breakThrough test all pass', (done) => {
      const { failReason, totalCount, failIndex } = breakThrough<number, string | undefined>(
        {
          value: 10,
          isErrorCond: (v) => !!v,
        },
        (v) => validNumber(v),
        (v) => validNumber(v),
        (v) => validNumber(v),
        (v) => validNumber(v),
        (v) => validNumber(v),
        (v) => validNumber(v),
        (v) => validNumber(v)
      )

      expect(failReason).toBe(null)
      expect(totalCount).toBe(7)
      expect(failIndex).toBe(null)
      done()
    })

    it('[TEST] fallThrough test include fail', (done) => {
      const { failReasons, totalCount, successCount, failCount } = fallThrough<number, string | undefined>(
        {
          value: 10,
          failBox: [],
          isErrorCond: (v) => !!v,
        },
        (v) => validNumber(v),
        (v) => validNumber(v),
        (v) => validString(v),
        (v) => validNumber(v),
        (v) => validString(v),
        (v) => validNumber(v),
        (v) => validString(v)
      )

      expect(failReasons.length).toBe(3)
      expect(totalCount).toBe(7)
      expect(successCount).toBe(4)
      expect(failCount).toBe(3)
      done()
    })

    it('[TEST] breakThrough test include fail', (done) => {
      const { failReason, failIndex, totalCount } = breakThrough<number, string | undefined>(
        {
          value: 10,
          isErrorCond: (v) => !!v,
        },
        (v) => validNumber(v),
        (v) => validNumber(v),
        (v) => validString(v),
        (v) => validNumber(v),
        (v) => validString(v),
        (v) => validNumber(v),
        (v) => validString(v)
      )

      expect(failReason).toBe('10 is not string')
      expect(failIndex).toBe(3)
      expect(totalCount).toBe(7)
      done()
    })
  })

  describe('Through add other type test', () => {
    const tryValidNumber = (v: any): Try<string, undefined> => {
      if (typeof v === 'number') {
        return passed(undefined)
      }

      return failed('not number')
    }

    const tryValidString = (v: any): Try<string, undefined> => {
      if (typeof v === 'string') {
        return passed(undefined)
      }

      return failed('not string')
    }

    it('[TEST] fallThrough test add TryType All test', (done) => {
      const { failReasons, totalCount, successCount, failCount } = fallThrough<number, Try<string, undefined>>(
        {
          value: 10,
          failBox: [],
          isErrorCond: (v) => {
            if (isFail(v)) {
              return true
            }

            return false
          },
        },
        (v) => tryValidNumber(v),
        (v) => tryValidNumber(v),
        (v) => tryValidNumber(v),
        (v) => tryValidNumber(v),
        (v) => tryValidNumber(v),
        (v) => tryValidNumber(v),
        (v) => tryValidNumber(v)
      )

      expect(failReasons.length).toBe(0)
      expect(totalCount).toBe(7)
      expect(successCount).toBe(7)
      expect(failCount).toBe(0)
      done()
    })

    it('[TEST] breakThrough test add TryType All test', (done) => {
      const { failReason, totalCount, failIndex } = breakThrough<number, Try<string, undefined>>(
        {
          value: 10,
          isErrorCond: (v) => {
            if (isFail(v)) {
              return true
            }

            return false
          },
        },
        (v) => tryValidNumber(v),
        (v) => tryValidNumber(v),
        (v) => tryValidNumber(v),
        (v) => tryValidNumber(v),
        (v) => tryValidNumber(v),
        (v) => tryValidNumber(v),
        (v) => tryValidNumber(v)
      )

      expect(failReason).toBe(null)
      expect(totalCount).toBe(7)
      expect(failIndex).toBe(null)
      done()
    })

    it('[TEST] fallThrough test add TryType include fail test', (done) => {
      const { failReasons, totalCount, successCount, failCount } = fallThrough<number, Try<string, undefined>>(
        {
          value: 10,
          failBox: [],
          isErrorCond: (v) => {
            if (isFail(v)) {
              return true
            }

            return false
          },
        },
        (v) => tryValidNumber(v),
        (v) => tryValidNumber(v),
        (v) => tryValidString(v),
        (v) => tryValidNumber(v),
        (v) => tryValidNumber(v),
        (v) => tryValidString(v),
        (v) => tryValidString(v)
      )

      expect(failReasons.length).toBe(3)
      expect(failReasons[0]).toMatchObject({ _tag: 'fail', value: null, error: 'not string' })
      expect(totalCount).toBe(7)
      expect(successCount).toBe(4)
      expect(failCount).toBe(3)

      done()
    })

    it('[TEST] breakThrough test add TryType include fail test', (done) => {
      const { failReason, totalCount, failIndex } = breakThrough<number, Try<string, undefined>>(
        {
          value: 10,
          isErrorCond: (v) => {
            if (isFail(v)) {
              return true
            }

            return false
          },
        },
        (v) => tryValidNumber(v),
        (v) => tryValidNumber(v),
        (v) => tryValidString(v),
        (v) => tryValidNumber(v),
        (v) => tryValidNumber(v),
        (v) => tryValidString(v),
        (v) => tryValidString(v)
      )

      expect(failReason).toMatchObject({ _tag: 'fail', value: null, error: 'not string' })
      expect(totalCount).toBe(7)
      expect(failIndex).toBe(3)

      done()
    })
  })
})
