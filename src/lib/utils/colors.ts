/**
 * Generates a pair of complementary colors (HSL) based on an index.
 * Distributes hues across the available prompts to ensure distinctness.
 *
 * @param index - The index of the prompt
 * @param total - The total number of prompts (to calculate hue step)
 * @returns [leftColor, rightColor] - Two hex or hsl strings
 */
export function getPromptColors(index: number, total: number): [string, string] {
  // Calculate a unique hue for this index
  // We use a "golden ratio" approximation or just simple division to spread them out
  const hueStep = 360 / total
  const baseHue = (index * hueStep) % 360

  // Complementary hue is 180 degrees away
  const complementHue = (baseHue + 180) % 360

  // We can use HSL strings directly for easy manipulation
  // Saturation: Lower for pastel (~60-70%)
  // Lightness: Higher for pastel (~75-85%)
  const leftColor = `hsl(${Math.round(baseHue)}, 70%, 80%)`
  const rightColor = `hsl(${Math.round(complementHue)}, 70%, 80%)`

  return [leftColor, rightColor]
}

/**
 * Generates a color that interpolates between the prompt's left and right colors based on the slider position.
 * The scale goes: 100% (bottom/left) -> 0% (center) -> 100% (top/right)
 *
 * @param sliderValue - The internal slider value (-10 to 10, where 0 is center)
 * @param index - The prompt index
 * @param total - Total number of prompts
 * @returns color string (HSL)
 * @deprecated Use interpolateColor instead for consistent grey-in-middle behavior
 */
export function getSliderColor(sliderValue: number, index: number, total: number): string {
  const hueStep = 360 / total
  const baseHue = (index * hueStep) % 360

  // Convert slider position to hue:
  // -10 (bottom, 100% left) = baseHue
  // 0 (center, 0%) = baseHue + 90 (neutral)
  // 10 (top, 100% right) = baseHue + 180 (complement)
  const normalized = (sliderValue + 10) / 20 // Convert -10..10 to 0..1
  const currentHue = (baseHue + normalized * 180) % 360

  return `hsl(${Math.round(currentHue)}, 75%, 75%)`
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
export function interpolateColor(sliderValue: number, leftColor: string, rightColor: string): string {
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

/**
 * Gets the visual position (0-100%) for CSS positioning from slider value.
 * -10 slider = 0% position (bottom), 10 slider = 100% position (top)
 *
 * @param sliderValue - Internal value (-10 to 10)
 * @returns CSS position percentage (0-100)
 */
export function sliderToPosition(sliderValue: number): number {
  return ((sliderValue + 10) / 20) * 100
}
