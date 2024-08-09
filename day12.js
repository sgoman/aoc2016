'use strict'

const run = (code, regs) => {
    let ip = 0
    const registers = 'abcd'
    while(ip < code.length) {
        const cmd = code[ip]
        let x, y
        switch(cmd[0]) {
            case 'cpy':
                x = (registers.includes(cmd[1])) ? regs[cmd[1]] : parseInt(cmd[1], 10)
                regs[cmd[2]] = x
                ip++
                break
            case 'inc':
                regs[cmd[1]]++
                ip++
                break
            case 'dec':
                regs[cmd[1]]--
                ip++
                break
            case 'jnz':
                x = (registers.includes(cmd[1])) ? regs[cmd[1]] : parseInt(cmd[1], 10)
                y = (registers.includes(cmd[2])) ? regs[cmd[2]] : parseInt(cmd[2], 10)
                if (x !== 0) {
                    ip += y
                } else {
                    ip++
                }
                break
        }
    }
    return regs.a
}

// Part 1
// ======

const part1 = input => {
    return run(input.trim().split('\n').map(line => line.split(' ')), {a: 0, b: 0, c: 0, d: 0})
}

// Part 2
// ======

const part2 = input => {
    return run(input.trim().split('\n').map(line => line.split(' ')), {a: 0, b: 0, c: 1, d: 0})
}

module.exports = { part1, part2 }
