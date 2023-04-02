import { Fragment, useMemo, type ComponentProps } from 'react'
import iconPaths from './icons'
import styles from './Icon.module.css'

const sizeUnits = ['sm', 'md', 'lg'] as const
export type IconSize = (typeof sizeUnits)[number]

export interface IconProps extends ComponentProps<'svg'> {
  disabled?: boolean
  variant?: 'outline' | 'solid'
  d?: string
  label: string
  size?: IconSize
  fill?: string
  stroke?: string
  strokeWidth?: number
}

function Icon(props: IconProps): JSX.Element {
  const {
    d = '',
    variant,
    fill = 'var(--accent)',
    stroke = 'currentColor',
    strokeWidth = 2,
    size = 'md',
    label,
    disabled = false,
    ...rest
  } = props

  const { border, backgroundColor } = useMemo(() => {
    const bg = variant === 'solid' ? fill : 'transparent'
    let strokeTheme = `${strokeWidth}px solid transparent`
    if (variant !== undefined && variant === 'outline')
      strokeTheme = `${strokeWidth}px solid ${stroke}`
    if (variant !== undefined && variant === 'solid')
      strokeTheme = `${strokeWidth}px solid ${fill}`

    return { border: strokeTheme, backgroundColor: bg }
  }, [variant])

  const inlineStyles = {
    svg: {
      border,
      backgroundColor,
      strokeWidth,
      opacity: disabled ? 0.3 : 1,
    },
  }

  const iconSize = useMemo(() => {
    if (size === 'sm') return '18'
    if (size === 'md') return '24'
    return '30'
  }, [size])
  if (d === '') return <Fragment />
  return (
    <svg
      width={iconSize}
      height={iconSize}
      viewBox="0 0 15 15"
      focusable="false"
      style={inlineStyles.svg}
      className={styles.root}
      aria-labelledby={`${label}-icon`}
      {...(label === '' && { 'aria-hidden': 'true' })}
      {...rest}
    >
      <title id={`${label}-icon`}>{label} </title>
      <path fillRule="evenodd" clipRule="evenodd" d={d} fill={stroke} />
    </svg>
  )
}

export const Compose = (d: string) => (props: IconProps) =>
  <Icon {...props} d={d} />

export default Icon

export const IconHandle = Compose(iconPaths.handle)
export const IconPlus = Compose(iconPaths.plus)
export const IconMinus = Compose(iconPaths.minus)
export const IconCross = Compose(iconPaths.cross)
export const IconCaretUp = Compose(iconPaths.caretUp)
export const IconCaretDown = Compose(iconPaths.caretDown)
export const IconStar = Compose(iconPaths.star)
export const IconQuestion = Compose(iconPaths.question)
export const IconEnter = Compose(iconPaths.enter)
export const IconLeave = Compose(iconPaths.leave)
