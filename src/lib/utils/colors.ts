/**
 * Color class for handling color conversions and manipulations.
 * Internally stores RGB values (0-255).
 */
export class Color {
  readonly r: number
  readonly g: number
  readonly b: number

  private constructor(r: number, g: number, b: number) {
    this.r = Math.round(r)
    this.g = Math.round(g)
    this.b = Math.round(b)
  }

  /** Creates a Color from RGB values (0-255) */
  static rgb(r: number, g: number, b: number): Color {
    return new Color(r, g, b)
  }

  /** Creates a Color from HSL values (h: 0-360, s: 0-100, l: 0-100) */
  static hsl(h: number, s: number, l: number): Color {
    const sNorm = s / 100
    const lNorm = l / 100
    const c = (1 - Math.abs(2 * lNorm - 1)) * sNorm
    const x = c * (1 - Math.abs(((h / 60) % 2) - 1))
    const m = lNorm - c / 2

    let r = 0,
      g = 0,
      b = 0
    if (h < 60) {
      r = c
      g = x
    } else if (h < 120) {
      r = x
      g = c
    } else if (h < 180) {
      g = c
      b = x
    } else if (h < 240) {
      g = x
      b = c
    } else if (h < 300) {
      r = x
      b = c
    } else {
      r = c
      b = x
    }

    return new Color((r + m) * 255, (g + m) * 255, (b + m) * 255)
  }

  /** Returns the hue component (0-360) */
  getHue(): number {
    const rNorm = this.r / 255
    const gNorm = this.g / 255
    const bNorm = this.b / 255
    const max = Math.max(rNorm, gNorm, bNorm)
    const min = Math.min(rNorm, gNorm, bNorm)
    let h = 0

    if (max !== min) {
      const d = max - min
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

    return Math.round(h * 360)
  }

  /** Returns the saturation component (0-100) */
  getSaturation(): number {
    const rNorm = this.r / 255
    const gNorm = this.g / 255
    const bNorm = this.b / 255
    const max = Math.max(rNorm, gNorm, bNorm)
    const min = Math.min(rNorm, gNorm, bNorm)
    const l = (max + min) / 2

    if (max === min) return 0
    const d = max - min
    return Math.round((l > 0.5 ? d / (2 - max - min) : d / (max + min)) * 100)
  }

  /** Returns the lightness component (0-100) */
  getLightness(): number {
    const rNorm = this.r / 255
    const gNorm = this.g / 255
    const bNorm = this.b / 255
    const max = Math.max(rNorm, gNorm, bNorm)
    const min = Math.min(rNorm, gNorm, bNorm)
    return Math.round(((max + min) / 2) * 100)
  }

  /** Converts to CSS rgb() string */
  toRgb(): string {
    return `rgb(${this.r}, ${this.g}, ${this.b})`
  }

  /** Converts to CSS rgba() string */
  toRgba(alpha: number): string {
    return `rgba(${this.r}, ${this.g}, ${this.b}, ${alpha})`
  }

  /** Converts to CSS hsl() string */
  toHsl(): string {
    return `hsl(${this.getHue()}, ${this.getSaturation()}%, ${this.getLightness()}%)`
  }

  /**
   * Interpolates between two colors based on slider value, going through grey in the middle.
   * At the edges (-10 or +10), the color is fully saturated.
   * At the center (0), the color is grey (0% saturation).
   *
   * @param sliderValue - The internal slider value (-10 to 10, where 0 is center)
   * @param leftColor - Left color
   * @param rightColor - Right color
   * @returns color string (HSL)
   */
  static interpolate(sliderValue: number, leftColor: Color, rightColor: Color): string {
    const leftHue = leftColor.getHue()
    const rightHue = rightColor.getHue()

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
   * Generates a CSS linear-gradient string using interpolate for smooth color transitions.
   * Creates a gradient that goes through desaturated grey in the middle.
   *
   * @param left - Left color
   * @param right - Right color
   * @returns CSS linear-gradient string
   */
  static toGradient(left: Color, right: Color): string {
    const stops = [-10, -5, 0, 5, 10].map((value) => {
      const color = Color.interpolate(value, left, right)
      const percent = ((value + 10) / 20) * 100
      return `${color} ${percent}%`
    })
    return `linear-gradient(to right, ${stops.join(", ")})`
  }

  /**
   * Creates a vertical gradient from top to bottom colors
   * @param top - Color at the top
   * @param bottom - Color at the bottom
   * @returns CSS linear-gradient string
   */
  static toVerticalGradient(top: Color, bottom: Color): string {
    const stops = [-10, -5, 0, 5, 10].map((value) => {
      const color = Color.interpolate(value, top, bottom)
      const percent = ((value + 10) / 20) * 100
      return `${color} ${percent}%`
    })
    return `linear-gradient(to bottom, ${stops.join(", ")})`
  }
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
