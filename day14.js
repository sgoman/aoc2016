const crypto = require('crypto')

const solver = (input, repeats) => {
    const lookup = new Map(), triple = /(.)\1\1/d
    let i = 0, valid = 0
    const getHash = n => {
        if (!lookup.has(n)) {
            let inp = input + n
            for (let j = 0; j <= repeats; j++) inp = crypto.createHash('md5').update(inp).digest('hex')
            lookup.set(n, inp)
        }
        return lookup.get(n)
    }
    while (true) {
        const key = getHash(i)
        const res = triple.exec(key)
        if (res != null) {
            const re = new RegExp(res[1] + '{5}')
            for(let k = i + 1; k <= i + 1000; k++) {
                const hash = getHash(k)
                if (re.test(hash)) {
                    valid++
                    if (valid == 64) return i
                    break
                }
            }
        }
        i++
    }
}

const part1 = input => solver(input, 0)
const part2 = input => solver(input, 2016)

module.exports = { part1, part2 }
