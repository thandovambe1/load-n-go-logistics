"use client"

import * as React from "react"
import * as RechartsPrimitive from "recharts"
import { cn } from "@/lib/utils"

// Format: { THEME_NAME }
const THEMES = { light: "", dark: ".dark" }

const ChartContext = React.createContext(null)

function useChart() {
  const context = React.useContext(ChartContext)
  if (!context) {
    throw new Error("useChart must be used within a <ChartContainer />")
  }
  return context
}

const ChartContainer = React.forwardRef(
  ({ id, className, children, config, ...props }, ref) => {
    const uniqueId = React.useId()
    const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`

    return (
      <ChartContext.Provider value={{ config }}>
        <div
          data-chart={chartId}
          ref={ref}
          className={cn(
            "flex aspect-video justify-center text-xs [&_.recharts-cartesian-axis-tick_text]-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]-border/50 [&_.recharts-curve.recharts-tooltip-cursor]-border [&_.recharts-dot[stroke='#fff']]-transparent [&_.recharts-layer]-none [&_.recharts-polar-grid_[stroke='#ccc']]-border [&_.recharts-radial-bar-background-sector]-muted [&_.recharts-rectangle.recharts-tooltip-cursor]-muted [&_.recharts-reference-line_[stroke='#ccc']]-border [&_.recharts-sector[stroke='#fff']]-transparent [&_.recharts-sector]-none [&_.recharts-surface]-none",
            className
          )}
          {...props}
        >
          <ChartStyle id={chartId} config={config} />
          <RechartsPrimitive.ResponsiveContainer>
            {children}
          </RechartsPrimitive.ResponsiveContainer>
        </div>
      </ChartContext.Provider>
    )
  }
)
ChartContainer.displayName = "ChartContainer"

function ChartStyle({ id, config }) {
  const colorConfig = Object.entries(config).filter(
    ([, conf]) => conf.theme || conf.color
  )

  if (!colorConfig.length) return null

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: Object.entries(THEMES)
          .map(([theme, prefix]) => {
            return `
${prefix} [data-chart=${id}] {
${colorConfig
  .map(([key, itemConfig]) => {
    const color =
      (itemConfig.theme && itemConfig.theme[theme]) || itemConfig.color
    return color ? `  --color-${key}: ${color};` : ""
  })
  .join("\n")}
}`
          })
          .join("\n"),
      }}
    />
  )
}

const ChartTooltip = RechartsPrimitive.Tooltip

const ChartTooltipContent = React.forwardRef(
  (
    {
      active,
      payload,
      className,
      indicator = "dot",
      hideLabel = false,
      hideIndicator = false,
      label,
      labelFormatter,
      labelClassName,
      formatter,
      color,
      nameKey,
      labelKey,
    },
    ref
  ) => {
    const { config } = useChart()

    const tooltipLabel = React.useMemo(() => {
      if (hideLabel || !payload?.length) return null
      const [item] = payload
      const key = `${labelKey || item?.dataKey || item?.name || "value"}`
      const itemConfig = getPayloadConfigFromPayload(config, item, key)
      const value =
        !labelKey && typeof label === "string"
          ? config[label]?.label || label
          : label

      if (labelFormatter) {
        return (
          <div className={cn("font-medium", labelClassName)}>
            {labelFormatter(value, payload)}
          </div>
        )
      }

      return value ? (
        <div className={cn("font-medium", labelClassName)}>{value}</div>
      ) : null
    }, [
      label,
      labelFormatter,
      payload,
      hideLabel,
      labelClassName,
      config,
      labelKey,
    ])

    if (!active || !payload?.length) return null

    const nestLabel = payload.length === 1 && indicator !== "dot"

    return (
      <div
        ref={ref}
        className={cn(
          "grid min-w-[8rem] items-start gap-1.5 rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl",
          className
        )}
      >
        {!nestLabel && tooltipLabel}
        <div className="grid gap-1.5">
          {payload.map((item, index) => {
            const key = `${nameKey || item.name || item.dataKey || "value"}`
            const itemConfig = getPayloadConfigFromPayload(config, item, key)
            const indicatorColor = color || item.payload?.fill || item.color

            return (
              <div
                key={item.dataKey}
                className={cn(
                  "flex w-full flex-wrap items-stretch gap-2 [&>svg]-2.5 [&>svg]-muted-foreground",
                  indicator === "dot" && "items-center"
                )}
              >
                {formatter && item?.value !== undefined && item.name ? (
                  formatter(
                    item.value,
                    item.name,
                    item,
                    index,
                    item.payload
                  )
                ) : (
                  <>
                    {!hideIndicator && (
                      <div
                        className={cn(
                          "shrink-0 rounded-[2px] border-[--color-border] bg-[--color-bg]",
                          {
                            "h-2.5 w-2.5": indicator === "dot",
                            "w-1": indicator === "line",
                            "w-0 border-[1.5px] border-dashed bg-transparent":
                              indicator === "dashed",
                            "my-0.5": indicator === "dashed",
                          }
                        )}
                        style={{
                          "--color-bg": indicatorColor,
                          "--color-border": indicatorColor,
                        }}
                      />
                    )}
                    <div
                      className={cn(
                        "flex flex-1 justify-between leading-none",
                        nestLabel ? "items-end" : "items-center"
                      )}
                    >
                      <div className="grid gap-1.5">
                        {nestLabel && tooltipLabel}
                        <span className="text-muted-foreground">
                          {itemConfig?.label || item.name}
                        </span>
                      </div>
                      {item.value && (
                        <span className="font-mono font-medium tabular-nums text-foreground">
                          {item.value.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </>
                )}
              </div>
            )
          })}
        </div>
      </div>
    )
  }
)
ChartTooltipContent.displayName = "ChartTooltipContent"

const ChartLegend = RechartsPrimitive.Legend

const ChartLegendContent = React.forwardRef(
  ({ className, hideIcon = false, payload, verticalAlign = "bottom", nameKey }, ref) => {
    const { config } = useChart()

    if (!payload?.length) return null

    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center justify-center gap-4",
          verticalAlign === "top" ? "pb-3" : "pt-3",
          className
        )}
      >
        {payload.map((item) => {
          const key = `${nameKey || item.dataKey || "value"}`
          const itemConfig = getPayloadConfigFromPayload(config, item, key)

          return (
            <div
              key={item.value}
              className="flex items-center gap-1.5 [&>svg]-3 [&>svg]-muted-foreground"
            >
              {!hideIcon ? (
                itemConfig?.icon ? (
                  <itemConfig.icon />
                ) : (
                  <div
                    className="h-2 w-2 shrink-0 rounded-[2px]"
                    style={{ backgroundColor: item.color }}
                  />
                )
              ) : null}
              {itemConfig?.label}
            </div>
          )
        })}
      </div>
    )
  }
)
ChartLegendContent.displayName = "ChartLegendContent"

function getPayloadConfigFromPayload(config, payload, key) {
  if (typeof payload !== "object" || payload === null) return undefined

  const payloadData =
    payload.payload && typeof payload.payload === "object"
      ? payload.payload
      : null

  let configLabelKey = key

  if (payload[key] && typeof payload[key] === "string") {
    configLabelKey = payload[key]
  } else if (
    payloadData &&
    payloadData[key] &&
    typeof payloadData[key] === "string"
  ) {
    configLabelKey = payloadData[key]
  }

  return config[configLabelKey]
}

export {
  ChartContainer,
  ChartStyle,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
}
