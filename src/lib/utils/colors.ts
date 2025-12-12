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
    const hueStep = 360 / total;
    const baseHue = (index * hueStep) % 360;
    
    // Complementary hue is 180 degrees away
    const complementHue = (baseHue + 180) % 360;

    // We can use HSL strings directly for easy manipulation
    // We can use HSL strings directly for easy manipulation
    // Saturation: Lower for pastel (~60-70%)
    // Lightness: Higher for pastel (~75-85%)
    const leftColor = `hsl(${Math.round(baseHue)}, 70%, 80%)`;
    const rightColor = `hsl(${Math.round(complementHue)}, 70%, 80%)`;

    return [leftColor, rightColor];
}

/**
 * Generates a color that interpolates between the prompt's left and right colors based on the value.
 * 
 * @param value - The slider value (0-100)
 * @param index - The prompt index
 * @param total - Total number of prompts
 * @returns color string (HSL)
 */
export function getSliderColor(value: number, index: number, total: number): string {
    const hueStep = 360 / total;
    const baseHue = (index * hueStep) % 360;
    
    // Calculate hue difference to interpolate
    // We want to go from baseHue to baseHue + 180
    // If we just lerp, we go 180 degrees around the wheel
    const currentHue = (baseHue + (value / 100) * 180) % 360;
    
    return `hsl(${Math.round(currentHue)}, 75%, 75%)`;
}
