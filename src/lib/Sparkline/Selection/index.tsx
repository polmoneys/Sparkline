import { useRef, useState, useCallback, type MouseEvent } from 'react'
import styles from '../index.module.css'

interface SelectionProps {
  onSelectionEnd: (rect: RectCoordinates | null) => void
  width?: number
  fill?: string
  stroke?: string
}

export interface RectCoordinates {
  x: number
  y: number
  width: number
  height: number
}

const Selection = (props: SelectionProps): JSX.Element => {
  const {
    onSelectionEnd,
    width = '100%',
    stroke = 'var(--sparkline-rect-stroke)',
    fill = 'var(--sparkline-rect-color)',
  } = props
  const [origin, setOrigin] = useState<RectCoordinates | null>(null)
  const [rect, setRect] = useState<RectCoordinates | null>(null)
  const svgRef = useRef<SVGSVGElement>(null)

  const onMouseDown = useCallback(
    (event: MouseEvent<SVGSVGElement>) => {
      const svg = svgRef.current
      if (svg != null) {
        const point = svg.createSVGPoint()
        point.x = event.clientX
        point.y = event.clientY
        const { x, y } = point.matrixTransform(svg.getScreenCTM()?.inverse())

        setOrigin({ x, y, width: 0, height: 0 })
      }
    },
    [setOrigin],
  )

  const onMouseMove = useCallback(
    (event: MouseEvent<SVGSVGElement>) => {
      if (origin != null) {
        const svg = svgRef.current
        if (svg != null) {
          const point = svg.createSVGPoint()
          point.x = event.clientX
          point.y = event.clientY
          const { x, y } = point.matrixTransform(svg.getScreenCTM()?.inverse())

          setRect({
            x: Math.min(origin.x, x),
            y: Math.min(origin.y, y),
            width: Math.abs(x - origin.x),
            height: Math.abs(y - origin.y),
          })
        }
      }
    },
    [origin],
  )

  const onMouseUp = useCallback(() => {
    onSelectionEnd(rect)
    setOrigin(null)
    setRect(null)
  }, [onSelectionEnd, rect])

  return (
    <svg
      ref={svgRef}
      className={styles.rect}
      style={{
        width,
      }}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
    >
      {rect != null && (
        <rect
          x={rect.x}
          y={rect.y}
          width={rect.width}
          height={rect.height}
          fill={fill}
          stroke={stroke}
        />
      )}
    </svg>
  )
}

export default Selection
