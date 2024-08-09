'use strict'

const parseInput = input => input.split('\n').map(l => l.split(' a ').length - 1)

const getMoves = items => {
    if (!items.every(i => i % 2 == 0)) return 'This solution does not work for your input, sorry :('
    let moves = 0
    const sum = items.reduce((acc, cur) => acc + cur, 0)
    while (items[items.length - 1] !== sum) {
        let lowestFloor = 0
        while (items[lowestFloor] == 0) lowestFloor++
        moves += 2 * (items[lowestFloor] - 1) - 1
        items[lowestFloor + 1] += items[lowestFloor]
        items[lowestFloor] = 0
    }
    return moves
}

const part1 = input => getMoves(parseInput(input))

const part2 = input => getMoves(parseInput(' a  a  a  a ' + input))

module.exports = { part1, part2 }
