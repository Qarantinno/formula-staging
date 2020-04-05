'use strict'

const BoxAndWhisker = require('./BoxAndWhisker')

/**
 * @typedef shot
 * @property {number} id
 * @property {number} people
 */

/**
 * Box plot based calculations
 * with math extracting of the median
 */
class BoxAndWhiskerMathApproach extends BoxAndWhisker {
  /**
   * Create from a row of stats
   * @param {shot[]} row
   */
  constructor(row) {
    super(row)
  }

  /**
   * Calculate the median
   * math way @link https://en.wikipedia.org/wiki/Median
   * @param {shot[]} row
   * @return {number}
   * @private
   */
  _calcMedian(row) {
    const length = row.length
    return (row[Math.floor((length + 1) / 2) - 1].people + row[Math.ceil((length + 1) / 2) - 1].people) / 2.0
  }

}

module.exports = BoxAndWhiskerMathApproach
