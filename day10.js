'use strict'

const init = input => input.trim().split('\n').reduce((acc, cur) => {
  switch(cur.split(' ')[0]) {
    case 'value':
      const matchInit = /value (\d+) goes to bot (\d+)/.exec(cur)
      const val = parseInt(matchInit[1], 10)
      const rec = parseInt(matchInit[2], 10)
      if(acc.bots.has(rec)) {
        acc.bots.set(rec, acc.bots.get(rec).concat(val))
      } else {
        acc.bots.set(rec, [val])
      }
      break
    case 'bot':
      const match = /bot (\d+) gives low to (bot|output) (\d+) and high to (bot|output) (\d+)/.exec(cur)
      if(!match) {
        console.log({cur, msg: 'Bot instruction does not match!'})
      } else {
        const source = parseInt(match[1], 10)
        const lowId = parseInt(match[3], 10)
        const highId = parseInt(match[5], 10)
        acc.code.set(source, {source, low: {type: match[2], id: lowId}, high: {type: match[4], id: highId}})
        if (match[2] == 'output') {
          if (!acc.output.has(lowId)) {
            acc.output.set(lowId, [])
          }
        }
        if (match[2] == 'bot') {
          if (!acc.bots.has(lowId)) {
            acc.bots.set(lowId, [])
          }
        }
        if (match[4] == 'output') {
          if (!acc.output.has(highId)) {
            acc.output.set(highId, [])
          }
        }
        if (match[4] == 'bot') {
          if (!acc.bots.has(highId)) {
            acc.bots.set(highId, [])
          }
        }
      }
  }
  return acc
}, {bots: new Map(), output: new Map(), code: new Map()})

const solve = (puzzle, part) => {
  const getWorkers = bots => [...bots].filter(bot => bot[1].length > 1).map(bot => bot[0])

  let workers = getWorkers(puzzle.bots)
  while(workers.length) {
    workers.forEach(worker => {
      const bot = puzzle.bots.get(worker)
      const mini = Math.min(...bot)
      const maxi = Math.max(...bot)
      const cmd = puzzle.code.get(worker)
      if (part == 1 && maxi == 61 && mini == 17) {
        console.log(worker)
      }
      puzzle.bots.set(worker, bot.filter(val => val !== mini && val !== maxi))
      for(const [type, id, val] of [[cmd.low.type, cmd.low.id, mini], [cmd.high.type, cmd.high.id, maxi]]) {
        if (type == 'bot') {
          puzzle.bots.set(id, puzzle.bots.get(id).concat(val))
        }
        if (type == 'output') {
          puzzle.output.set(id, puzzle.output.get(id).concat(val))
        }
      }
    })
    workers = getWorkers(puzzle.bots)
  }

  if(part == 2)
    console.log([puzzle.output.get(0), puzzle.output.get(1), puzzle.output.get(2)].reduce((acc, cur) => acc * cur, 1))
}

// Part 1
// ======

const part1 = input => {
  solve(init(input), 1)
}

// Part 2
// ======

const part2 = input => {
  solve(init(input), 2)
}

module.exports = { part1, part2 }
