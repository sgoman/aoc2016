'use strict'

const expand = str => str + '0' + str.split('').reverse().reduce((a, c) => a + (c != '1') * 1, '')

const checksum = str => str.split('').reduce((a, c, i, arr) => i % 2 == 1 ? a + (c == arr[i - 1]) * 1 : a, '')

const solve = (input, targetLength) => {
    do {
        input = expand(input)
    } while(input.length < targetLength)
    input = input.substring(0, targetLength)
    do {
        input = checksum(input)
    } while(input.length % 2 == 0)
    return input
}

const part1 = input => solve(input, 272)

const part2 = input => solve(input, 35651584)

module.exports = { part1, part2 }
