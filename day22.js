'use strict'

// Part 1
// ======

const part1 = input => {
    const puzzle = input.trim().split('\n').map(line => {
        const m = /(\/dev\/grid\/node-x(\d+)-y(\d+))\s+(\d+)T\s+(\d+)T\s+(\d+)T\s+(\d+)%/.exec(line)
        if (m == null) return null
        return {name: m[1], x: parseInt(m[2], 10), y: parseInt(m[3], 10), size: parseInt(m[4], 10), used: parseInt(m[5], 10), avail: parseInt(m[6], 10), percent: parseInt(m[7], 10)}
    })
    puzzle.splice(0, 2)
    let i = 0
    for (const a of puzzle.filter(p => p.used > 0)) {
        i += puzzle.filter(p => p.name !== a.name && p.avail >= a.used).length
    }
    return i
}

// Part 2
// ======

const bfs = (nodes, start, end, obst) => {
    for (const val of nodes.values()) {
        val.dist = (`${val.x},${val.y}` == start) ? 0 : Infinity
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
            if (node.used < 100 && nkey != obst) {
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

const part2 = input => {
    const nodes = new Map()
    for (const line of input.trim().split('\n')) {
        const m = /(\/dev\/grid\/node-x(\d+)-y(\d+))\s+(\d+)T\s+(\d+)T\s+(\d+)T\s+(\d+)%/.exec(line)
        if (m == null) continue
        const tmp = {
            name: m[1]
            , x: parseInt(m[2], 10)
            , y: parseInt(m[3], 10)
            , size: parseInt(m[4], 10)
            , used: parseInt(m[5], 10)
            , avail: parseInt(m[6], 10)
            , percent: parseInt(m[7], 10)
            , dist: Infinity
            , prev: null
        }
        nodes.set(`${tmp.x},${tmp.y}`, tmp)
    }
    const lx = Math.max(...[...nodes.keys()].map(k => k.split(',')[0])) + 1

    const start = '0,0'
    let goal = `${lx - 1},0`
    let empty = [...nodes.values()].filter(f => f.used == 0)[0]
    empty = `${empty.x},${empty.y}`

    const pathStartToGoal = bfs(nodes, goal, start, null)
    let i = 0
    while (goal !== start) {
        const pathForEmpty = bfs(nodes, empty, pathStartToGoal.pop(), goal)
        i += pathForEmpty.length + 1
        empty = goal
        goal = pathForEmpty[0]
    }

    return i
}

module.exports = { part1, part2 }
