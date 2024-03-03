import { useMemo } from 'react'
import { type DataPoints } from './types'

interface UseSeriesInput {
  items: DataPoints[]
  width: number
  height: number
  circleRadius: number
}

interface UseSeriesOutput {
  items: Array<{
    pathData: string
    areaPathData: string
    circles: Array<{ x: number; y: number }>
  }>
  minY: number
  maxY: number
  minX: number
  maxX: number
  normalizeX: (x: number) => number
  normalizeY: (x: number) => number
  series: number
}

const useSeries = (props: UseSeriesInput): UseSeriesOutput => {
  const { items: itemsProps, width, height, circleRadius = 3 } = props
  return useMemo<UseSeriesOutput>(() => {
    const points = itemsProps.flat()

    const minX = Math.min(...points.map(d => new Date(d.date).getTime()))
    const maxX = Math.max(...points.map(d => new Date(d.date).getTime()))
    const minY = Math.min(...points.map(d => d.value))
    const maxY = Math.max(...points.map(d => d.value))
    // accomodate caption on top
    const gapTop = 4
    const normalizeX = (value: number): number =>
      circleRadius +
      ((value - minX) / (maxX - minX)) * (width - 2 * circleRadius)
    const normalizeY = (value: number): number =>
      circleRadius +
      ((value - minY) / (maxY - minY)) * (height - gapTop * circleRadius)

    const normalized = itemsProps.map(item => {
      const pathDataArray = item.map(
        (d, i) =>
          `${i === 0 ? 'M' : 'L'}${normalizeX(new Date(d.date).getTime())},${
            height - normalizeY(d.value)
          }`,
      )

      const pathData = pathDataArray.join(' ')

      const areaPathDataArray = [...pathDataArray]
      areaPathDataArray.push(`L${width - circleRadius},${height}`)
      areaPathDataArray.push(`L${circleRadius},${height}`)
      areaPathDataArray.push('Z')
      const areaPathData = areaPathDataArray.join(' ')

      const circles = item.map(d => ({
        x: normalizeX(new Date(d.date).getTime()),
        y: height - normalizeY(d.value),
      }))

      return { pathData, areaPathData, circles }
    })

    return {
      series: normalized.length,
      items: normalized,
      minY,
      maxY,
      minX,
      maxX,
      normalizeY,
      normalizeX,
    }
  }, [itemsProps, width, height, circleRadius])
}
export default useSeries
