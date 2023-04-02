## TLDR

Sparklines with `svg` & `react`. [Demo](https://polmoneys.github.io/Sparkline/)

### Sparkline

Tiny/Dense **sparklines** are the goal of this exploration so expect features oriented towards simplify datum interpretation. 

```ts

// Adds sliding window
<Window series={dataAllSeries} windowSize={30}>
    {sliced => (
        <Sparkline
        activeIndex={null}
        series={dataAllSeries}
        points={sliced}
        height={200}
        circleRadius={2}
        />
    )}
</Window>


```

It can do **exports**, **captions** and **dimming** for extra focus. Some props:

```ts

// Add props to 
<Sparkline/>

export interface SparklineProps {
  series: Series
  captionClassName?: string
  caption?: string
  points?: DataPoint[][]
  width?: number
  height?: number
  lineColors?: string[]
  circleColors?: string[]
  circleRadius?: number
  crosshairColor?: string
  activeIndex: number | null
  onSelectPoint?: (point: DataPoint) => void
  TooltipComponent?: React.FC<{
    x: number
    y: number
    point: any
    color: string
    serie: string
  }>
  canSelect?: boolean
  onSelectPoints?: (point: DataPoints) => void
  canDim?: boolean
  canExport?: boolean
  exportFormat?: ExportFormat
  exportFilename?: string
  onExport?: () => void
  onExportError?: (error: any) => void
}

```

You **must** set some css custom properties to style it all, these are decent defaults:

```css

:root {
  /* caption */
  --sparkline-ui-color: hsl(344, 94%, 60%);
  --sparkline-transparent: rgba(0, 0, 0, 0.001);
  --sparkline-border: 1px solid hsl(0, 4%, 94%);
  /* dim */
  --sparkline-spark-dim: 0.1;
  --sparkline-area-dim: 0.3;
  /* selection */
  --sparkline-rect-color: rgba(0, 0, 255, 0.2);
  --sparkline-rect-stroke: blue;
  --sparkline-z-rect: 9;
  /* actions */
  --sparkline-z-actions: 99;
  /* common */
  --sparkline-gap: 0.5em;
}

```


### Related

Previous work [demo](https://github.com/polmoneys/charts)

### Inspiration 💐

> Our requirements are more modest but at the same time more responsible: 
> buildings, furniture, drinking glasses may well be consumer items that 
> we can destroy without regret after they have served for some short or 
> long period, but while we use them we expect them to fullfill their role and serve us perfectly, so perfectly that we can also derive aesthetic 
> enjoyment from observing them in use. 

Erik Gunnar Asplund on **Swedish Grace**.


