'use strict'

/**
 * @type {{rows: {expectedMedian: number, shots: shot[], values: []}[]}}
 */
module.exports = {
  rows: [
    //Super shot
    {
      ...makeShotsRow([42]),
      expectedMedian: 42
    },
    {
      ...makeShotsRow([20, 12]),
      expectedMedian: (20 + 12) / 2
    },
    {
      ...makeShotsRow([1, 99, 100]),
      expectedMedian: 99
    },
    {
      ...makeShotsRow([1, 1, 99, 100]),
      expectedMedian: (1 + 99) / 2
    },
    {
      ...makeShotsRow([1, 1, 4, 5, 5]),
      expectedMedian: 4
    },
    {
      ...makeShotsRow([0, 0, 5, 9]),
      expectedMedian: (5) / 2
    },
    //Shot
    {
      ...makeShotsRow([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]),
      expectedMedian: 6.0
    },
    {
      ...makeShotsRow([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
      expectedMedian: (5 + 6) / 2
    },
    //Unsorted
    {
      ...makeShotsRow([11, 10, 9, 1, 2, 3, 4, 5, 6, 7, 8]),
      expectedMedian: 6.0
    },
    {
      ...makeShotsRow([10, 9, 1, 2, 3, 4, 5, 6, 7, 8]),
      expectedMedian: (5 + 6) / 2
    },
    //Gen short
    {
      ...makeShotsRow(makeSrcAroundMid([6], 11)),
      expectedMedian: 6.0
    },
    {
      ...makeShotsRow(makeSrcAroundMid([5, 6], 10)),
      expectedMedian: (5 + 6) / 2
    },
    //Gen mid
    {
      ...makeShotsRow(makeSrcAroundMid([68.25], 261)),
      expectedMedian: 68.25
    },
    {
      ...makeShotsRow(makeSrcAroundMid([26.0, 34.40], 250)),
      expectedMedian: (26.0 + 34.40) / 2
    },
    //Gen long
    {
      ...makeShotsRow(makeSrcAroundMid([20], 5001)),
      expectedMedian: 20
    },
    {
      ...makeShotsRow(makeSrcAroundMid([15.3, 18], 5000)),
      expectedMedian: (15.3 + 18) / 2
    },
    //Gen super long
    {
      ...makeShotsRow(makeSrcAroundMid([20], 200001)),
      expectedMedian: 20
    },
    {
      ...makeShotsRow(makeSrcAroundMid([15.3, 18], 200000)),
      expectedMedian: (15.3 + 18) / 2
    },
  ]
}

function makeShotsRow(src) {
  return src.reduce((row, people, index) => {
    row.values.push(people)
    row.shots.push({
      id: index,
      people
    })

    return row
  }, {values: [], shots: []})
}

function makeSrcAroundMid(mid, size) {
  const twoOfMid = mid.length > 1
  size -= mid.length
  const halfSize = size / 2
  if(Math.floor(halfSize) !== halfSize) {
    throw new Error(`Given wrong size to the case of generation src!`)
  }

  const m1 = mid[0]
  const m2 = mid[twoOfMid ? 1 : 0]

  const less = []
  const greater = []


  while (less.length < halfSize || greater.length < halfSize) {
    const genVal = (() => {
      const pivot = Math.random() > 0.5 ? m2 : m1
      const grade = Math.pow(10, String(Math.floor(pivot)).length)
      return Math.round(Math.random() * grade)
    })()

    //TODO: not clear where to put the same val if they are the same, skip
    if (twoOfMid && m1 === m2 && genVal === m1) {
      continue
    }

    if (genVal <= m1 && less.length < halfSize) {
      less.push(genVal)
    } else if (genVal >= m2 && greater.length < halfSize) {
      greater.push(genVal)
    }
  }

  return [...less, ...mid, ...greater]
}
