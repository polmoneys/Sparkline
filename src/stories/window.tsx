import {
  type Dispatch,
  Fragment,
  type SetStateAction,
  useMemo,
  useState,
} from 'react'
import { useControls, folder, button } from 'leva'
import {
  dataAllSeries,
  dataSerie,
  dataSeries,
  type Variants,
} from './pieces/utils'
import { Window, Sparkline, Mouse } from '@/lib'
import {
  DARK_COLORS,
  formatDateTime,
  formatNumber,
  slugify,
  HAPPY_COLORS,
} from '@/lib/Sparkline/utils'
import CustomTooltip from './Tooltip'
import { type DataPoints } from '@/lib/Sparkline/types'
import Card from './pieces/Card'

interface Props {
  setter: Dispatch<SetStateAction<Variants>>
}

function WindowStory(props: Props): JSX.Element {
  const { setter } = props
  const [demo, setDemo] = useState(dataSerie)
  const [circleRadius, setCircleRadius] = useState(5)
  const [happy, setHappy] = useState(false)
  const [selectedPoints, setPoints] = useState<DataPoints>([])

  const { ww, hh } = useControls({
    dimensions: folder({
      ww: {
        label: 'width',
        value: 200,
        min: 220,
        max: 800,
      },
      hh: {
        label: 'height',
        value: 150,
        min: 220,
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
        canon: button(get => {
          setter('canon')
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

  return (
    <div className="center">
      <div style={{ maxWidth: ww }}>
        <Window series={seriesWithColors} windowSize={30}>
          {sliced => (
            <Fragment>
              <Mouse series={seriesWithColors} windowSize={30}>
                {active => (
                  <Sparkline
                    series={seriesWithColors}
                    points={sliced}
                    TooltipComponent={CustomTooltip}
                    activeIndex={active}
                    width={ww}
                    height={hh}
                    circleRadius={circleRadius}
                    lineColors={palette}
                    circleColors={palette}
                    onSelectPoint={point => {
                      console.log({ point })
                    }}
                    onSelectPoints={selection => {
                      setPoints(selection)
                    }}
                    canSelect
                  />
                )}
              </Mouse>
              <div className="toolbar" style={{ maxWidth: ww }}>
                <p>
                  <b>Range:</b>
                  {formatDateTime(new Date(sliced[0][0].date))}-
                  {formatDateTime(
                    new Date(sliced[0][sliced[0].length - 1].date as Date),
                  )}
                </p>
              </div>
            </Fragment>
          )}
        </Window>
      </div>
      <div className="toolbar sticked-toolbar" style={{ maxWidth: ww * 2 }}>
        {selectedPoints?.map((p, i) => (
          <Card
            key={`${slugify(p.label)}-${i}`}
            value={formatNumber(p.value)}
            label={p.label}
            onClick={() => {
              setPoints([])
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default WindowStory
