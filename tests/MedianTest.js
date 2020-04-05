'use strict'

/**
 * @type {{rows: {expectedMedian: number, shots: shot[], values: *[]}[]}}
 */
const dataSetProvider = require('./dataSetProvider')

const BoxAndWhisker = require('../lib/BoxAndWhisker')
const BoxAndWhiskerMathApproach = require('../lib/BoxAndWhiskerMathApproach')

describe('BoxAndWhisker median', () => {
  for(const [index, dataSet] of dataSetProvider.rows.entries()) {
    it(`Case ${index}`, () => {
      const formula = new BoxAndWhisker(dataSet.shots)

      expect(formula.median).toBe(dataSet.expectedMedian)
    })
  }
})

describe('BoxAndWhiskerMathApproach median', () => {
  for(const [index, dataSet] of dataSetProvider.rows.entries()) {
    it(`Case ${index}`, () => {
      const formula = new BoxAndWhiskerMathApproach(dataSet.shots)

      expect(formula.median).toBe(dataSet.expectedMedian)
    })
  }
})
