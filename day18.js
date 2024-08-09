'use strict'

const topTilesAt = (tiles, pos) => {
    if (pos == 0) return '.' + tiles.substring(0, 2)
    if (pos == tiles.length - 1) return tiles.substring(pos - 1) + '.'
    return tiles.substring(pos - 1, pos + 2)
}

const newTile = ancestors => ['^^.', '.^^', '^..', '..^'].includes(ancestors) ? '^' : '.'

const solve = (input, targetLength) => {
    let safe = input.replace(/\^/g, '').length
    while (--targetLength) {
        input = input.split('').reduce((acc, cur, i, arr) => acc + newTile(topTilesAt(arr.join(''), i)), '')
        safe += input.replace(/\^/g, '').length
    }
    return safe
}

const part1 = input => solve(input, 40)

const part2 = input => solve(input, 400000)

module.exports = { part1, part2 }
