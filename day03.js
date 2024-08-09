'use strict'

const parseInput = input => input.split('\n').map(l => l.match(/\d+/g).map(Number))

const valids = tris => tris.reduce((acc, cur) => {
      cur.sort((a, b) => a - b)
      return acc + (cur[0] + cur[1] > cur[2])
  }, 0)

const part1 = input => valids(parseInput(input))

const part2 = input => valids(parseInput(input).reduce((acc, cur, i, arr) => {
    if (i % 3 == 2) for (let j = 0; j < 3; j++) acc.push([arr[i][j], arr[i - 1][j], arr[i - 2][j]])
    return acc
}, []))

module.exports = { part1, part2 }
