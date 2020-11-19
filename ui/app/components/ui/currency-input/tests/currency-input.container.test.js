import assert from 'assert'
import proxyquire from 'proxyquire'
import {MAINNET, TESTNET} from '../../../../../../app/scripts/controllers/network/enums'

let mapStateToProps, mergeProps

proxyquire('../currency-input.container.js', {
  'react-redux': {
    connect: (ms, _, mp) => {
      mapStateToProps = ms
      mergeProps = mp
      return () => ({})
    },
  },
})

describe('CurrencyInput container', function () {
  describe('mapStateToProps()', function () {
    const tests = [
      // Test # 1
      {
        comment: 'should return correct props in mainnet',
        mockState: {
          metamask: {
            conversionRate: 280.45,
            currentCurrency: 'usd',
            nativeCurrency: 'WAN',
            preferences: {
              showFiatInTestnets: false,
            },
            provider: {
              type: MAINNET,
            },
            send: {
              maxModeOn: false,
            },
          },
        },
        expected: {
          conversionRate: 280.45,
          currentCurrency: 'usd',
          nativeCurrency: 'WAN',
          hideFiat: false,
          maxModeOn: false,
        },
      },
      // Test # 2
      {
        comment: 'should return correct props when not in mainnet and showFiatInTestnets is false',
        mockState: {
          metamask: {
            conversionRate: 280.45,
            currentCurrency: 'usd',
            nativeCurrency: 'WAN',
            preferences: {
              showFiatInTestnets: false,
            },
            provider: {
              type: TESTNET,
            },
            send: {
              maxModeOn: false,
            },
          },
        },
        expected: {
          conversionRate: 280.45,
          currentCurrency: 'usd',
          nativeCurrency: 'WAN',
          hideFiat: true,
          maxModeOn: false,
        },
      },
      // Test # 3
      {
        comment: 'should return correct props when not in mainnet and showFiatInTestnets is true',
        mockState: {
          metamask: {
            conversionRate: 280.45,
            currentCurrency: 'usd',
            nativeCurrency: 'WAN',
            preferences: {
              showFiatInTestnets: true,
            },
            provider: {
              type: TESTNET,
            },
            send: {
              maxModeOn: false,
            },
          },
        },
        expected: {
          conversionRate: 280.45,
          currentCurrency: 'usd',
          nativeCurrency: 'WAN',
          hideFiat: false,
          maxModeOn: false,
        },
      },
      // Test # 4
      {
        comment: 'should return correct props when in mainnet and showFiatInTestnets is true',
        mockState: {
          metamask: {
            conversionRate: 280.45,
            currentCurrency: 'usd',
            nativeCurrency: 'WAN',
            preferences: {
              showFiatInTestnets: true,
            },
            provider: {
              type: MAINNET,
            },
            send: {
              maxModeOn: false,
            },
          },
        },
        expected: {
          conversionRate: 280.45,
          currentCurrency: 'usd',
          nativeCurrency: 'WAN',
          hideFiat: false,
          maxModeOn: false,
        },
      },
    ]

    tests.forEach(({ mockState, expected, comment }) => {
      it(comment, function () {
        return assert.deepEqual(mapStateToProps(mockState), expected)
      })
    })
  })

  describe('mergeProps()', function () {
    const tests = [
      // Test # 1
      {
        comment: 'should return the correct props',
        mock: {
          stateProps: {
            conversionRate: 280.45,
            currentCurrency: 'usd',
            nativeCurrency: 'WAN',
          },
          dispatchProps: {},
          ownProps: {},
        },
        expected: {
          conversionRate: 280.45,
          currentCurrency: 'usd',
          nativeCurrency: 'WAN',
          // useFiat: true,
          nativeSuffix: 'WAN',
          fiatSuffix: 'USD',
        },
      },
      // Test # 1
      {
        comment: 'should return the correct props when useFiat is true',
        mock: {
          stateProps: {
            conversionRate: 280.45,
            currentCurrency: 'usd',
            nativeCurrency: 'WAN',
          },
          dispatchProps: {},
          ownProps: { useFiat: true },
        },
        expected: {
          conversionRate: 280.45,
          currentCurrency: 'usd',
          nativeCurrency: 'WAN',
          useFiat: true,
          nativeSuffix: 'WAN',
          fiatSuffix: 'USD',
        },
      },
    ]

    tests.forEach(({ mock: { stateProps, dispatchProps, ownProps }, expected, comment }) => {
      it(comment, function () {
        assert.deepEqual(mergeProps(stateProps, dispatchProps, ownProps), expected)
      })
    })
  })
})
