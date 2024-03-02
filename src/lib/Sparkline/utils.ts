import { type RectCoordinates } from './Selection'

export const SPARKLINE_PADDING_START = 30
export const DEFAULT_SPARKLINE_WIDTH = 200
export const DEFAULT_SPARKLINE_HEIGHT = 100

export const DARK_COLORS = [
  'hsl(0, 4%, 80%)',
  'hsl(0, 4%, 70%)',
  'hsl(0, 2%, 63%)',
]

export const HAPPY_COLORS = ['#ec8661', '#ecd161', '#e3a37a']

export const FUN_COLORS = HAPPY_COLORS

export const dim = (
  index: number,
  area = false,
  areaHideOpacity = 0,
  areaShowOpacity = 0.3,
  pathHideOpacity = 0.1,
  pathShowOpacity = 1,
): void => {
  const className = !area ? `serie-${index}` : `serie-${index}-area`
  const elements = document.getElementsByClassName(className)
  for (let i = 0; i < elements.length; i++) {
    const element = elements[i]
    const currentOpacity = parseFloat(element.getAttribute('opacity') ?? '1')
    const isVisible = !area
      ? currentOpacity === pathShowOpacity
      : currentOpacity === areaShowOpacity
    const hideOpacity = !area ? pathHideOpacity : areaHideOpacity
    const visibleOpacity = !area ? pathShowOpacity : areaShowOpacity

    const newOpacity = isVisible ? hideOpacity : visibleOpacity
    element.setAttribute('opacity', newOpacity.toString())
  }
}

export const isPointInsideRect = (
  point: { x: number; y: number },
  rect: RectCoordinates,
): boolean => {
  return (
    point.x >= rect.x &&
    point.x <= rect.x + rect.width &&
    point.y >= rect.y &&
    point.y <= rect.y + rect.height
  )
}

export interface DateTimeFormatOptions {
  locale?: string | string[]
  timeZone?: Intl.DateTimeFormatOptions['timeZone']
  hour12?: Intl.DateTimeFormatOptions['hour12']
  weekday?: Intl.DateTimeFormatOptions['weekday']
  era?: Intl.DateTimeFormatOptions['era']
  year?: Intl.DateTimeFormatOptions['year']
  month?: Intl.DateTimeFormatOptions['month']
  day?: Intl.DateTimeFormatOptions['day']
  hour?: Intl.DateTimeFormatOptions['hour']
  minute?: Intl.DateTimeFormatOptions['minute']
  second?: Intl.DateTimeFormatOptions['second']
  timeZoneName?: Intl.DateTimeFormatOptions['timeZoneName']
}

export function formatDateTime(
  date: Date,
  options: DateTimeFormatOptions = {},
): string {
  const {
    locale = 'en-US',
    timeZone = undefined,
    hour12 = options.timeZoneName !== undefined,
    weekday,
    era,
    year = 'numeric',
    month = 'numeric',
    day = 'numeric',
    hour,
    minute,
    second,
    timeZoneName,
  } = options

  const dateTimeFormat = new Intl.DateTimeFormat(locale, {
    timeZone,
    hour12,
    weekday,
    era,
    year,
    month,
    day,
    ...(hour !== undefined ? { hour } : {}),
    ...(minute !== undefined ? { minute } : {}),
    ...(second !== undefined ? { second } : {}),
    timeZoneName,
  })

  return dateTimeFormat.format(date)
}

export interface NumberFormatOptions {
  locale?: string | string[]
  style?: Intl.NumberFormatOptions['style']
  currency?: Intl.NumberFormatOptions['currency']
  currencyDisplay?: Intl.NumberFormatOptions['currencyDisplay']
  useGrouping?: Intl.NumberFormatOptions['useGrouping']
  minimumIntegerDigits?: Intl.NumberFormatOptions['minimumIntegerDigits']
  minimumFractionDigits?: Intl.NumberFormatOptions['minimumFractionDigits']
  maximumFractionDigits?: Intl.NumberFormatOptions['maximumFractionDigits']
  minimumSignificantDigits?: Intl.NumberFormatOptions['minimumSignificantDigits']
  maximumSignificantDigits?: Intl.NumberFormatOptions['maximumSignificantDigits']
}

export function formatNumber(
  value: number,
  options: NumberFormatOptions = {},
): string {
  const {
    locale = 'en-US',
    style = 'decimal',
    currency = 'USD',
    currencyDisplay = 'symbol',
    useGrouping = true,
    minimumIntegerDigits = 1,
    minimumFractionDigits = 0,
    maximumFractionDigits = 3,
    minimumSignificantDigits,
    maximumSignificantDigits,
  } = options

  const numberFormat = new Intl.NumberFormat(locale, {
    style,
    currency,
    currencyDisplay,
    useGrouping,
    minimumIntegerDigits,
    minimumFractionDigits,
    maximumFractionDigits,
    minimumSignificantDigits,
    maximumSignificantDigits,
  })

  return numberFormat.format(value)
}

export function pluralize(word: string, count: number): string {
  if (count === 1) {
    return word
  }

  const irregularPlurals: Record<string, string> = {
    child: 'children',
    foot: 'feet',
    man: 'men',
    woman: 'women',
    tooth: 'teeth',
    mouse: 'mice',
    person: 'people',
  }

  if (irregularPlurals[word] !== undefined && irregularPlurals[word] !== '') {
    return irregularPlurals[word]
  }

  const lastLetter = word.slice(-1)
  const secondToLastLetter = word.slice(-2, -1)

  if (
    lastLetter === 's' ||
    lastLetter === 'x' ||
    lastLetter === 'z' ||
    secondToLastLetter + lastLetter === 'sh' ||
    secondToLastLetter + lastLetter === 'ch'
  ) {
    return word + 'es'
  } else if (lastLetter === 'y' && !/[aeiou]/.test(secondToLastLetter)) {
    return word.slice(0, -1) + 'ies'
  } else {
    return word + 's'
  }
}

export const classes = (...params: unknown[]): string =>
  params.filter(Boolean).join(' ')

export const slugify = (str: string): string =>
  str
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')

export const unslugify = (slug: string): string => {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}
