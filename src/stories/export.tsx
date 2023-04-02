import { type Dispatch, Fragment, type SetStateAction } from 'react'
import { useControls, folder, button } from 'leva'
import {
  dataAllSeriesShort,
  dataSerie,
  dataSeries,
  type Variants,
} from './pieces/utils'

import CustomTooltip from './Tooltip'
import { Sparkline } from '@/lib'

interface Props {
  setter: Dispatch<SetStateAction<Variants>>
}

function Export(props: Props): JSX.Element {
  const { setter } = props

  const { wwww, hhhh } = useControls({
    dimensions: folder(
      {
        wwww: {
          label: 'width',
          value: 620,
          min: 220,
          max: 800,
        },
        hhhh: {
          label: 'height',
          value: 180,
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
        tiny: button(get => {
          setter('tiny')
        }),
        select: button(get => {
          setter('select')
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
      <div style={{ width: wwww }}>
        <Sparkline
          canExport
          series={dataSerie}
          TooltipComponent={CustomTooltip}
          height={hhhh}
          circleRadius={2}
          onSelectPoint={p => {
            console.log(p)
          }}
        />
      </div>
      <div style={{ width: wwww }}>
        <Sparkline
          canExport
          series={dataSeries}
          TooltipComponent={CustomTooltip}
          height={hhhh}
          circleRadius={2}
          onSelectPoint={p => {
            console.log(p)
          }}
        />
      </div>
      <div style={{ width: wwww }}>
        <Sparkline
          canExport
          series={dataAllSeriesShort}
          TooltipComponent={CustomTooltip}
          height={hhhh}
          circleRadius={2}
          onSelectPoint={p => {
            console.log(p)
          }}
        />
      </div>
    </div>
  )
}

export default Export
