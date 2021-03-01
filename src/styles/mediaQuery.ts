const breakPoints: BreakPointMap = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1400,
}

export type BreakPoint = keyof typeof breakPoints

type MediaQueryMap = { [key in BreakPoint]: string }
type BreakPointMap = { [key: string]: number }

const mediaQueries: MediaQueryMap = Object.keys(breakPoints).reduce(
  (acc, breakPoint) => ({
    ...acc,
    [breakPoint]: `@media (min-width: ${
      breakPoints[breakPoint as BreakPoint]
    }px)`,
  }),
  {} as MediaQueryMap
)

export const mediaQuery = (breakPoint: BreakPoint): string =>
  mediaQueries[breakPoint]
