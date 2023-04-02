import { useRef, useState, useMemo, useCallback } from 'react'
import Stick from 'react-stick'
import {
  type DataPoints,
  type Series,
  type DataPoint,
  type Captions,
} from './types'
import useSeries from './useSeries'
import useResizeObserver from './useResizeObserver'
import {
  DARKER_COLORS,
  DARK_COLORS,
  SPARKLINE_PADDING_START,
  formatDateTime,
  formatNumber,
  isPointInsideRect,
  pluralize,
} from './utils'
import Selection from './Selection'
import Spark from './Spark'
import Crosshair from './Crosshair'
import Caption from './Caption'
import Focus from './Focus'
import Export, { type ExportFormat } from './Export'
import styles from './index.module.css'

export interface SparklineProps {
  series: Series
  caption?: string
  captionClassName?: string
  points?: DataPoint[][]
  width?: number
  height?: number
  lineColors?: string[]
  circleColors?: string[]
  circleRadius?: number
  crosshairColor?: string
  activeIndex?: number | null
  onSelectPoint?: (point: DataPoint) => void
  TooltipComponent?: React.FC<{
    x: number
    y: number
    point: any
    color: string
    serie: string
  }>
  canSelect?: boolean
  onSelectPoints?: (point: DataPoints) => void
  canDim?: boolean
  canExport?: boolean
  exportFormat?: ExportFormat
  exportFilename?: string
  onExport?: () => void
  onExportError?: (error: any) => void
}

const Sparkline = (props: SparklineProps): JSX.Element => {
  const {
    series: seriesProp,
    width: widthProp,
    height: heightProp,
    circleRadius = 2,
    lineColors = DARK_COLORS,
    circleColors = DARKER_COLORS,
    activeIndex = null,
    TooltipComponent,
    points,
    onSelectPoint,
    canSelect = false,
    canDim = false,
    canExport = false,
    onExportError,
    onExport,
    exportFilename,
    exportFormat,
    onSelectPoints,
    crosshairColor = 'rgba(0, 0, 0, 0.2)',
    captionClassName,
    caption: captionProp,
  } = props

  const divRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const parentSize = useResizeObserver(divRef)

  const width = useMemo(
    () => widthProp ?? parentSize.width ?? 200,
    [parentSize, widthProp],
  )
  const height = useMemo(
    () => heightProp ?? parentSize.height ?? 100,
    [parentSize, heightProp],
  )
  const input =
    points !== undefined ? points : seriesProp.map(item => item.points)

  const { series, items, minY, maxY, minX, maxX } = useSeries({
    items: input,
    width,
    height,
    circleRadius,
  })

  const [activeCaption, setShowCaption] = useState<Captions | null>(null)
  const hideCaption = (): void => {
    setShowCaption(null)
  }
  const toggleCaption = useCallback((): void => {
    if (activeCaption === 'series') {
      hideCaption()
      return
    }
    setShowCaption('series')
  }, [activeCaption])
  const toggleFocus = useCallback((): void => {
    if (activeCaption === 'focus') {
      hideCaption()
      return
    }
    setShowCaption('focus')
  }, [activeCaption])

  const caption = useMemo(
    () =>
      `Looking at ${series} ${pluralize(
        'serie',
        series,
      )} with min of ${formatNumber(minY)} and max ${formatNumber(
        maxY,
      )}. Period ${formatDateTime(minX as any)}-${formatDateTime(maxX as any)}
      `,
    [series, minY, maxY, minX, maxX],
  )

  return (
    <Stick
      className={styles.stick}
      sameWidth
      autoFlipVertically
      node={
        <Caption
          kind={activeCaption}
          className={captionClassName}
          caption={captionProp ?? caption}
          series={seriesProp}
        />
      }
      position="top center"
      onClickOutside={hideCaption}
    >
      <div
        ref={divRef}
        className={styles.root}
        style={{
          maxHeight: height + SPARKLINE_PADDING_START ?? '100%',
          paddingTop: SPARKLINE_PADDING_START,
        }}
      >
        <svg
          ref={svgRef}
          width={width}
          height={height}
          aria-label={caption}
          className={styles.svg}
        >
          {items.map((normalizedData, datasetIndex: number) => (
            <Spark
              key={datasetIndex}
              lineColors={lineColors}
              circleRadius={circleRadius}
              onSelectPoint={onSelectPoint}
              seriesProp={seriesProp}
              normalizedData={normalizedData}
              datasetIndex={datasetIndex}
            />
          ))}
          <Crosshair
            activeIndex={activeIndex}
            normalizedDataSeries={items}
            width={width}
            height={height}
            crosshairColor={crosshairColor}
            circleColors={circleColors}
          />
        </svg>
        {TooltipComponent !== undefined &&
          activeIndex !== null &&
          items.map(({ circles }, datasetIndex: number) => {
            const { x, y } = circles[activeIndex]
            const color = circleColors[datasetIndex % circleColors.length]
            const point = input[datasetIndex][activeIndex]
            return (
              <TooltipComponent
                key={datasetIndex}
                x={x + 10}
                y={y - 5}
                point={point}
                serie={seriesProp[datasetIndex].name}
                color={color}
              />
            )
          })}
        {canSelect && (
          <Selection
            width={width}
            onSelectionEnd={rect => {
              if (rect != null) {
                const selectedPoints: DataPoint[][] = []
                items.forEach(({ circles }, datasetIndex) => {
                  const datasetPoints: DataPoint[] = []
                  circles.forEach((circle, circleIndex) => {
                    if (isPointInsideRect(circle, rect)) {
                      datasetPoints.push(
                        seriesProp[datasetIndex].points[circleIndex],
                      )
                    }
                  })
                  selectedPoints.push(datasetPoints)
                })
                onSelectPoints?.(selectedPoints.flat())
                return selectedPoints
              }
            }}
          />
        )}
        <div className={styles.actions}>
          <Caption.Trigger onClick={toggleCaption} />
          {canDim && <Focus.Trigger onClick={toggleFocus} />}
          {canExport && (
            <Export
              onError={onExportError}
              onExport={onExport}
              filename={exportFilename}
              format={exportFormat}
              divRef={divRef}
            />
          )}
        </div>
      </div>
    </Stick>
  )
}

export default Sparkline
export { dim } from './utils'
export type { Series } from './types'
