'use strict'

const dirs = { 'L': [0, -1], 'R': [0, 1], 'U': [ -1, 0], 'D': [1, 0] }

const solve = (input, pad, row, col) => {
    const code = [], l = pad.length - 1
    for(const cmd of input.split('\n')) {
        for(const dir of cmd.split('')) {
            const r = Math.min(l, Math.max(0, row + dirs[dir][0]))
            const c = Math.min(l, Math.max(0, col + dirs[dir][1]))
            row = Math.min(l, Math.max(0, row + (pad[r][c] != '#') * dirs[dir][0]))
            col = Math.min(l, Math.max(0, col + (pad[r][c] != '#') * dirs[dir][1]))
        }
        code.push(pad[row][col])
    }
    return code.join('')
}

const part1 = input => solve(input, [ [1, 2, 3], [4, 5, 6], [7, 8, 9] ], 1, 1)

const part2 = input => solve(input,
    [
        ['#', '#', '1', '#', '#'],
        ['#', '2', '3', '4', '#'],
        ['5', '6', '7', '8', '9'],
        ['#', 'A', 'B', 'C', '#'],
        ['#', '#', 'D', '#', '#']
    ], 2, 0)

module.exports = { part1, part2 }
