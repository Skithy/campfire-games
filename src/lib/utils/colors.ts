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
