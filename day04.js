'use strict'

const freq = name => {
  return name.replaceAll('-', '').split('').reduce((acc, cur) => {
    if (acc[cur]) {
      acc[cur]++
    } else {
      acc[cur] = 1
    }
    return acc
  }, {})
}

const arrayHasIndex = (array, index) => Array.isArray(array) && array.hasOwnProperty(index)

const grouped = f => {
  const result = []
  for (const att in f) {
    if (!arrayHasIndex(result, f[att])) {
      result[f[att]] = [att]
    } else {
      result[f[att]].push(att)
    }
  }
  return result.map(el => {
    el.sort()
    return el.join('')
  }).reverse().join('')
}

const mod = (n, p) => {
  if (n < 0) n = p - Math.abs(n) % p
  return n % p
}

const rot = (msg, key) => {
  return msg.toUpperCase().split('').reduce((acc, letter) => {
    let code = letter.charCodeAt(0)
    if (code >= 65 && code < 65 + 26) {
      acc += String.fromCharCode(mod(code - 65 + key, 26) + 65)
    } else {
      acc += letter
    }
    return acc
  }, '')
}


// Part 1
// ======

const part1 = input => {
  const puzzle = input.split('\n').map(line => /^(?<name>.*)-(?<sector>\d+)\[(?<checksum>[a-z]+)\]$/.exec(line))
  return puzzle.reduce((acc, p) => grouped(freq(p.groups.name)).startsWith(p.groups.checksum) ? acc + parseInt(p.groups.sector, 10) : acc, 0)
}

// Part 2
// ======

const part2 = input => {
  const puzzle = input.split('\n').map(line => /^(?<name>.*)-(?<sector>\d+)\[(?<checksum>[a-z]+)\]$/.exec(line))
  for (const p of puzzle) {
    if (rot(p.groups.name, parseInt(p.groups.sector, 10)).toLowerCase().includes('north'))
      console.log(p.groups.sector)
  }
}

module.exports = { part1, part2 }
