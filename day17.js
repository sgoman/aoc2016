'use strict'

const crypto = require('crypto')

const solve = (input, part) => {
    const unlocked = 'bcdef'
    const que = [[0, 0, '']]
    let x, y, p, m = 0
    while (que.length) {
        [x, y, p] = que.shift()
        if (x == 3 && y == 3) {
            if (part == 2) {
                if (p.length > m) m = p.length
                continue
            } else {
                return p
            }
        }

        const hash = crypto.createHash('md5').update(input + p).digest('hex').substring(0, 4).split('')

        if (y - 1 >= 0 && unlocked.indexOf(hash[0]) !== -1) que.push([x, y - 1, p + 'U'])
        if (y + 1 <= 3 && unlocked.indexOf(hash[1]) !== -1) que.push([x, y + 1, p + 'D'])
        if (x - 1 >= 0 && unlocked.indexOf(hash[2]) !== -1) que.push([x - 1, y, p + 'L'])
        if (x + 1 <= 3 && unlocked.indexOf(hash[3]) !== -1) que.push([x + 1, y, p + 'R'])
    }
    return m
}

const part1 = input => solve(input, 1)
const part2 = input => solve(input, 2)

module.exports = { part1, part2 }
