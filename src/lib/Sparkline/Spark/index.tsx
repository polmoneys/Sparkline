import { Fragment } from 'react'
import { type NormalizedData, type DataPoint, type Series } from '../types'
import useSparklineUrl from '../useSparklineUrl'

interface SparkProps {
  normalizedData: NormalizedData
  datasetIndex: number
  lineColors: string[]
  circleRadius: number
  onSelectPoint?: (point: DataPoint) => void
  onSelectPointToUrl?: (point: any) => void
  seriesProp: Series
}

function Spark(props: SparkProps): JSX.Element {
  const {
    circleRadius,
    onSelectPoint,
    onSelectPointToUrl,
    normalizedData,
    datasetIndex,
    lineColors,
    seriesProp,
  } = props

  const { isPointInUrl, pointForUrl } = useSparklineUrl()

  const color = lineColors[datasetIndex % lineColors.length]
  const className = `serie-${datasetIndex}`
  const { pathData, areaPathData, circles } = normalizedData

  return (
    <Fragment>
      <path d={pathData} fill="none" stroke={color} className={className} />
      <path
        d={areaPathData}
        fill={color}
        className={`${className}-area`}
        pointerEvents="none"
        opacity="0.6"
      />
      {circles.map(({ x, y }, circleIndex: number) => {
        const point = seriesProp[datasetIndex].points[circleIndex]
        const inUrl = isPointInUrl(point)
        const dimm = !inUrl && onSelectPointToUrl !== undefined
        const canSelectPoint = onSelectPoint !== undefined
        const canSelectPointToUrl = onSelectPointToUrl !== undefined

        return (
          <circle
            key={circleIndex}
            cx={x}
            cy={y}
            r={circleRadius}
            fill={color}
            {...(dimm && { style: { opacity: 0.4 } })}
            {...(canSelectPoint && {
              onClick: () => {
                onSelectPoint?.(point)
              },
            })}
            {...(canSelectPointToUrl && {
              onClick: () => {
                const urlPoint = pointForUrl(point)
                onSelectPointToUrl(urlPoint)
              },
            })}
            className={className}
          />
        )
      })}
    </Fragment>
  )
}

export default Spark
