import { Fragment, useState } from 'react'
import { Leva } from 'leva'
import { type Variants } from './stories/pieces/utils'
import './stories/platform.css'
import './stories/stories.css'
import TinyStory from './stories/tiny'
import SelectStory from './stories/select'
import ExportStory from './stories/export'
import FocusStory from './stories/focus'
import WindowStory from './stories/window'

export default function App(): JSX.Element {
  const [demo, setDemo] = useState<Variants>('tiny')

  return (
    <Fragment>
      <Leva
        hideCopyButton
        titleBar={{
          title: '<Sparkline/>',
          filter: false,
        }}
      />
      <main>
        {
          {
            tiny: <TinyStory setter={setDemo} />,
            select: <SelectStory setter={setDemo} />,
            export: <ExportStory setter={setDemo} />,
            focus: <FocusStory setter={setDemo} />,
            window: <WindowStory setter={setDemo} />,
          }[demo]
        }
      </main>
    </Fragment>
  )
}
