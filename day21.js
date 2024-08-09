'use strict'

// Part 1
// ======

const part1 = input => {
    let password = 'abcdefgh'
    const l = password.length
    let a, m, t, x, y
    for(const line of input.trim().split('\n')) {
        m = /swap position (\d) with position (\d)/.exec(line)
        if (m !== null) {
            x = parseInt(m[1], 10)
            y = parseInt(m[2], 10)
            a = password.split('')
            t = a[x]
            a[x] = a[y]
            a[y] = t
            password = a.join('')
            continue
        }
        m = /swap letter (.) with letter (.)/.exec(line)
        if (m !== null) {
            x = password.indexOf(m[1])
            y = password.indexOf(m[2])
            a = password.split('')
            t = a[x]
            a[x] = a[y]
            a[y] = t
            password = a.join('')
            continue
        }
        m = /rotate (left|right) (\d) steps?/.exec(line)
        if (m !== null) {
            x = m[1]
            y = parseInt(m[2], 10)
            if (y == 0) continue
            if (x == 'left') {
                password = password.substring(y) + password.substring(0, y)
            } else {
                password = password.substring(l - y) + password.substring(0, l - y)
            }
            continue
        }
        m = /rotate based on position of letter (.)/.exec(line)
        if (m !== null) {
            x = password.indexOf(m[1])
            t = (x > 3) ? x + 2 : x + 1
            y = t % l
            if (y == 0) continue
            password = password.substring(l - y) + password.substring(0, l - y)
            continue
        }
        m = /reverse positions (\d) through (\d)/.exec(line)
        if (m !== null) {
            x = parseInt(m[1], 10)
            y = parseInt(m[2], 10)
            a = (x > 0) ? password.substring(0, x) : ''
            t = (y < 7) ? password.substring(y + 1) : ''
            password = a + password.substring(x, y + 1).split('').reverse().join('') + t
            continue
        }
        m = /move position (\d) to position (\d)/.exec(line)
        if (m !== null) {
            x = parseInt(m[1], 10)
            y = parseInt(m[2], 10)
            a = password.split('')
            t = a.splice(x, 1)
            a.splice(y, 0, t)
            password = a.join('')
            continue
        }
    }
    return password
}

// Part 2
// ======

const part2 = input => {
    let password = 'abcdefgh' // part 1 input
    password = 'dbfgaehc' // test reverse of part 1
    password = 'fbgdceah' // part 2 input
    const l = password.length
    let a, m, t, x, y
    for(const line of input.trim().split('\n').reverse()) {
        m = /swap position (\d) with position (\d)/.exec(line)
        if (m !== null) {
            x = parseInt(m[1], 10)
            y = parseInt(m[2], 10)
            a = password.split('')
            t = a[x]
            a[x] = a[y]
            a[y] = t
            password = a.join('')
            continue
        }
        m = /swap letter (.) with letter (.)/.exec(line)
        if (m !== null) {
            x = password.indexOf(m[1])
            y = password.indexOf(m[2])
            a = password.split('')
            t = a[x]
            a[x] = a[y]
            a[y] = t
            password = a.join('')
            continue
        }
        m = /rotate (left|right) (\d) steps?/.exec(line)
        if (m !== null) {
            x = m[1]
            y = parseInt(m[2], 10)
            if (y == 0) continue
            if (x == 'right') {
                password = password.substring(y) + password.substring(0, y)
            } else {
                password = password.substring(l - y) + password.substring(0, l - y)
            }
            continue
        }
        m = /rotate based on position of letter (.)/.exec(line)
        if (m !== null) {
            x = password.indexOf(m[1])
            t = [1, 1, 6, 2, 7, 3, 0, 4]
            y = t[x]
            if (y == 0) continue
            password = password.substring(y) + password.substring(0, y)
            continue
        }
        m = /reverse positions (\d) through (\d)/.exec(line)
        if (m !== null) {
            x = parseInt(m[1], 10)
            y = parseInt(m[2], 10)
            a = (x > 0) ? password.substring(0, x) : ''
            t = (y < 7) ? password.substring(y + 1) : ''
            password = a + password.substring(x, y + 1).split('').reverse().join('') + t
            continue
        }
        m = /move position (\d) to position (\d)/.exec(line)
        if (m !== null) {
            x = parseInt(m[2], 10)
            y = parseInt(m[1], 10)
            a = password.split('')
            t = a.splice(x, 1)
            a.splice(y, 0, t)
            password = a.join('')
            continue
        }
    }
    return password
}

module.exports = { part1, part2 }
