'use strict'

/**
 * @typedef shot
 * @property {number} id
 * @property {number} people
 */

/**
 * Box plot based calculations
 * @link https://en.wikipedia.org/wiki/Box_plot
 * @link https://www150.statcan.gc.ca/n1/edu/power-pouvoir/ch11/median-mediane/5214872-eng.htm
 * @link https://en.wikipedia.org/wiki/Median
 */
class BoxAndWhisker {
  /**
   * Create from a row of stats
   * @param {shot[]} row
   */
  constructor(row) {
    this._median = null
    this._average = null
    this._quartiles = null

    ///Calculations
    const sortedRow = this._sort(row)
    this._min = sortedRow[0]
    this._max = sortedRow[sortedRow.length - 1]

    this._median = this._calcMedian(sortedRow)
    this._average = this._calcAverage(sortedRow)
    this._sortedRow = sortedRow
  }

  /**
   * ASC sorting
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
   * @see https://en.wikipedia.org/wiki/Box_plot#/media/File:Boxplot_vs_PDF.svg
   * @see https://en.wikipedia.org/wiki/Box_plot#Example_without_outliers
   * @param {shot[]} row
   * @return {{
   *  Q1outliers: shot[],
   *   Q1: shot[],
   *    IQR: shot[],
   *   Q3: shot[],
   *  Q3outliers: shot[],
   * }}
   * @private
   */
  _calcQuartiles(row) {
    const result = {
      Q1outliers: [],
      Q1: [],
      IQR: [],
      Q3: [],
      Q3outliers: [],
    }

    const median = this.median

    const firstHalfSubRow = row.filter(s => s.people <= median)
    const q1_Offset = (new this.constructor(firstHalfSubRow)).median

    const secondHalfSubRow = row.filter(s => s.people >= median)
    const q3_Offset = (new this.constructor(secondHalfSubRow)).median

    const IQR_Range = q1_Offset - q3_Offset
    const Q15_Range = 1.5 * IQR_Range

    //TODO: include edge values or exclude? For know, include from center
    for (let s of row) {
      switch (true) {
        case s.people >= q1_Offset && s.people <= q3_Offset:
          result.IQR.push(s)
          break

        case s.people >= q1_Offset - Q15_Range && s.people < q1_Offset:
          result.Q1.push(s)
          break

        case s.people > q3_Offset && s.people <= q3_Offset + Q15_Range:
          result.Q3.push(s)
          break

        case s.people < q1_Offset - Q15_Range:
          result.Q1outliers.push(s)
          break

        case s.people > q3_Offset + Q15_Range:
          result.Q3outliers.push(s)
          break
      }
    }

    return result
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
  get average() {
    return this._average
  }

  /**
   * @see https://en.wikipedia.org/wiki/Box_plot#/media/File:Boxplot_vs_PDF.svg
   * @return {{
   *  Q1outliers: shot[],
   *   Q1: shot[],
   *    IQR: shot[],
   *   Q3: shot[],
   *  Q3outliers: shot[],
   * }}
   */
  get quartiles() {
    if (null === this._quartiles) {
      this._quartiles = this._calcQuartiles(this._sortedRow)
    }
    return this._quartiles
  }

  /**
   * @return {{bottom: shot[], top: shot[]}}
   */
  get outliers() {
    const quartiles = this.quartiles
    return {
      bottom: quartiles.Q1outliers,
      top: quartiles.Q3outliers,
    }
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

module.exports = BoxAndWhisker
