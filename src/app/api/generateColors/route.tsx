// app/api/generateColors/route.ts
import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';
import generateColorScale from '../../lib/ColourUtils'; // Adjust path as needed

export async function POST(request: Request) {
    try {
        const { brandColor, accentColor } = await request.json();

        if (!brandColor && !accentColor) {
            return NextResponse.json({ error: 'At least one of brandColor or accentColor is required' }, { status: 400 });
        }

        let scssContent = ':root {\n';

        if (brandColor) {
            const brandColors = generateColorScale(brandColor, 'brand');
            for (const key in brandColors) {
                scssContent += `    ${key}: ${brandColors[key]};\n`;
            }
        }

        if (accentColor) {
            const accentColors = generateColorScale(accentColor, 'accent');
            for (const key in accentColors) {
                scssContent += `    ${key}: ${accentColors[key]};\n`;
            }
        }

        scssContent += '}\n';

        const customColorsPath = path.join(process.cwd(), 'src/once-ui/tokens', '_custom-colors.scss');

        fs.writeFileSync(customColorsPath, scssContent, 'utf8');

        return NextResponse.json({ message: '_custom-colors.scss updated successfully!' });
    } catch (error) {
        console.error('Error generating colors:', error);
        return NextResponse.json({ error: 'Failed to generate colors' }, { status: 500 });
    }
}