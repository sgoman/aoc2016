'use strict'

const solve = (input, i, add) => {
    const puzzle = input.trim().split('\n').map(line => {
        const [_, disc, pos, offset] = /.*#(\d+) has (\d+) .*position (\d+)/.exec(line)
        return {disc: disc * 1, pos: pos * 1, offset: offset * 1}
    })
    if (add) puzzle.push({disc: puzzle.length + 1, pos: 11, offset: 0})
    while (!puzzle.every(d => (i + d.disc + d.offset) % d.pos === 0)) i++
    return i
}

const part1 = input => solve(input, 0, false)
const part2 = input => solve(input, 0, true)

module.exports = { part1, part2 }
