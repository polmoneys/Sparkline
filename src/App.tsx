import { Fragment, useEffect, useRef, useState } from 'react'
import { Leva } from 'leva'
import { type Variants } from './stories/pieces/utils'
import './stories/platform.css'
import './stories/stories.css'
import FocusStory from './stories/canon'
import WindowStory from './stories/window'

export default function App(): JSX.Element {
  const [demo, setDemo] = useState<Variants>('canon')

  const timerBlur = useRef(0)

  useEffect(() => {
    timerBlur.current = window.setTimeout(() => {
      const buttons = document.querySelectorAll(
        "div[class^='leva-']:has( >button)",
      )

      const ranges = document.querySelectorAll(
        "div[class^='leva-']:has( > div[class*='hasRange'])",
      )
      console.log({ ranges })

      for (const range of ranges) {
        range.classList.add('white')
      }
      for (const item of buttons) {
        if (['sad', 'happy'].includes(item.textContent ?? '')) {
          item.classList.add('yellow')
        }

        if (['sm', 'lg', 'xl'].includes(item.textContent ?? '')) {
          item.classList.add('red')
        }

        if (['window', 'canon'].includes(item.textContent ?? '')) {
          item.classList.add('orange')
        }
      }
    }, 400)
    return () => {
      if (timerBlur.current !== undefined) {
        clearTimeout(timerBlur.current)
      }
    }
  }, [])

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
            canon: <FocusStory setter={setDemo} />,
            window: <WindowStory setter={setDemo} />,
          }[demo]
        }
      </main>
    </Fragment>
  )
}
