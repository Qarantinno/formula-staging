'use strict'

/**
 * @typedef shot
 * @property {number} id
 * @property {number} people
 */

/**
 * Math median based calculations
 * @link https://en.wikipedia.org/wiki/Box_plot
 * @link https://www150.statcan.gc.ca/n1/edu/power-pouvoir/ch11/median-mediane/5214872-eng.htm
 */
class FormulaMedian {
  /**
   * Create from a row of stats
   * @param {shot[]} row
   */
  constructor(row) {
    this._median = null
    this._avarage = null
    this._quartile = null
    this._outliers = null
    this._min = null
    this._max = null

    ///Calculations
    const sortedRow = this._sort(row)
    this._median = this._calcMedian(sortedRow)
    this._avarage = this._calcAverage(sortedRow)

  }

  /**
   * Ask sorting
   * @param {shot[]} row
   * @return {shot[]}
   * @private
   */
  _sort(row) {
    return row.sort((a, b) => {
      return a.people - b.people
    })
  }

  /**
   * Calculate the median
   * @param {shot[]} row
   * @return {number}
   * @private
   */
  _calcMedian(row) {
    const length = row.length
    const mid = Math.floor(length / 2)

    return length % 2 ? row[mid].people : (row[mid].people + row[mid - 1].people) / 2.0
  }

  /**
   * Calculate the average
   * @param {shot[]} row
   * @return {number}
   * @private
   */
  _calcAverage(row) {
    return row.reduce((sum, shot) => sum + shot.people, 0) / row.length
  }

  /**
   * Calculate quartiles
   * @param row
   * @private
   */
  _calcQuartile(row) {
    
  }

  /**
   * @return {number}
   */
  get median() {
    return this._median
  }

  /**
   * @return {number}
   */
  get avarage() {
    return this._avarage
  }

  /**
   * @return {shot[]}
   */
  get quartile() {
    return this._quartile
  }

  /**
   * @return {{bottom: shot[], top: shot[]}}
   */
  get outliers() {
    return this._outliers
  }

  /**
   * @return {number}
   */
  get min() {
    return this._min
  }

  /**
   * @return {number}
   */
  get max() {
    return this._max
  }
}

module.exports = FormulaMedian
