import { type Dispatch, type SetStateAction } from 'react'
import { useControls, folder, button } from 'leva'
import { dataSerie, type Variants } from './pieces/utils'
import CustomTooltip from './Tooltip'
import { Mouse, Sparkline } from '@/lib'
import { formatDateTime, formatNumber } from '@/lib/Sparkline/utils'

interface Props {
  setter: Dispatch<SetStateAction<Variants>>
}

function Tiny(props: Props): JSX.Element {
  const { setter } = props

  const { width, height } = useControls({
    dimensions: folder(
      {
        width: {
          label: 'width',
          value: 220,
          min: 120,
          max: 800,
        },
        height: {
          label: 'height',
          value: 200,
          min: 120,
          max: 600,
        },
      },
      { color: '#007bff' },
    ),
    // theme: folder(
    //   {
    //     toggle: button(get => document.body.classList.toggle('dark')),
    //   },
    //   { color: '#007bff' },
    // ),
    demos: folder(
      {
        select: button(get => {
          setter('select')
        }),
        export: button(get => {
          setter('export')
        }),

        focus: button(get => {
          setter('focus')
        }),
        window: button(get => {
          setter('window')
        }),
      },
      { color: '#007bff' },
    ),
  })

  return (
    <div className="center">
      <div style={{ maxWidth: width }}>
        <Mouse series={dataSerie}>
          {active => (
            <Sparkline
              series={dataSerie}
              TooltipComponent={CustomTooltip}
              activeIndex={active}
              width={width}
              height={height}
              circleRadius={2}
              onSelectPoint={p => {
                console.log(p)
              }}
            />
          )}
        </Mouse>
      </div>
    </div>
  )
}

export default Tiny
