import { type Dispatch, type SetStateAction } from 'react'
import { useControls, folder, button } from 'leva'
import { dataAllSeries, type Variants } from './pieces/utils'
import CustomTooltip from './Tooltip'
import { Mouse, Sparkline } from '@/lib'

interface Props {
  setter: Dispatch<SetStateAction<Variants>>
}

function Foci(props: Props): JSX.Element {
  const { setter } = props

  const { w, h } = useControls({
    dimensions: folder(
      {
        w: {
          label: 'width',
          value: 620,
          min: 220,
          max: 800,
        },
        h: {
          label: 'height',
          value: 300,
          min: 220,
          max: 600,
        },
      },
      { color: '#007bff' },
    ),
    demos: folder(
      {
        tiny: button(get => {
          setter('tiny')
        }),
        select: button(get => {
          setter('select')
        }),
        export: button(get => {
          setter('export')
        }),
        window: button(get => {
          setter('window')
        }),
      },
      { color: '#007bff' },
    ),
    // theme: folder(
    //   {
    //     toggle: button(get => document.body.classList.toggle('dark')),
    //   },
    //   { color: '#007bff' },
    // ),
  })

  return (
    <div className="center">
      <div style={{ maxWidth: w }}>
        <Mouse series={dataAllSeries}>
          {active => (
            <Sparkline
              series={dataAllSeries}
              TooltipComponent={CustomTooltip}
              activeIndex={active}
              height={h}
              width={w}
              circleRadius={2}
              canDim
            />
          )}
        </Mouse>
      </div>
    </div>
  )
}

export default Foci
