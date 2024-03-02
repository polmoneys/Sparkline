export interface DataPoint {
  label: string
  value: number
  date: Date | string
}

export interface DataPoints extends Array<DataPoint> {}

export interface Serie {
  name: string
  points: DataPoints
  color: string
}
export interface Series extends Array<Serie> {}

export interface NormalizedData {
  pathData: string
  areaPathData: string
  circles: Array<{ x: number; y: number }>
}
export interface NormalizedDataSeries extends Array<NormalizedData> {}

export type Captions = 'series' | 'focus'
export type ExportFormat = 'svg' | 'png' | 'jpeg'

// check docs of writeXlsxFile
export interface ExportExcelSchemaColumn {
  column: string
  type: any
  value: (item: any) => any
  width: number
  wrap?: boolean
  fontWeight?: 'bold'
}

export interface ExportExcelSchema extends Array<ExportExcelSchemaColumn> {}

export interface SparklineData {
  series: Series
  points?: DataPoint[][]
}
export interface SparklineAppearance {
  width?: number
  height?: number
  lineColors?: string[]
  circleColors?: string[]
  circleRadius?: number
}

export interface SparklineAddons {
  caption?: string
  captionClassName?: string
  TooltipComponent?: React.FC<{
    x: number
    y: number
    point: any
    color: string
    serie: string
  }>
  activeIndex?: number | null
  crosshairColor?: string
}
export interface SparklineSelectionCallbacks {
  // click on a circle
  onSelectPoint?: (point: DataPoint) => void
  // drag a rectangle and get points in range
  onSelectPoints?: (point: DataPoints) => void
  // click on a circle slugified to set url
  onSelectPointToUrl?: (point: Record<'value' | 'date', string>) => void
}

export interface SparklineExportOptions {
  exportFormat?: ExportFormat
  exportFilename?: string
  onExport?: () => void
  onExportError?: (error: any) => void
  exportSchema?: ExportExcelSchema
}
