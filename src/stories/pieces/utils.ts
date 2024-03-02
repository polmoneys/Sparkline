import { type Serie } from '@/lib/Sparkline/types'
import { DARK_COLORS } from '@/lib/Sparkline/utils'
export const VariantOptions = ['canon', 'window'] as const
export type Variants = (typeof VariantOptions)[number]

const generateData = (startValue: number, length: number, meta = 'AAPL') => {
  const data: any[] = []
  for (let i = 0; i < length; i++) {
    const date = new Date(2023, 0, 1)
    date.setDate(date.getDate() + i)
    data.push({
      label: `Label of point ${i}`,
      value: startValue + Math.random() * 20 - 10,
      date: date.toISOString(),
    })
  }
  return data
}

export const dataAllSeries: Serie[] = [
  {
    name: 'AAPL',
    points: generateData(15, 180),
    color: DARK_COLORS[0],
  },
  {
    name: 'AMZN',
    points: generateData(20, 180),
    color: DARK_COLORS[1],
  },
  {
    name: 'GOOGL',
    points: generateData(10, 180),
    color: DARK_COLORS[2],
  },
]

export const dataAllSeriesShort: Serie[] = [
  {
    name: 'AAPL',
    points: generateData(15, 80),
    color: DARK_COLORS[0],
  },
  {
    name: 'AMZN',
    points: generateData(20, 80),
    color: DARK_COLORS[1],
  },
  {
    name: 'GOOGL',
    points: generateData(10, 80),
    color: DARK_COLORS[2],
  },
]

export const dataAllSeriesSuperShort: Serie[] = [
  {
    name: 'AAPL',
    points: generateData(50, 40),
    color: DARK_COLORS[0],
  },
  {
    name: 'AMZN',
    points: generateData(20, 40),
    color: DARK_COLORS[1],
  },
  {
    name: 'GOOGL',
    points: generateData(2, 40),
    color: DARK_COLORS[2],
  },
]
export const dataSeries = [
  {
    name: 'AAPL',
    points: generateData(10, 40),
    color: DARK_COLORS[0],
  },
  {
    name: 'AMZN',
    points: generateData(20, 40),
    color: DARK_COLORS[1],
  },
]

export const dataSerie = [
  {
    name: 'AAPL',
    points: generateData(50, 99),
    color: DARK_COLORS[0],
  },
]
