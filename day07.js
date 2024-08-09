'use strict'

const parseInput = input => input.split('\n').map(l => l.split(/\[|\]/))

const abba = new RegExp(/(.)(?!\1)(.)\2\1/)

const part1 = input => parseInput(input).reduce((acc, cur) => 
    acc + (
        cur.filter((p, i) => i % 2 == 1).every(c => !abba.test(c)) &&
        cur.filter((p, i) => i % 2 == 0).some(c => abba.test(c))
    ), 0)

const part2 = input => parseInput(input).reduce((acc, cur) => {
    for (const supernet of cur.filter((p, i) => i % 2 == 0)) {
        for(const aba of supernet.split('').reduce((a, c, i, l) => (i < l.length - 2 && c == l[i + 2] && c != l[i + 1]) ? [...a, c + l[i + 1] + l[i + 2]] : a, [])) {
            const bab = new RegExp(`${aba[1]}${aba[2]}${aba[1]}`)
            if (cur.filter((p, i) => i % 2 == 1).some(c => bab.test(c))) return acc + 1
        }
    }
    return acc
}, 0)

module.exports = { part1, part2 }
