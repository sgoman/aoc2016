'use strict'

// Part 1
// ======
const solve = input => {
    const rows = 6
    const cols = 50
    return input.split('\n').reduce((acc, cur, i) => {
        switch(cur.split(' ')[0]) {
            case 'rect':
                const [m, xs, ys] = /(\d+)x(\d+)/.exec(cur)
                const x = parseInt(xs, 10)
                const y = parseInt(ys, 10)
                for(let r = 0; r < y; r++)
                    for(let c = 0; c < x; c++)
                        acc[r][c] = 1
                break
            case 'rotate':
                const [_, indicator, rowcols, amounts] = /(column|row).*=(\d+) by (\d+)/.exec(cur)
                const rowcol = parseInt(rowcols, 10)
                const amount = parseInt(amounts, 10)
                if (indicator == 'row') {
                    acc[rowcol] = acc[rowcol].slice(-amount).concat(acc[rowcol].slice(0, -amount))
                } else {
                    const orig = []
                    for(let r = 0; r < rows; r++)
                        orig.push(acc[r][rowcol])
                    const transformed = orig.slice(-amount).concat(orig.slice(0, -amount))
                    for(let r = 0; r < rows; r++)
                        acc[r][rowcol] = transformed[r]
                }
        }
        return acc
    }, new Array(rows).fill(0).map(() => new Array(cols).fill(0)))
}

const part1 = input => {
    const puzzle = solve(input)
    return puzzle.flat().reduce((acc, cur) => acc + cur, 0)
}

// Part 2
// ======

const part2 = input => {
    const puzzle = solve(input)
    puzzle.forEach(el => console.log(el.join('').replaceAll('0', ' ').replaceAll('1', '#')))
}

module.exports = { part1, part2 }
