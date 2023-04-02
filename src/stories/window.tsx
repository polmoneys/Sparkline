import { type Dispatch, Fragment, type SetStateAction } from 'react'
import { useControls, folder, button } from 'leva'
import { dataAllSeries, type Variants } from './pieces/utils'

import CustomTooltip from './Tooltip'
import { Window, Sparkline } from '@/lib'
import { formatDateTime, formatNumber } from '@/lib/Sparkline/utils'

interface Props {
  setter: Dispatch<SetStateAction<Variants>>
}

function WindowStory(props: Props): JSX.Element {
  const { setter } = props

  const { www, hhh } = useControls({
    dimensions: folder(
      {
        www: {
          label: 'width',
          value: 620,
          min: 220,
          max: 800,
        },
        hhh: {
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
        tiny: button(get => {
          setter('tiny')
        }),
      },
      { color: '#007bff' },
    ),
  })

  return (
    <div className="center">
      <div style={{ maxWidth: www }}>
        <Window series={dataAllSeries} windowSize={30}>
          {sliced => (
            <Fragment>
              <Sparkline
                series={dataAllSeries}
                points={sliced}
                width={www}
                height={hhh}
                circleRadius={2}
              />

              <div className="toolbar" style={{ maxWidth: www }}>
                <p>
                  From {''}
                  <b>{formatDateTime(new Date(sliced[0][0].date))}</b>
                </p>
                <p>
                  To {''}
                  <b>
                    {formatDateTime(
                      new Date(sliced[0][sliced[0].length - 1].date as Date),
                    )}
                  </b>
                </p>
              </div>
            </Fragment>
          )}
        </Window>
      </div>
    </div>
  )
}

export default WindowStory
