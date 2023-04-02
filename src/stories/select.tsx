import { type Dispatch, type SetStateAction, useState } from 'react'
import { useControls, folder, button } from 'leva'
import { dataSerie, type Variants } from './pieces/utils'

import CustomTooltip from './Tooltip'
import { type DataPoints } from '@/lib/Sparkline/types'
import { Sparkline } from '@/lib'
import Card from './pieces/Card'
import { formatNumber } from '@/lib/Sparkline/utils'

interface Props {
  setter: Dispatch<SetStateAction<Variants>>
}

function Select(props: Props): JSX.Element {
  const { setter } = props

  const [selectedPoints, setPoints] = useState<DataPoints>([])
  const { ww, hh } = useControls({
    dimensions: folder(
      {
        ww: {
          label: 'width',
          value: 620,
          min: 220,
          max: 800,
        },
        hh: {
          label: 'height',
          value: 300,
          min: 220,
          max: 600,
        },
      },
      { color: '#007bff' },
    ),
    // theme: folder(
    //   {
    //     toggle: button(_ => document.body.classList.toggle('dark')),
    //   },
    //   { color: '#007bff' },
    // ),
    demos: folder(
      {
        tiny: button(_ => {
          setter('tiny')
        }),

        export: button(_ => {
          setter('export')
        }),

        focus: button(_ => {
          setter('focus')
        }),
        window: button(_ => {
          setter('window')
        }),
      },
      { color: '#007bff' },
    ),
  })

  return (
    <div className="center">
      <div style={{ maxWidth: ww }}>
        <Sparkline
          series={dataSerie}
          TooltipComponent={CustomTooltip}
          activeIndex={null}
          height={hh}
          width={ww}
          circleRadius={2}
          onSelectPoint={p => {
            console.log(p)
          }}
          onSelectPoints={selection => {
            setPoints(selection)
          }}
          canSelect
        />
      </div>
      <div className="toolbar" style={{ maxWidth: ww }}>
        {selectedPoints?.map(p => (
          <Card
            key={p.label}
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

export default Select
