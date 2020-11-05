import assert from 'assert'
import { addCurrencies, conversionUtil } from './conversion-util'
import BigNumber from 'bignumber.js'

describe('conversion utils', function () {
  describe('addCurrencies()', function () {
    it('add whole numbers', function () {
      const result = addCurrencies(3, 9)
      assert.equal(result.toNumber(), 12)
    })

    it('add decimals', function () {
      const result = addCurrencies(1.3, 1.9)
      assert.equal(result.toNumber(), 3.2)
    })

    it('add repeating decimals', function () {
      const result = addCurrencies(1 / 3, 1 / 9)
      assert.equal(result.toNumber(), 0.4444444444444444)
    })
  })

  describe('conversionUtil', function () {
    it('Returns expected types', function () {
      const conv1 = conversionUtil(1000000000000000000, { fromNumericBase: 'dec', toNumericBase: 'hex' })
      const conv2 = conversionUtil(1, { fromNumericBase: 'dec', fromDenomination: 'WAN', toDenomination: 'WIN' })
      assert(typeof conv1 === 'string', 'conversion 1 should return type string')
      assert(conv2 instanceof BigNumber, 'conversion 2 should be a BigNumber')
    })
    it('Converts from dec to hex', function () {
      assert.equal(conversionUtil('1000000000000000000', { fromNumericBase: 'dec', toNumericBase: 'hex' }), 'de0b6b3a7640000')
      assert.equal(conversionUtil('1500000000000000000', { fromNumericBase: 'dec', toNumericBase: 'hex' }), '14d1120d7b160000')
    })
    it('Converts hex formatted numbers to dec', function () {
      assert.equal(conversionUtil('0xde0b6b3a7640000', { fromNumericBase: 'hex', toNumericBase: 'dec' }), 1000000000000000000)
      assert.equal(conversionUtil('0x14d1120d7b160000', { fromNumericBase: 'hex', toNumericBase: 'dec' }), 1500000000000000000)
    })
    it('Converts WIN to WAN', function () {
      assert.equal(conversionUtil('0xde0b6b3a7640000', { fromNumericBase: 'hex', toNumericBase: 'dec', fromDenomination: 'WIN', toDenomination: 'WAN' }), 1)
      assert.equal(conversionUtil('0x14d1120d7b160000', { fromNumericBase: 'hex', toNumericBase: 'dec', fromDenomination: 'WIN', toDenomination: 'WAN' }), 1.5)
    })
    it('Converts WAN to WIN', function () {
      assert.equal(conversionUtil('1', { fromNumericBase: 'dec', fromDenomination: 'WAN', toDenomination: 'WIN' }), 1000000000000000000)
      assert.equal(conversionUtil('1.5', { fromNumericBase: 'dec', fromDenomination: 'WAN', toDenomination: 'WIN' }), 1500000000000000000)
    })
    it('Converts WAN to GWIN', function () {
      assert.equal(conversionUtil('1', { fromNumericBase: 'dec', fromDenomination: 'WAN', toDenomination: 'GWIN' }), 1000000000)
      assert.equal(conversionUtil('1.5', { fromNumericBase: 'dec', fromDenomination: 'WAN', toDenomination: 'GWIN' }), 1500000000)
    })
    it('Converts WAN to USD', function () {
      assert.equal(conversionUtil('1', { fromNumericBase: 'dec', toNumericBase: 'dec', toCurrency: 'usd', conversionRate: 468.58, numberOfDecimals: 2 }), 468.58)
      assert.equal(conversionUtil('1.5', { fromNumericBase: 'dec', toNumericBase: 'dec', toCurrency: 'usd', conversionRate: 468.58, numberOfDecimals: 2 }), 702.87)
    })
    it('Converts USD to WAN', function () {
      assert.equal(conversionUtil('468.58', { fromNumericBase: 'dec', toNumericBase: 'dec', toCurrency: 'usd', conversionRate: 468.58, numberOfDecimals: 2, invertConversionRate: true }), 1)
      assert.equal(conversionUtil('702.87', { fromNumericBase: 'dec', toNumericBase: 'dec', toCurrency: 'usd', conversionRate: 468.58, numberOfDecimals: 2, invertConversionRate: true }), 1.5)
    })
  })
})
