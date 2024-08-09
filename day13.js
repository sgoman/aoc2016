'use strict'

const isWall = (x, y, z) => 
    x < 0 || y < 0 || (x * x + y * y + 3 * x + y + 2 * x * y + z).toString(2).replaceAll('0', '').length % 2 == 1

const display = (input, w, h, v) => {
    for (let r = -1; r < h; r++) {
        let line = ''
        for (let c = -1; c < w; c++) {
            if (r == 1 && c == 1) {
                line += '@'
            } else if (c == 31 && r == 39) {
                line += 'X'
            } else if (v.has(`${c}x${r}`)) {
                line += 'O'
            } else {
                line += isWall(c, r, input) ? '#' : '.'
            }
        }
        console.log(line)
    }
}

// Part 1
// ======

const part1 = input => {
    input = parseInt(input, 10)
    const visited = new Set()

    let searching = true
    const stack = []
    stack.push({dist: 0, x: 1, y: 1})

    while(searching && stack.length) {
        const { dist, x, y} = stack.shift()
        visited.add(`${x}x${y}`)

        for(const [dx, dy] of [[0, -1], [1, 0], [0, 1], [-1, 0]]) {
            const [nx, ny] = [x + dx, y + dy]
            if(!visited.has(`${nx}x${ny}`) && !isWall(nx, ny, input)) {
                if(ny == 39 && nx == 31) {
                    searching = false
                    // display(input, 50, 50, visited)
                    console.log(dist + 1)
                    return
                }
                stack.push({dist: dist + 1, x: nx, y: ny})
            }
        }
    }
}

// Part 2
// ======

const part2 = input => {
    input = parseInt(input, 10)
    const visited = new Set()

    let searching = true
    const stack = []
    stack.push({dist: 0, x: 1, y: 1})

    while(searching && stack.length) {
        const { dist, x, y} = stack.shift()
        if (dist > 50) continue
        visited.add(`${x}x${y}`)

        for(const [dx, dy] of [[0, -1], [1, 0], [0, 1], [-1, 0]]) {
            const [nx, ny] = [x + dx, y + dy]
            if(!visited.has(`${nx}x${ny}`) && !isWall(nx, ny, input)) {
                stack.push({dist: dist + 1, x: nx, y: ny})
            }
        }
    }

    // display(input, 50, 50, visited)
    console.log(visited.size)
}

module.exports = { part1, part2 }
