'use strict'

// Part 1
// ======

const part1 = input => {
    const l = input.length
    let ip = 0
    let output = ''
    while(ip < l) {
        if(input[ip] == '(') {
            // decompress
            let endcmd = ip + 1
            while(input[endcmd] !== ')' && endcmd < l) endcmd++
            const [m, counts, repeats] = /(\d+)x(\d+)/.exec(input.substring(ip, endcmd))
            const count = parseInt(counts, 10)
            const repeat = parseInt(repeats, 10)
            for(let r = 0; r < repeats; r++) output += input.substring(endcmd + 1, endcmd + 1 + count)
            ip = endcmd + count + 1
        } else {
            // copy
            output += input[ip]
            ip++
        }
    }
    return output.trim().length
}

// Part 2
// ======

const part2 = input => {
    let l = input.length
    let i = 0

    while(i < input.length) {
        if (input[i] !== '(') {
            i++
        } else {
            const match = input.substring(i).match(/^\((\d+)x(\d+)\)/)
            const count = parseInt(match[1], 10)
            const repeat = parseInt(match[2], 10)
            const matchStr = input.substring(i + match[0].length, i + match[0].length + count)
            const decompL = part2(matchStr)
            l += decompL * repeat - matchStr.length - match[0].length
            i = i + match[0].length + matchStr.length - 1
        }
    }

    return l
}

module.exports = { part1, part2 }
