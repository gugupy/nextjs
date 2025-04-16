import fs from 'fs';
import path from 'path';

export default function generateColorScale(baseColor: string, prefix: string): Record<string, string> {
    // ... (generateColorScale function from previous response)
    const colorScale: Record<string, string> = {};

    // Helper function to convert hex to RGB
    function hexToRgb(hex: string): [number, number, number] | null {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result
            ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)]
            : null;
    }

    // Helper function to convert RGB to hex
    function rgbToHex(r: number, g: number, b: number): string {
        return `#${[r, g, b].map((x) => x.toString(16).padStart(2, '0')).join('')}`;
    }

    // Helper function to adjust lightness
    function adjustLightness(hex: string, percent: number): string {
        const rgb = hexToRgb(hex);
        if (!rgb) return hex;

        const [r, g, b] = rgb;
        const adjustedR = Math.round(Math.min(255, Math.max(0, r + (255 - r) * percent)));
        const adjustedG = Math.round(Math.min(255, Math.max(0, g + (255 - g) * percent)));
        const adjustedB = Math.round(Math.min(255, Math.max(0, b + (255 - b) * percent)));

        return rgbToHex(adjustedR, adjustedG, adjustedB);
    }

    // Helper function to generate rgba values
    function generateRgba(hex: string, alpha: number): string {
        const rgb = hexToRgb(hex);
        if (!rgb) return hex;
        const [r, g, b] = rgb;
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }

    //Generate the color scale
    const baseRgb = hexToRgb(baseColor);
    if (!baseRgb) return {};

    colorScale[`--scheme-${prefix}-100`] = adjustLightness(baseColor, -0.6);
    colorScale[`--scheme-${prefix}-200`] = adjustLightness(baseColor, -0.4);
    colorScale[`--scheme-${prefix}-300`] = adjustLightness(baseColor, -0.2);
    colorScale[`--scheme-${prefix}-400`] = adjustLightness(baseColor, -0.1);
    colorScale[`--scheme-${prefix}-500`] = baseColor;
    colorScale[`--scheme-${prefix}-600`] = adjustLightness(baseColor, 0.1);
    colorScale[`--scheme-${prefix}-600-10`] = generateRgba(colorScale[`--scheme-${prefix}-600`], 0.1);
    colorScale[`--scheme-${prefix}-600-30`] = generateRgba(colorScale[`--scheme-${prefix}-600`], 0.3);
    colorScale[`--scheme-${prefix}-600-50`] = generateRgba(colorScale[`--scheme-${prefix}-600`], 0.5);
    colorScale[`--scheme-${prefix}-700`] = adjustLightness(baseColor, 0.2);
    colorScale[`--scheme-${prefix}-800`] = adjustLightness(baseColor, 0.4);
    colorScale[`--scheme-${prefix}-900`] = adjustLightness(baseColor, 0.6);
    colorScale[`--scheme-${prefix}-1000`] = adjustLightness(baseColor, 0.6);
    colorScale[`--scheme-${prefix}-1100`] = adjustLightness(baseColor, 0.6);
    colorScale[`--scheme-${prefix}-1200`] = adjustLightness(baseColor, 0.6);

    return colorScale;
}

export function writeCustomColorsScss(brandColor: string | null, accentColor: string | null, filePath: string | null) {
    const brandColors = brandColor ? generateColorScale(brandColor, 'brand') : {};
    const accentColors = accentColor ? generateColorScale(accentColor, 'accent') : {};
    const resolvedFilePath = filePath || path.join(__dirname, '_custom-colors.scss'); // Default to current directory if no path is provided

    let scssContent = ':root {\n';

    for (const key in brandColors) {
        scssContent += `    ${key}: ${brandColors[key]};\n`;
    }

    for (const key in accentColors) {
        scssContent += `    ${key}: ${accentColors[key]};\n`;
    }

    scssContent += '}\n';

    fs.writeFileSync(resolvedFilePath, scssContent, 'utf8');
    console.log('_custom-colors.scss updated successfully!');
}

// Example usage
// const brandColor = '#c41212';
// const accentColor = '#d72d2d';
// const customColorsPath = path.join(__dirname, '_custom-colors.scss'); // Adjust the path as needed

// writeCustomColorsScss(brandColor, accentColor, customColorsPath);