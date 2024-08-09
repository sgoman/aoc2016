'use strict'

const rotations = ([l, ...ls], right=[]) =>
  l ? [[l, ...ls, ...right], ...rotations(ls, [...right, l])] : []

const permutations = ([x, ...xs]) =>
  x ? permutations(xs).flatMap((p) => rotations([x, ...p])) : [[]]

const bfs = (nodes, start, end, obst) => {
    for (const val of nodes.values()) {
        val.dist = (`${val.y},${val.x}` == start) ? 0 : Infinity
        val.prev = null
    }
    const que = [start]
    while (que.length) {
        const key = que.shift()
        const [kx, ky] = key.split(',').map(Number)
        const qnode = nodes.get(key)
        for (const [x, y] of [[kx + 1, ky], [kx - 1, ky], [kx, ky + 1], [kx, ky - 1]]) {
            const nkey = `${x},${y}`
            if (!nodes.has(nkey)) continue
            const node = nodes.get(nkey)
            if (node.char !== '#' && nkey != obst) {
                if (node.dist > qnode.dist + 1) {
                    node.dist = qnode.dist + 1
                    node.prev = key
                    que.push(nkey)
                }
                if (nkey == end) {
                    const path = [nkey]
                    while (nodes.get(path[path.length - 1]).prev !== null && nodes.get(path[path.length - 1]).prev !== start) {
                        path.push(nodes.get(path[path.length - 1]).prev)
                    }
                    return path
                }
            }
        }
    }
}

const parse = input => {
    const grid = new Map()
    const dists = new Map()
    const points = new Array(8)
    for(const [row, line] of input.trim().split('\n').entries()) {
        for(const [col, char] of line.split('').entries()) {
            const key = `${row},${col}`
            const n = '01234567'.indexOf(char)
            if (n !== -1) points[n] = key
            grid.set(key, {y: row, x: col, char, dist: Infinity, prev: null})
        }
    }
    
    for(let i = 0; i < 7; i++) {
        for(let j = i + 1; j < 8; j++) {
            const there = `${j},${i}`
            const back = `${i},${j}`
            const l = bfs(grid, points[i], points[j], null).length
            dists.set(there, l)
            dists.set(back, l)
        }
    }
    return {grid, points, dists}
}

const solve = (input, part2) => {
    const puzzle = parse(input)
    const perms = permutations('01234567').filter(p => p[0] == '0')
    let shortest = Infinity
    for(const p of perms) {
        let l = 0
        for(let i = 0; i < p.length - 1; i++) {
            l += puzzle.dists.get(`${p[i]},${p[i + 1]}`)
        }
        if (part2) l += puzzle.dists.get(`${p[p.length - 1]},${p[0]}`)
        if (l < shortest) shortest = l
    }
    return shortest
}

// Part 1
// ======

const part1 = input => {
    return solve(input, false)
}

// Part 2
// ======

const part2 = input => {
    return solve(input, true)
}

module.exports = { part1, part2 }
