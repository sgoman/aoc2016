'use strict'

const run = (code, regs) => {
    let ip = 0
    let i = 0
    let outputs = 0
    const registers = 'abcd'
    while(ip < code.length) {
        const cmd = code[ip]
        // console.log({i, ip, cmd, regs})
        let x, y
        switch(cmd[0]) {
            case 'out':
                x = (registers.includes(cmd[1])) ? regs[cmd[1]] : parseInt(cmd[1], 10)
                if (x !== (outputs++ % 2)) {
                    return false
                } else {
                    if (outputs > 25) {
                        return true
                    }
                }
                ip++
                break
            case 'cpy':
                x = (registers.includes(cmd[1])) ? regs[cmd[1]] : parseInt(cmd[1], 10)
                if (registers.includes(cmd[2]))
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
            case 'tgl':
                x = (registers.includes(cmd[1])) ? regs[cmd[1]] : parseInt(cmd[1], 10)
                if (x +ip >= code.length || x + ip < 0) {
                    ip++
                    break
                }
                switch (code[x + ip][0]) {
                    case 'inc':
                        code[x + ip][0] = 'dec'
                        break
                    case 'dec':
                    case 'tgl':
                        code[x + ip][0] = 'inc'
                        break
                    case 'jnz':
                        code[x + ip][0] = 'cpy'
                        break
                    case 'cpy':
                        code[x + ip][0] = 'jnz'
                        break
                }
                ip++
                break
        }
    }
    return regs.a
}

// Part 1
// ======

const part1 = input => {
    const code = input.trim().split('\n').map(line => line.split(' '))
    let i = 1

    while(!run(code, {a: i, b: 0, c: 0, d: 0})) i++

    return i
}

// Part 2
// ======

const part2 = input => {
    return 'You need to have collected every star from the rest of the challenges this year!'
}

module.exports = { part1, part2 }
