import { invoices, plays } from '@/code/data'

function amountFor(aPerformance, play) {
  let result = 0

  switch (play.type) {
    case 'tragedy':
      result = 40000
      if (aPerformance.audience > 30) {
        result += 1000 * (aPerformance.audience - 30)
      }
      break
    case 'comedy':
      result = 30000
      if (aPerformance.audience > 20) {
        result += 10000 + 500 * (aPerformance.audience - 20)
      }
      result += 300 * aPerformance.audience
      break
    default:
      throw new Error(`unkown type: ${play.type}`)
  }
  return result
}

export function statement() {
  let totalAmount = 0
  let volumeCredits = 0
  let result = `Statement for ${invoices.customer}\n`
  const format = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumIntegerDigits: 2
  }).format
  for (const perf of invoices.performances) {
    const play = plays[perf.playID]
    const thisAmount = amountFor(perf, play)

    // add volume credits
    volumeCredits += Math.max(perf.audience - 30, 0)
    // add extra credit for every ten comedy attendees
    if (play.type === 'comedy') {
      volumeCredits += Math.floor(perf.audience / 5)
    }

    // print line for this order
    result += `${play.name}: ${format(thisAmount / 100)}(${perf.audience} seats)\n`
    totalAmount += thisAmount
  }
  result += `Amount owed is ${format(totalAmount / 100)}\n`
  result += `You earned ${volumeCredits} credits\n`
  console.log(result)
  return format(totalAmount / 100)
}
