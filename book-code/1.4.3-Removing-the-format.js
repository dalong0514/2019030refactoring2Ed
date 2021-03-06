import { invoices, plays } from '@/code/data'

function amountFor(aPerformance) {
  let result = 0
  switch (playFor(aPerformance).type) {
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
      throw new Error(`unkown type: ${playFor(aPerformance).type}`)
  }
  return result
}

function playFor(aPerformance) {
  return plays[aPerformance.playID]
}

function volumeCreditsFor(aPerformance) {
  let result = 0
  // add volume credits
  result += Math.max(aPerformance.audience - 30, 0)
  // add extra credit for every ten comedy attendees
  if (playFor(aPerformance).type === 'comedy') {
    result += Math.floor(aPerformance.audience / 5)
  }
  return result
}

function usd(aNumber) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumIntegerDigits: 2
  }).format(aNumber/100)
}

export function statement() {
  let totalAmount = 0
  let volumeCredits = 0
  let result = `Statement for ${invoices.customer}\n`
  for (const perf of invoices.performances) {
    volumeCredits = volumeCreditsFor(perf)
    // print line for this order
    result += `${playFor(perf).name}: ${usd(amountFor(perf))}(${perf.audience} seats)\n`
    totalAmount += amountFor(perf)
  }
  result += `Amount owed is ${usd(totalAmount)}\n`
  result += `You earned ${volumeCredits} credits\n`
  console.log(result)
  return usd(totalAmount)
}
