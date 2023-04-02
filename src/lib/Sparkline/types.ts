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
