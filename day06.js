'use strict'

const specificFrequency = (stream, cb) => {
    const chars = new Map()
    for (const c of stream) {
        if (!chars.has(c)) chars.set(c, 0)
        chars.set(c, chars.get(c) + 1)
    }
    const best = cb(...[...chars.values()])
    for (const [k, v] of chars.entries()) {
        if (v == best) return k
    }
}

const solve = (isPart2, input) => {
    const trans = input.split('\n').map(l => l.split(''))
    const codes = []
    for (let i = 0, l = trans[0].length; i < l; i++) {
        codes.push(specificFrequency(trans.map(t => t[i]), isPart2 ? Math.min : Math.max))
    }
    return codes.join('')
}

const part1 = input => solve(false, input)

const part2 = input => solve(true, input)

module.exports = { part1, part2 }
