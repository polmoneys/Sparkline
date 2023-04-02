import { useMemo, type ReactNode } from 'react'
import styles from '../index.module.css'

type Color = Record<'start' | 'end', string>

const repeatGradient = (
  colors: Color,
  size: string,
  direction: 'x' | 'y',
): string => `repeating-linear-gradient(
    ${direction === 'x' ? '90deg' : '0deg'},
    ${colors?.start ?? 'currentColor'}, 
    ${colors?.start ?? 'currentColor'} ${size},
    ${colors?.end ?? 'transparent'} ${size},
    ${colors?.end ?? 'transparent'} calc(${size} * 2))`

interface AxisProps {
  children: ReactNode
  x?: string
  y?: string
  height: string
  axisSpace?: string
  color?: Color
}

const Axis = (props: AxisProps): JSX.Element => {
  const {
    children,
    x = '2px',
    y = '2px',
    height = '200px',
    axisSpace = '50px',
    color,
  } = props

  const xAxisBackground = useMemo(
    () =>
      repeatGradient(
        {
          start: color?.start ?? 'transparent',
          end: color?.end ?? 'rgba(0,0,0,.5)',
        },
        x,
        'x',
      ),
    [color, x],
  )
  const yAxisBackground = useMemo(
    () =>
      repeatGradient(
        {
          start: color?.start ?? 'transparent',
          end: color?.end ?? 'rgba(0,0,0,.5)',
        },
        y,
        'y',
      ),
    [color, y],
  )

  return (
    <div
      className={styles.axis}
      style={{
        gridTemplateColumns: `${axisSpace} 1fr`,
        gridTemplateRows: `${height} ${axisSpace}`,
      }}
    >
      <div
        style={{
          background: yAxisBackground,
        }}
      ></div>
      {children}
      <div></div>
      <div
        style={{
          background: xAxisBackground,
        }}
      ></div>
    </div>
  )
}

export default Axis
