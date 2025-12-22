export type ColorTuple = readonly [number, number, number]

export const rgb = ([r, g, b]: ColorTuple) => `rgb(${r}, ${g}, ${b})`
export const rgba = ([r, g, b]: ColorTuple, alpha: number) => `rgba(${r}, ${g}, ${b}, ${alpha})`
export const hsl = ([r, g, b]: ColorTuple) => {
  const rNorm = r / 255
  const gNorm = g / 255
  const bNorm = b / 255
  const max = Math.max(rNorm, gNorm, bNorm)
  const min = Math.min(rNorm, gNorm, bNorm)
  const l = (max + min) / 2
  let h = 0
  let s = 0

  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case rNorm:
        h = ((gNorm - bNorm) / d + (gNorm < bNorm ? 6 : 0)) / 6
        break
      case gNorm:
        h = ((bNorm - rNorm) / d + 2) / 6
        break
      case bNorm:
        h = ((rNorm - gNorm) / d + 4) / 6
        break
    }
  }

  return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`
}

/**
 * Interpolates between two HSL colors based on slider value, going through grey in the middle.
 * At the edges (-10 or +10), the color is fully saturated.
 * At the center (0), the color is grey (0% saturation).
 *
 * @param sliderValue - The internal slider value (-10 to 10, where 0 is center)
 * @param leftColor - HSL color string for the left side (e.g., "hsl(180, 70%, 80%)")
 * @param rightColor - HSL color string for the right side (e.g., "hsl(0, 70%, 80%)")
 * @returns color string (HSL)
 */
export function interpolateColor(
  sliderValue: number,
  leftColor: string,
  rightColor: string,
): string {
  // Extract hue from leftColor and rightColor (they're in HSL format)
  const leftMatch = leftColor.match(/hsl\((\d+),/)
  const rightMatch = rightColor.match(/hsl\((\d+),/)
  if (!leftMatch || !rightMatch) return "#888"

  const leftHue = parseInt(leftMatch[1])
  const rightHue = parseInt(rightMatch[1])

  // Normalize slider value to 0-1 range (-10 = 0, +10 = 1)
  const normalized = (sliderValue + 10) / 20

  // Calculate saturation: 75% at edges, 0% (grey) in the middle
  const distanceFromCenter = Math.abs(normalized - 0.5) * 2 // 0 at center, 1 at edges
  const saturation = Math.round(distanceFromCenter * 75)

  // Lightness: 95% at center (bright white-grey), 80% at edges (saturated colors)
  const lightness = Math.round(95 - distanceFromCenter * 15)

  // Interpolate hue (handle wraparound)
  let hueDiff = rightHue - leftHue
  if (hueDiff > 180) hueDiff -= 360
  if (hueDiff < -180) hueDiff += 360
  const currentHue = (leftHue + normalized * hueDiff + 360) % 360

  return `hsl(${Math.round(currentHue)}, ${saturation}%, ${lightness}%)`
}

/**
 * Converts internal slider value (-10 to 10) to display percentage.
 * Scale: 100% at ends (-10 and 10), 0% at center (0)
 *
 * @param sliderValue - Internal value (-10 to 10)
 * @returns Display percentage (0-100)
 */
export function sliderToDisplayValue(sliderValue: number): number {
  // Absolute value * 10 to get percentage
  return Math.abs(sliderValue) * 10
}
