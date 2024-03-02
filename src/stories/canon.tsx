import {
  useState,
  type Dispatch,
  type SetStateAction,
  useMemo,
  useEffect,
  useLayoutEffect,
  useRef,
  Fragment,
} from 'react'
import { useControls, folder, button } from 'leva'
import {
  dataAllSeries,
  dataSeries,
  dataSerie,
  type Variants,
} from './pieces/utils'
import CustomTooltip from './Tooltip'
import { Mouse, Sparkline } from '@/lib'
import {
  DARK_COLORS,
  HAPPY_COLORS,
  formatDateTime,
  formatNumber,
} from '@/lib/Sparkline/utils'
import useSparklineUrl from '@/lib/Sparkline/useSparklineUrl'
import Card from './pieces/Card'

interface Props {
  setter: Dispatch<SetStateAction<Variants>>
}

const schema = [
  {
    column: 'serie',
    type: String,
    value: (item: any) => item.serie,
    width: 30,
    wrap: true,
  },
  {
    column: 'label',
    type: String,
    value: (item: any) => item.label,
    width: 50,
    wrap: true,
  },
  {
    column: 'value',
    type: String,
    value: (item: any) => formatNumber(item.value),
    width: 20,
    fontWeight: 'bold' as const,
  },
  {
    column: 'date',
    type: String,
    value: (item: any) => formatDateTime(new Date(item.date)),
    width: 30,
  },
]

function Foci(props: Props): JSX.Element {
  const { setter } = props

  const [demo, setDemo] = useState(dataSerie)
  const [circleRadius, setCircleRadius] = useState(5)
  const [happy, setHappy] = useState(true)

  const { w, h } = useControls({
    dimensions: folder({
      w: {
        label: 'width',
        value: 500,
        min: 220,
        max: 800,
      },
      h: {
        label: 'height',
        value: 150,
        min: 430,
        max: 600,
      },
    }),
    series: folder(
      {
        single: button(get => {
          setDemo(dataSerie)
        }),
        compare: button(get => {
          setDemo(dataSeries)
        }),
        multiple: button(get => {
          setDemo(dataAllSeries)
        }),
      },
      { color: '#007bff' },
    ),
    colors: folder(
      {
        sad: button(get => {
          setHappy(false)
        }),
        happy: button(get => {
          setHappy(true)
        }),
      },
      { color: '#ecd161' },
    ),
    demos: folder(
      {
        window: button(get => {
          setter('window')
        }),
      },
      { color: '#ec8661' },
    ),
    dots: folder(
      {
        sm: button(get => {
          setCircleRadius(5)
        }),
        lg: button(get => {
          setCircleRadius(7)
        }),
        xl: button(get => {
          setCircleRadius(9)
        }),
      },
      { color: '#e3a37a' },
    ),
  })

  const seriesWithColors = useMemo(
    () =>
      happy ? demo.map((x, i) => ({ ...x, color: HAPPY_COLORS[i] })) : demo,
    [demo, happy],
  )

  const palette = useMemo(() => (happy ? HAPPY_COLORS : DARK_COLORS), [happy])
  const { setSearchParams, pointInUrlDetails } = useSparklineUrl()

  return (
    <div className="center">
      <div style={{ maxWidth: w }}>
        <Mouse series={seriesWithColors}>
          {active => (
            <Sparkline
              series={seriesWithColors}
              TooltipComponent={CustomTooltip}
              activeIndex={active}
              height={h}
              width={w}
              circleRadius={circleRadius}
              lineColors={palette}
              circleColors={palette}
              canDim
              canExport
              exportSchema={schema}
              onSelectPointToUrl={p => {
                setSearchParams(p)
              }}
            />
          )}
        </Mouse>
      </div>
      <div className="toolbar sticked-toolbar">
        {pointInUrlDetails() !== undefined && (
          <Card
            value={pointInUrlDetails()?.value ?? ''}
            label={pointInUrlDetails()?.date ?? ''}
            onClick={() => {
              setSearchParams()
            }}
          />
        )}
      </div>
    </div>
  )
}

export default Foci
