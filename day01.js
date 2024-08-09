'use strict'

const mod = (n, p) => {
    if (n < 0) n = p - Math.abs(n) % p
    return n % p
}

// Part 1
// ======

const part1 = input => {
    const puzzle = input.split(',').map(cmd => {
        const parts = /^\s*(?<turn>[RL])(?<steps>\d+)\s*/.exec(cmd)
        return {turn: parts.groups.turn, steps: parseInt(parts.groups.steps, 10)}
    })
    return Object.values( puzzle.reduce((acc, cur) => {
        const change = cur.turn == 'R' ? 1 : -1
        acc.dir = mod(acc.dir + change, 4)
        switch(acc.dir) {
            case 0:
                acc.pos.y -= cur.steps
                break
            case 1:
                acc.pos.x += cur.steps
                break
            case 2:
                acc.pos.y += cur.steps
                break
            case 3:
                acc.pos.x -= cur.steps
                break
        }
        return acc
    }, {dir: 0, pos: {x: 0, y: 0}}).pos).reduce((acc, cur) => acc + Math.abs(cur), 0)
}

// Part 2
// ======

const part2 = input => {
    const puzzle = input.split(',').map(cmd => {
        const parts = /^\s*(?<turn>[RL])(?<steps>\d+)\s*/.exec(cmd)
        return {turn: parts.groups.turn, steps: parseInt(parts.groups.steps, 10)}
    })
    const visited = new Set()
    const nav = [{x: 0, y: -1}, {x: 1, y: 0}, {x: 0, y: 1}, {x: -1, y: 0}]
    return Object.values( puzzle.reduce((acc, cur) => {
        if (acc.found) return acc
        const change = cur.turn == 'R' ? 1 : -1
        acc.dir = mod(acc.dir + change, 4)
        while(cur.steps > 0 && !acc.found) {
            acc.pos.x += nav[acc.dir].x
            acc.pos.y += nav[acc.dir].y
            const pos = `${acc.pos.x}, ${acc.pos.y}`
            if(visited.has(pos)) {
                acc.found = true
            } else {
                visited.add(pos)
                cur.steps--
            }
        }
        return acc
    }, {dir: 0, pos: {x: 0, y: 0}, found: false}).pos).reduce((acc, cur) => acc + Math.abs(cur), 0)
}

module.exports = { part1, part2 }
