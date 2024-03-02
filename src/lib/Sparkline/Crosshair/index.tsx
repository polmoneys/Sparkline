import { Fragment } from 'react'
import { type NormalizedDataSeries } from '../types'

interface CrosshairProps {
  activeIndex: number | null
  normalizedDataSeries: NormalizedDataSeries
  crosshairColor: string
  circleColors: string[]
  height: number
  width: number
}

function Crosshair(props: CrosshairProps): JSX.Element {
  const {
    circleColors,
    width,
    activeIndex,
    normalizedDataSeries,
    height,
    crosshairColor,
  } = props

  if (activeIndex === null) return <Fragment />

  const item = normalizedDataSeries[0].circles[activeIndex]
  if (item === undefined || item.x === undefined) return <Fragment />
  const x = item.x
  return (
    <Fragment>
      <line
        x1={x}
        y1={0}
        x2={x}
        y2={height}
        stroke={crosshairColor}
        strokeWidth={1}
      />

      {normalizedDataSeries.map((normalizedData, datasetIndex: number) => {
        const y = normalizedData.circles[activeIndex].y
        const color = circleColors[datasetIndex % circleColors.length]
        return (
          <g key={`crosshair-${datasetIndex}`}>
            <line
              x1={0}
              y1={y}
              x2={width}
              y2={y}
              stroke={color}
              strokeWidth={1}
            />
            {/* <text
                  className="offscreen"
                  x={x + 10}
                  y={y - 5}
                  fontSize={12}
                  fontFamily="sans-serif"
                >
                  {input[datasetIndex][activeIndex].value}
                </text> */}
          </g>
        )
      })}
    </Fragment>
  )
}

export default Crosshair
