import { useRef, useState, useMemo, useCallback, Fragment } from 'react'
import Stick from 'react-stick'
import {
  type DataPoint,
  type Captions,
  type SparklineData,
  type SparklineAddons,
  type SparklineSelectionCallbacks,
  type SparklineAppearance,
  type SparklineExportOptions,
} from './types'
import useSeries from './useSeries'
import useResizeObserver from './useResizeObserver'
import {
  DARK_COLORS,
  DEFAULT_SPARKLINE_HEIGHT,
  DEFAULT_SPARKLINE_WIDTH,
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
import Export from './Export'
import styles from './index.module.css'
import Icon from './Icons'

export interface SparklineProps
  extends SparklineData,
    SparklineAddons,
    SparklineAppearance,
    SparklineSelectionCallbacks,
    SparklineExportOptions {
  canDim?: boolean
  canSelect?: boolean
  canExport?: boolean
}

const Sparkline = (props: SparklineProps): JSX.Element => {
  const {
    series: seriesProp,
    width: widthProp,
    height: heightProp,
    circleRadius = 2,
    lineColors = DARK_COLORS,
    circleColors = DARK_COLORS,
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
    exportSchema,
    onSelectPoints,
    onSelectPointToUrl,
    crosshairColor = 'var(--sparkline-crosshair-color)',
    captionClassName,
    caption: captionProp,
  } = props

  const divRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const parentSize = useResizeObserver(divRef)

  const width = useMemo(
    () => widthProp ?? parentSize.width ?? DEFAULT_SPARKLINE_WIDTH,
    [parentSize, widthProp, DEFAULT_SPARKLINE_WIDTH],
  )
  const height = useMemo(
    () => heightProp ?? parentSize.height ?? DEFAULT_SPARKLINE_HEIGHT,
    [parentSize, heightProp, DEFAULT_SPARKLINE_HEIGHT],
  )
  const input = useMemo(
    () => (points !== undefined ? points : seriesProp.map(item => item.points)),
    [points, seriesProp],
  )

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
      `Min ${formatNumber(minY)}, Max ${formatNumber(
        maxY,
      )}. Period: ${formatDateTime(minX as any)}-${formatDateTime(maxX as any)}
      `,
    [series, minY, maxY, minX, maxX],
  )

  const canTooltip = TooltipComponent !== undefined && activeIndex !== null
  const [activeActionBar, setActiveActionBar] = useState(true)

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
              onSelectPointToUrl={onSelectPointToUrl}
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
        {canTooltip &&
          items.map(({ circles }, datasetIndex: number) => {
            if (circles[activeIndex] === undefined)
              return <Fragment key={datasetIndex} />
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
          {activeActionBar && (
            <Fragment>
              <Caption.Trigger onClick={toggleCaption} />
              {canDim && <Focus.Trigger onClick={toggleFocus} />}
              {canExport && (
                <Export
                  onError={onExportError}
                  onExport={onExport}
                  filename={exportFilename}
                  format={exportFormat}
                  divRef={divRef}
                  items={input}
                  seriesProp={seriesProp}
                  {...(exportSchema !== undefined && { schema: exportSchema })}
                />
              )}
            </Fragment>
          )}
          <button
            type="button"
            onClick={() => {
              setActiveActionBar(prev => !prev)
            }}
            className={styles.mlAuto}
          >
            <Icon name={activeActionBar ? 'hidden' : 'hide'} />
          </button>
        </div>
      </div>
    </Stick>
  )
}

export default Sparkline
export { dim } from './utils'
export type { Series } from './types'
