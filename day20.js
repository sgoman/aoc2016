'use strict'

const solve = (input, part2) => {
    const puzzle = input.trim().split('\n').map(line => {
        const [l, h] = line.split('-').map(Number)
        return {low: l, high: h}
    }).sort((a, b) => a.low - b.low)
    const white = []
    let best = 0
    for(const c of puzzle) {
        if(c.low <= best) {
            best = Math.max(best, c.high + 1)
        } else {
            while(best < c.low) white.push(best++)
            best = c.high + 1
        }
    }
    return part2 ? white.length : white[0]
}

const part1 = input => solve(input, false)
const part2 = input => solve(input, true)

module.exports = { part1, part2 }
