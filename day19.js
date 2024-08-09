'use strict'

const baseLog = (base, val) => Math.log(val) / Math.log(base)

// Part 1
// ======

const part1 = input => {
    input = parseInt(input, 10)
    return (2 * (input - (Math.pow(2, Math.floor(baseLog(2, input))))) + 1)
}

// Part 2
// ======

const part2 = input => {
    input = parseInt(input, 10)
    const p = Math.pow(2, Math.floor(baseLog(3, input)))
    // return (p == input) ? p : ((input < (2 * p)) ? (input - p) : ((2 * input) - (3 * p)))
    let i = 1
    while (i * 3 < input) i *= 3
    return input - i
}

module.exports = { part1, part2 }
