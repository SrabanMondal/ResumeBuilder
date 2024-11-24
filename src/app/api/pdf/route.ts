import puppeteer from 'puppeteer';
import path from 'path';
import fs from 'fs';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest): Promise<NextResponse> {
    try {
        const { data }: { data: string } = await req.json();
        const htmlContent = `${data}`;

        // Generate PDF
        const browser = await puppeteer.launch({
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
        });
        const page = await browser.newPage();
        await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

        const pdfPath = path.join(process.cwd(), 'output.pdf');
        await page.pdf({ path: pdfPath, format: 'A4', printBackground: true });

        await browser.close();

        const pdfBuffer = fs.readFileSync(pdfPath);

        fs.unlink(pdfPath, (err) => {
            if (err) console.error('Error deleting the PDF file:', err);
        });

        return new NextResponse(pdfBuffer, {
            status: 200,
            headers: {
                'Content-Type': 'application/pdf',
                'Content-Disposition': 'attachment; filename="output.pdf"',
            },
        });
    } catch (error) {
        console.error('Error generating PDF:', error);
        return NextResponse.json(
            { success: false, error: (error as Error).message },
            { status: 500 }
        );
    }
}

export async function GET() {
    return NextResponse.json({ success: false, message: 'Method Not Allowed' }, { status: 405 });
}

