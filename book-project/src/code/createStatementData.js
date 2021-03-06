import { invoices, plays } from '@/code/data'

export function createStatementData() {
  const statementData = {}
  statementData.customer = invoices.customer
  statementData.performances = invoices.performances.map(enrichPerformance)
  statementData.totalAmount = totalAmount(statementData)
  statementData.totalVolumeCredits = totalVolumeCredits(statementData)
  return statementData

  function enrichPerformance(aPerformance) {
    const result = Object.assign({}, aPerformance)
    result.play = playFor(result)
    result.amount = amountFor(result)
    result.volumeCredits = volumeCreditsFor(result)
    return result
  }

  function playFor(aPerformance) {
    return plays[aPerformance.playID]
  }

  function amountFor(aPerformance) {
    let result = 0

    switch (aPerformance.play.type) {
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
        throw new Error(`unkown type: ${aPerformance.play.type}`)
    }
    return result
  }

  function volumeCreditsFor(aPerformance) {
    let result = 0
    // add volume credits
    result += Math.max(aPerformance.audience - 30, 0)
    // add extra credit for every ten comedy attendees
    if (aPerformance.play.type === 'comedy') {
      result += Math.floor(aPerformance.audience / 5)
    }
    return result
  }

  function totalAmount(data) {
    return data.performances
      .reduce((total, p) => total + p.amount, 0)
  }

  function totalVolumeCredits(data) {
    return data.performances
      .reduce((total, p) => total + p.volumeCredits, 0)
  }
}
