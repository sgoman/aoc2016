'use strict'

const run = (code, regs) => {
    let ip = 0
    let i = 0
    const registers = 'abcd'
    while(ip < code.length) {
        const cmd = code[ip]
        // console.log({i, ip, cmd, regs})
        let x, y
        switch(cmd[0]) {
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
    return run(input.trim().split('\n').map(line => line.split(' ')), {a: 7, b: 0, c: 0, d: 0})
}

// Part 2
// ======

const part2 = input => {
    const puzzle = input.trim().split('\n').map(line => line.split(' '))
    const eggs = 12
    // The input code computes a factorial of eggs and adds a constant.
    // Instead of adding a multiply instruction and patching the code,
    // just compute the result.

    // the factorial
    let fact = 1
    for(let f = eggs; f > 1;f--) fact *= f

    // The constant is the product of two hardcoded instructions.
    // The two factors are found in a consecutive cpy and jnz to d
    // instruction, so let's find them...
    for(let i = 0; i < puzzle.length; i++) {
        if (puzzle[i][0] == 'jnz' && puzzle[i][2] == 'd') {
            const x = parseInt(puzzle[i][1], 10)
            const y = parseInt(puzzle[i - 1][1], 10)
            // Just some math left to do
            return fact + x * y
        }
    }

}

module.exports = { part1, part2 }
