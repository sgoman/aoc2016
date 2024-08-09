'use strict'

const crypto = require('crypto')

const solve = (isPart2, input) => {
    const code = (new Array(8)).fill(null)
    let i = 0, pos = 0
    while (code.some(c => c == null)) {
        const hash = crypto.createHash('md5').update(input + i++).digest('hex')
        const splits = hash.split('')
        if (isPart2) {
            pos = Number(splits[5])
            if (hash.startsWith('00000') && [0,1,2,3,4,5,6,7].includes(pos) && code[pos] == null) code[pos] = splits[6]
        } else {
            if (hash.startsWith('00000')) code[pos++] = splits[5]
        }
    }
    return code.join('')
}

const part1 = input => solve(false, input)

const part2 = input => solve(true, input)

module.exports = { part1, part2 }
