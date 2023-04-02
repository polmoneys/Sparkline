import { Fragment } from 'react'
import { type NormalizedData, type DataPoint, type Series } from '../types'

interface SparkProps {
  normalizedData: NormalizedData
  datasetIndex: number
  lineColors: string[]
  circleRadius: number
  onSelectPoint?: (point: DataPoint) => void
  seriesProp: Series
}

function Spark(props: SparkProps): JSX.Element {
  const {
    circleRadius,
    onSelectPoint,
    normalizedData,
    datasetIndex,
    lineColors,
    seriesProp,
  } = props

  const color = lineColors[datasetIndex % lineColors.length]
  const className = `serie-${datasetIndex}`
  const { pathData, areaPathData, circles } = normalizedData
  return (
    <Fragment>
      <path d={pathData} fill="none" stroke={color} className={className} />
      <path
        d={areaPathData}
        fill={color}
        opacity="0.3"
        className={`${className}-area`}
      />
      {circles.map(({ x, y }, circleIndex: number) => (
        <circle
          key={circleIndex}
          cx={x}
          cy={y}
          r={circleRadius}
          fill={color}
          {...(onSelectPoint !== undefined && {
            onClick: () => {
              const point = seriesProp[datasetIndex].points[circleIndex]
              onSelectPoint?.(point)
            },
          })}
          className={className}
        />
      ))}
    </Fragment>
  )
}

export default Spark
